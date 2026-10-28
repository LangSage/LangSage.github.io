"""Record missing audio and the user's selected single spoken alternatives.

Requires edge-tts >= 7.3.1. Run after import-scripts.py if a source MP3 is missing.
"""
import asyncio
import hashlib
import json
from pathlib import Path
import edge_tts
from practice_text import apply_practice_text

ROOT = Path(__file__).resolve().parents[1]


async def main():
    path = ROOT / 'scripts-data.json'
    data = json.loads(path.read_text(encoding='utf-8'))
    apply_practice_text(data)
    count = 0
    for lesson in data['lessons']:
        for step in lesson['steps']:
            if step['kind'] != 'phrase':
                continue
            text = step.get('practiceText', step['text'])
            normalized = 'practiceText' in step
            text_hash = hashlib.sha256(text.encode('utf-8')).hexdigest()
            if normalized and step.get('speechTextSha256') == text_hash and (ROOT / step['audio']).is_file():
                continue
            if not normalized and step.get('audioStatus') != 'source-url-fallback':
                continue
            target = ROOT / 'audio' / f"{'practice' if normalized else 'source'}-{step['id']}.mp3"
            await edge_tts.Communicate(text, 'en-GB-SoniaNeural', rate='-4%').save(str(target))
            audio = target.read_bytes()
            if len(audio) < 1000:
                raise ValueError(f'Empty audio: {target.name}')
            step.update(audio=f'audio/{target.name}', audioSha256=hashlib.sha256(audio).hexdigest(),
                        audioBytes=len(audio), audioStatus='single-alternative' if normalized else 'generated-from-source',
                        speechText=text, speechTextSha256=text_hash)
            count += 1
            print(target.name, flush=True)
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(f'Recorded {count} script phrases.')


if __name__ == '__main__':
    asyncio.run(main())
