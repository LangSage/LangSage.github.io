"""Choose one spoken alternative; retain the canonical source in step['text']."""
import re


def practice_text(text):
    text = re.sub(r'\bmorning\s*[/\\]\s*afternoon\s*[/\\]\s*evening\b',
                  'morning', text, flags=re.I)
    text = re.sub(r'\belevator\s*/\s*lift\b', 'elevator', text, flags=re.I)
    text = re.sub(r'\bsir\s*/\s*madam\b', 'sir', text, flags=re.I)
    text = re.sub(r'\?\s*/\s*Any wishes\?', '?', text, flags=re.I)
    text = re.sub(r'\?\s*/\s*Do you agree\?', '?', text, flags=re.I)
    # The bracket is a Russian author cue attached to the visit/see alternative.
    text = re.sub(r'\s*\([^)]*[А-Яа-яЁё][^)]*\)\s*/\s*see', '', text, flags=re.I)
    if '/' in text or '\\' in text:
        raise ValueError(f'Unresolved spoken alternative: {text}')
    return ' '.join(text.split())


def apply_practice_text(data):
    for lesson in data['lessons']:
        for step in lesson['steps']:
            if step['kind'] != 'phrase':
                continue
            cleaned = practice_text(step['text'])
            if cleaned != step['text']:
                step['practiceText'] = cleaned
                translation = step.get('translation', '')
                translation = re.sub(r'утро\s*[/\\]\s*день\s*[/\\]\s*вечер', 'утро', translation, flags=re.I)
                translation = re.sub(r'сэр\s*/\s*мадам', 'сэр', translation, flags=re.I)
                translation = re.sub(r'\?\s*/\s*(?:Какие-то пожелания|Вы согласны)\?', '?', translation, flags=re.I)
                translation = re.sub(r'\s*/\s*увидеть', '', translation, flags=re.I)
                if 'Гость:' in step.get('originalText', ''):
                    translation = translation.split('Гость:')[0].strip()
                if translation != step.get('translation', ''):
                    step['practiceTranslation'] = translation
            else:
                step.pop('practiceText', None)
                step.pop('practiceTranslation', None)
