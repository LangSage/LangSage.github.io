"""Build the local dialogue audio with the free edge-tts Python package (>=7.3.1).

Run: python hotel_reception_roleplay/tools/generate-audio.py
Already completed recordings are reused. No audio service is called by students.
"""
from __future__ import annotations

import asyncio
import json
from pathlib import Path
import shutil
import subprocess

import edge_tts

ROOT = Path(__file__).resolve().parents[1]


def dialogue() -> list[dict]:
    node = shutil.which("node")
    if not node:
        raise RuntimeError("Node.js is required to read the dialogue data from app.js")
    # Read only the literal lesson data, before any browser code.
    script = """
const fs = require('fs'), vm = require('vm');
const source = fs.readFileSync(process.argv[1], 'utf8');
const data = source.slice(source.indexOf('  const option'), source.indexOf('  const $ ='));
process.stdout.write(JSON.stringify(vm.runInNewContext(data + '; scenarios')));
"""
    result = subprocess.run([node, "-e", script, str(ROOT / "app.js")],
                            check=True, capture_output=True, encoding="utf-8")
    return json.loads(result.stdout)


async def main() -> None:
    output = ROOT / "audio"
    output.mkdir(exist_ok=True)
    semaphore = asyncio.Semaphore(4)
    jobs = []
    for si, scenario in enumerate(dialogue(), 1):
        for ti, step in enumerate(scenario["turns"], 1):
            for kind, text, speaker in [
                ("prompt", step["prompt"], step["speaker"]),
                ("reply", step["options"][step["correct"]]["text"],
                 "Guest" if step["role"] == "guest" else "Receptionist"),
            ]:
                voice = "en-GB-RyanNeural" if speaker == "Guest" else "en-GB-SoniaNeural"
                jobs.append((output / f"{si}-{ti}-{kind}.mp3", text, voice))

    async def record(path: Path, text: str, voice: str) -> None:
        if path.exists() and path.stat().st_size > 1000:
            return
        async with semaphore:
            for attempt in range(3):
                temp = path.with_suffix(".part.mp3")
                try:
                    await edge_tts.Communicate(text, voice, rate="-4%").save(str(temp))
                    if temp.stat().st_size < 1000:
                        raise RuntimeError(f"Empty recording: {path.name}")
                    temp.replace(path)
                    print(path.name, flush=True)
                    return
                except Exception:
                    temp.unlink(missing_ok=True)
                    if attempt == 2:
                        raise
                    await asyncio.sleep(2 * (attempt + 1))

    await asyncio.gather(*(record(*job) for job in jobs))
    print(f"Ready: {len(jobs)} recordings.", flush=True)


if __name__ == "__main__":
    asyncio.run(main())
