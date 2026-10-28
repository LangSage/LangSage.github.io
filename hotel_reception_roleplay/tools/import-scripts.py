#!/usr/bin/env python3
"""Import canonical Langsage scripts verbatim; requires Python 3 and Node.js.

Run without arguments to fetch the live sources and original MP3s. --check
replays the embedded lesson snapshots and checks downloaded audio offline.
Only scripts-data.json and audio/source-*.mp3 are written.
"""

import argparse
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timezone
import hashlib
from html.parser import HTMLParser
import json
from pathlib import Path
import re
import subprocess
import sys
import time
from urllib.request import Request, urlopen
from urllib.parse import urljoin


INDEX = "https://langsage.github.io/script/pages/"
HTML_NAMES = (
    "walk_in.html",
    "checkout_company.html",
    "checkout_direct_guest.html",
    "checkout_touragency.html",
    "tourist_info_script_strict_table_phone.html",
)
WINDOW_PAGE = "window_documents_scripts.html"
WINDOW_JS = "window_documents_scripts.js"
WORD_NAMES = ("words.js", "words_extra.js")
ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "scripts-data.json"


def norm(value):
    return " ".join(value.split())


def sha256(value):
    return hashlib.sha256(value).hexdigest()


class Element:
    def __init__(self, tag="root", attrs=()):
        self.tag = tag
        self.attrs = dict(attrs)
        self.children = []

    def text(self):
        return "".join(c.text() if isinstance(c, Element) else c for c in self.children)

    def find(self, tag=None, css=None):
        for child in self.children:
            if isinstance(child, Element):
                if (tag is None or child.tag == tag) and (
                    css is None or css in child.attrs.get("class", "").split()
                ):
                    yield child
                yield from child.find(tag, css)


class Document(HTMLParser):
    VOID = set("area base br col embed hr img input link meta param source track wbr".split())

    def __init__(self, html):
        super().__init__(convert_charrefs=True)
        self.root = Element()
        self.stack = [self.root]
        self.feed(html)
        self.close()

    def handle_starttag(self, tag, attrs):
        node = Element(tag, attrs)
        self.stack[-1].children.append(node)
        if tag == "br":
            node.children.append("\n")
        if tag not in self.VOID:
            self.stack.append(node)

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if tag not in self.VOID:
            self.handle_endtag(tag)

    def handle_endtag(self, tag):
        for i in range(len(self.stack) - 1, 0, -1):
            if self.stack[i].tag == tag:
                del self.stack[i:]
                return

    def handle_data(self, data):
        self.stack[-1].children.append(data)


def single(nodes):
    items = list(nodes)
    if len(items) != 1:
        raise ValueError(f"Expected one source element, got {len(items)}")
    return items[0]


def fetch(url):
    for attempt in range(3):
        try:
            req = Request(url, headers={"User-Agent": "LangsageScriptImporter/1.0"})
            with urlopen(req, timeout=25) as response:
                return response.read(), response.headers.get_content_type()
        except Exception:
            if attempt == 2:
                raise
            time.sleep(0.5 * (attempt + 1))


# Execute only the literal declarations, never the browser script below them.
NODE_LITERAL = r"""
const fs = require('node:fs');
const vm = require('node:vm');
const input = JSON.parse(fs.readFileSync(0, 'utf8'));
let result;
if (input.kind === 'variants') {
  const cut = input.source.indexOf('\nconst ', input.source.indexOf('const VARIANTS =') + 1);
  if (cut < 0) throw Error('Missing end of VARIANTS literal prefix');
  const prefix = input.source.slice(0, cut);
  if (!/^const SCRIPT_SLUG\s*=/.test(prefix) || !prefix.includes('const VARIANTS = ['))
    throw Error('Unexpected variant declarations');
  result = vm.runInNewContext(prefix + '\nJSON.stringify({slug:SCRIPT_SLUG,variants:VARIANTS})',
                              Object.create(null), {timeout: 1000});
} else {
  const name = input.kind === 'words' ? 'SCRIPT_WORDS' : 'SCRIPT_WORD_EXTRAS';
  const match = input.source.match(new RegExp('^\\s*window\\.' + name + '\\s*=\\s*(\\[[\\s\\S]*\\])\\s*;?\\s*$'));
  if (!match) throw Error('Unexpected dictionary assignment');
  result = vm.runInNewContext('JSON.stringify((' + match[1] + '))',
                              Object.create(null), {timeout: 1000});
}
process.stdout.write(result);
"""


def literal(kind, source):
    result = subprocess.run(
        ["node", "-e", NODE_LITERAL],
        input=json.dumps({"kind": kind, "source": source}),
        encoding="utf-8", capture_output=True, check=True, timeout=10,
    )
    return json.loads(result.stdout)


def html_lesson(name, source):
    doc = Document(source["sourceText"]).root
    lesson_id = Path(name).stem
    title = norm(single(doc.find("h1")).text())
    slug = re.search(r'const SCRIPT_SLUG\s*=\s*[\'"]([^\'"]+)[\'"]', source["sourceText"])
    if not slug:
        raise ValueError(f"Missing canonical audio slug: {name}")
    steps = []
    for card in doc.find("article", "card"):
        idx = int(card.attrs["data-idx"])
        original = norm(single(card.find("div", "phrase")).text())
        fields = {}
        for row in card.find("div", "row"):
            label = norm(single(row.find("div", "label")).text())
            fields[label] = norm(single(row.find("div", "value")).text())
        staff, marker, guest = original.partition("Гость:")
        staff = norm(staff)
        # Isolated Latin letters in Russian meal abbreviations are not speech.
        kind = "phrase" if re.search(r"[A-Za-z]{2,}", staff) else "action"
        step = {
            "id": f"{lesson_id}-{idx}", "sourceStep": idx,
            "text": staff, "instruction": fields.get("Действия", ""),
            "translation": fields.get("Перевод", ""),
            "notes": fields.get("Примечания", ""),
            "speaker": "Receptionist", "kind": kind, "audio": None,
            "originalText": original,
            "originalRowText": norm(card.text()),
            "audioSourceUrl": urljoin(INDEX, f"../audio/phrases/{slug[1]}_{idx}.mp3")
            if kind == "phrase" else None,
        }
        if marker:
            step["guestText"] = norm(guest)
        if staff not in original:
            raise ValueError(f"Noncanonical text: {step['id']}")
        steps.append(step)
    if not steps or [s["sourceStep"] for s in steps] != list(range(1, len(steps) + 1)):
        raise ValueError(f"Missing or reordered source rows: {name}")
    return {
        "id": lesson_id, "title": title, "label": title,
        "sourceUrl": source["sourceUrl"], "sourceSha256": source["sourceSha256"],
        "steps": steps,
    }


def window_lessons(source):
    data = literal("variants", source["sourceText"])
    lessons = []
    for variant in data["variants"]:
        lesson_id = f"window_documents_{variant['id']}"
        steps = []
        pending_guests = []
        for idx, line in enumerate(variant["lines"], 1):
            if line["speaker"] == "Guest":
                pending_guests.append({
                    "sourceStep": idx, "sourceLineId": line["id"],
                    "text": norm(line["text"]), "translation": norm(line["ru"]),
                })
                continue
            if line["speaker"] != "Receptionist":
                raise ValueError(f"Unexpected source speaker: {line['speaker']}")
            step = {
                "id": f"{lesson_id}-{idx}", "sourceStep": idx,
                "sourceLineId": line["id"], "text": norm(line["text"]),
                "instruction": "", "translation": norm(line["ru"]), "notes": "",
                "speaker": "Receptionist", "kind": "phrase", "audio": None,
                "originalText": norm(line["text"]),
                "audioSourceUrl": urljoin(INDEX, f"../audio/phrases/{data['slug']}_{line['id']}.mp3"),
            }
            if pending_guests:
                step["previousGuest"] = pending_guests[-1]
                step["guestText"] = " ".join(g["text"] for g in pending_guests)
                step["previousGuests"] = pending_guests
                pending_guests = []
            steps.append(step)
        if pending_guests:
            raise ValueError("Trailing guest context needs explicit preservation")
        lessons.append({
            "id": lesson_id, "title": norm(variant["title"]),
            "label": norm(variant["tab"]), "note": norm(variant["note"]),
            "sourceUrl": source["sourceUrl"], "sourceSha256": source["sourceSha256"],
            "pageUrl": urljoin(INDEX, WINDOW_PAGE), "steps": steps,
        })
    if len(lessons) != 3:
        raise ValueError("Expected all three window/document variants")
    return lessons


def occurs(word, texts):
    # Whole terms only: 'air' must not match 'chair' or 'stairs'.
    pattern = re.compile(r"(?<![A-Za-z0-9])" + re.escape(word) + r"(?![A-Za-z0-9])", re.I)
    return any(pattern.search(text) for text in texts)


def dictionary(lessons, sources):
    texts = [s["text"] for lesson in lessons for s in lesson["steps"] if s["kind"] == "phrase"]
    candidates = {}
    for name, kind in zip(WORD_NAMES, ("words", "extras")):
        source = sources[name]
        seen = set()
        for index, item in enumerate(literal(kind, source["sourceText"]), 1):
            word = norm(str(item.get("word", item.get("Word", "")))).lower()
            translation = item.get("translation", item.get("Translation", ""))
            if not word or word in seen:
                continue
            seen.add(word)
            if not translation or not occurs(word, texts):
                continue
            candidates.setdefault(word, []).append({
                "sourceUrl": source["sourceUrl"], "sourceSha256": source["sourceSha256"],
                "sourceEntry": index, "sourceValue": item,
            })
    # extras are appended last and therefore override words.js.
    values = {w: entries[-1]["sourceValue"].get("translation", entries[-1]["sourceValue"].get("Translation", ""))
              for w, entries in sorted(candidates.items())}
    provenance = {w: {**entries[-1], "sourceValues": entries} for w, entries in sorted(candidates.items())}
    return values, provenance


def is_mp3(data):
    return len(data) > 128 and (data.startswith(b"ID3") or (data[0] == 0xFF and data[1] & 0xE0 == 0xE0))


def save_audio(step):
    path = ROOT / "audio" / f"source-{step['id']}.mp3"
    try:
        body, content_type = fetch(step["audioSourceUrl"])
        if not is_mp3(body):
            raise ValueError(f"Not an MP3 ({content_type})")
        # Compare with live bytes: reruns reuse identical existing source audio.
        if not path.exists() or path.read_bytes() != body:
            path.write_bytes(body)
        step["audio"] = f"audio/{path.name}"
        step["audioSha256"] = sha256(body)
        step["audioBytes"] = len(body)
        step["audioStatus"] = "downloaded"
    except Exception as error:
        if path.exists() and is_mp3(path.read_bytes()):
            body = path.read_bytes()
            step.update(audio=f"audio/{path.name}", audioSha256=sha256(body),
                        audioBytes=len(body), audioStatus="cached")
        else:
            step["audio"] = step["audioSourceUrl"]
            step["audioStatus"] = "source-url-fallback"
        step["audioError"] = str(error)


def replay(sources):
    return [html_lesson(name, sources[name]) for name in HTML_NAMES] + window_lessons(sources[WINDOW_JS])


def validate(data):
    sources = {item["name"]: item for item in data["sources"]}
    for source in sources.values():
        if "sourceText" in source and sha256(source["sourceText"].encode("utf-8")) != source["sourceSha256"]:
            raise ValueError(f"Snapshot hash mismatch: {source['name']}")
    expected = replay(sources)
    if len(data["lessons"]) != 8:
        raise ValueError("Expected eight lessons")
    for actual, original in zip(data["lessons"], expected):
        if len(actual["steps"]) != len(original["steps"]):
            raise ValueError("Row count differs from snapshot")
        for key in original:
            if key != "steps" and actual[key] != original[key]:
                raise ValueError(f"Lesson metadata changed: {key}")
        for step, source_step in zip(actual["steps"], original["steps"]):
            for key, value in source_step.items():
                if key != "audio" and step[key] != value:
                    raise ValueError(f"Source text or order changed: {step['id']} / {key}")
            if step["kind"] == "action":
                if step["audio"] is not None:
                    raise ValueError("Action-only row has speech audio")
            elif step["audio"].startswith("audio/"):
                body = (ROOT / step["audio"]).read_bytes()
                if not is_mp3(body) or sha256(body) != step["audioSha256"]:
                    raise ValueError(f"Audio changed: {step['id']}")
            elif step["audio"] != step["audioSourceUrl"]:
                raise ValueError("Unexpected audio fallback")
    texts = [s["text"] for lesson in data["lessons"] for s in lesson["steps"] if s["kind"] == "phrase"]
    for word, translation in data["dictionary"].items():
        item = data["dictionaryProvenance"][word]
        value = item["sourceValue"]
        if translation != value.get("translation", value.get("Translation", "")) or not occurs(word, texts):
            raise ValueError(f"Invalid dictionary term: {word}")
        source = next(s for s in sources.values() if s["sourceUrl"] == item["sourceUrl"])
        if item["sourceSha256"] != source["sourceSha256"] or item != {
            **item["sourceValues"][-1], "sourceValues": item["sourceValues"]
        }:
            raise ValueError(f"Invalid dictionary provenance: {word}")


def report(data):
    all_steps = [s for lesson in data["lessons"] for s in lesson["steps"]]
    total_actions = sum(s["kind"] == "action" for s in all_steps)
    total_local = sum(str(s["audio"]).startswith("audio/") for s in all_steps)
    print(f"Total: {len(data['lessons'])} lessons, {len(all_steps)} rows, "
          f"{total_actions} actions, {total_local}/{len(all_steps)-total_actions} local script MP3s")
    for lesson in data["lessons"]:
        steps = lesson["steps"]
        actions = sum(s["kind"] == "action" for s in steps)
        local = sum(str(s["audio"]).startswith("audio/") for s in steps)
        print(f"{lesson['id']}: rows={len(steps)}, actions={actions}, local_audio={local}/{len(steps)-actions}")
    print(f"Dictionary: {len(data['dictionary'])} occurring terms; words_extra.js overrides words.js")
    for step in all_steps:
        if step.get("audioStatus") == "source-url-fallback":
            print(f"Audio fallback: {step['id']} {step['audioSourceUrl']} ({step['audioError']})")
    for source in data["sources"]:
        print(f"SHA256 {source['name'] or 'index'} {source['sourceSha256']}")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true", help="validate existing JSON and audio offline")
    args = parser.parse_args()
    if args.check:
        data = json.loads(OUTPUT.read_text(encoding="utf-8"))
        validate(data)
        report(data)
        return
    names = ("", *HTML_NAMES, WINDOW_PAGE, WINDOW_JS, *WORD_NAMES)
    def load(name):
        url = urljoin(INDEX, name)
        body, _ = fetch(url)
        return name, {"name": name, "sourceUrl": url, "sourceSha256": sha256(body),
                      "sourceBytes": len(body), "sourceText": body.decode("utf-8")}
    with ThreadPoolExecutor(max_workers=8) as pool:
        sources = dict(pool.map(load, names))
    hub = Document(sources[""]["sourceText"]).root
    links = {urljoin(INDEX, a.attrs.get("href", "")) for a in hub.find("a")}
    for name in (*HTML_NAMES, WINDOW_PAGE):
        if urljoin(INDEX, name) not in links:
            raise ValueError(f"Canonical hub no longer links {name}")
    lessons = replay(sources)
    values, provenance = dictionary(lessons, sources)
    # Embed full lesson snapshots; retain only relevant dictionary entries.
    saved_sources = [{k: v for k, v in source.items() if k != "sourceText" or name not in WORD_NAMES}
                     for name, source in sources.items()]
    data = {
        "sourceIndex": INDEX, "lessons": lessons, "dictionary": values,
        "dictionaryProvenance": provenance, "sources": saved_sources,
        "fetchedAt": datetime.now(timezone.utc).isoformat(),
    }
    (ROOT / "audio").mkdir(exist_ok=True)
    phrases = [s for lesson in lessons for s in lesson["steps"] if s["kind"] == "phrase"]
    print(f"Fetched canonical snapshots; downloading {len(phrases)} existing original MP3s...", flush=True)
    with ThreadPoolExecutor(max_workers=8) as pool:
        list(pool.map(save_audio, phrases))
    validate(data)
    OUTPUT.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    report(data)


if __name__ == "__main__":
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")
    main()
