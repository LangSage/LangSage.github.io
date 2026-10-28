"""Record only missing audio, using the imported script text without alteration.

Requires edge-tts >= 7.3.1. Run after import-scripts.py if a source MP3 is missing.
"""
import asyncio
import hashlib
import json
from pathlib import Path
import edge_tts

ROOT = Path(__file__).resolve().parents[1]


async def main():
    path = ROOT / 'scripts-data.json'
    data = json.loads(path.read_text(encoding='utf-8'))
    count = 0
    for lesson in data['lessons']:
        for step in lesson['steps']:
            if step['kind'] != 'phrase' or step.get('audioStatus') != 'source-url-fallback':
                continue
            target = ROOT / 'audio' / f"source-{step['id']}.mp3"
            await edge_tts.Communicate(step['text'], 'en-GB-SoniaNeural', rate='-4%').save(str(target))
            audio = target.read_bytes()
            if len(audio) < 1000:
                raise ValueError(f'Empty audio: {target.name}')
            step.update(audio=f'audio/{target.name}', audioSha256=hashlib.sha256(audio).hexdigest(),
                        audioBytes=len(audio), audioStatus='generated-from-source')
            count += 1
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(f'Recorded {count} missing source phrases.')


if __name__ == '__main__':
    asyncio.run(main())
