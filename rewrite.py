import re
import os

files = [
    r"c:\Users\raesc\Desktop\Antigravity Projects\space-camp-academy\components\infographics\InteractiveInfographic_MayaM11.js",
    r"c:\Users\raesc\Desktop\Antigravity Projects\space-camp-academy\components\infographics\InteractiveInfographic_MayaM6.js",
    r"c:\Users\raesc\Desktop\Antigravity Projects\space-camp-academy\components\infographics\InteractiveInfographic_MayaM14.js"
]

adverbs = [
    r'verdaderamente', r'sumamente', r'absolutamente', r'completamente', 
    r'totalmente', r'extremadamente', r'increíblemente', r'indiscutiblemente', 
    r'inmensamente', r'profundamente', r'maravillosamente', r'espectacularmente',
    r'altamente', r'excepcionalmente', r'increiblemente', r'infinitamente',
    r'fervientemente', r'impecablemente', r'magistralmente', r'meticulosamente',
    r'mágica y cuidadosamente', r'sumamente', r'indiscutible', r'indiscutiblemente',
    r'excesivamente', r'terriblemente', r'extraordinariamente'
]

redundant_patterns = [
    (r'(inmensa|enorme|gigante|colosal|monumental|majestuosa)\s+(y\s+)?(majestuosa|colosal|monumental|inmensa|enorme)', r'\1'),
    (r'(brillante|hermosa|espectacular|fascinante)\s+(y\s+)?(espectacular|fascinante|brillante|hermosa)', r'\1'),
    (r'(misteriosa|oscura)\s+(y\s+)?(misteriosa|oscura)', r'\1')
]

def clean_text(text):
    # Remove filler adverbs
    for adv in adverbs:
        text = re.sub(r'\b' + adv + r'\s+', '', text, flags=re.IGNORECASE)
        text = re.sub(r'\s+' + adv + r'\b', '', text, flags=re.IGNORECASE)
    
    for pattern, repl in redundant_patterns:
        text = re.sub(pattern, repl, text, flags=re.IGNORECASE)

    # Split sentences > 45 words.
    sentences = re.split(r'(?<=[.!?])\s+', text)
    new_sentences = []
    for s in sentences:
        words = s.split()
        if len(words) > 40:
            if ', y ' in s:
                parts = s.split(', y ', 1)
                new_sentences.append(parts[0] + '.')
                next_part = parts[1]
                if next_part:
                    next_part = next_part[0].upper() + next_part[1:]
                new_sentences.append(next_part)
            elif ' y ' in s and len(s.split(' y ', 1)[0].split()) > 15:
                parts = s.split(' y ', 1)
                new_sentences.append(parts[0] + '.')
                next_part = parts[1]
                if next_part:
                    next_part = next_part[0].upper() + next_part[1:]
                new_sentences.append(next_part)
            else:
                new_sentences.append(s)
        else:
            new_sentences.append(s)
            
    return ' '.join(new_sentences)

def process_file(filepath):
    print(f"Reading {filepath}")
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    def replacer(match):
        quote = match.group(1)
        inner = match.group(2)
        cleaned = clean_text(inner)
        return quote + cleaned + quote

    # We will find `content: [ ... ]` block, `text: '...'`, `fact: "..."`
    # and replace the strings inside.
    
    # regex for single string fields: text and fact
    # Matches: text: "...", fact: "..."
    # The lookbehind (?<=text:\s) is tricky with variable spaces, so we'll just capture the prefix.
    def field_replacer(match):
        prefix = match.group(1)
        quote = match.group(2)
        inner = match.group(3)
        cleaned = clean_text(inner)
        return prefix + quote + cleaned + quote

    content = re.sub(r'(text:\s*)([`\'"])((?:\\.|(?!\2).)*?)\2', field_replacer, content, flags=re.DOTALL)
    content = re.sub(r'(fact:\s*)([`\'"])((?:\\.|(?!\2).)*?)\2', field_replacer, content, flags=re.DOTALL)
    
    # For content: [ ... ] we need to find the array and replace strings inside it.
    def content_array_replacer(match):
        prefix = match.group(1)
        array_body = match.group(2)
        suffix = match.group(3)
        
        # inside array_body, replace strings
        new_body = re.sub(r'([`\'"])((?:\\.|(?!\1).)*?)\1', replacer, array_body, flags=re.DOTALL)
        return prefix + new_body + suffix

    # This regex matches `content: [ ... ]` assuming it doesn't contain nested brackets in the array strings
    # We use a non-greedy match until the first `]`
    content = re.sub(r'(content:\s*\[)(.*?)(\])', content_array_replacer, content, flags=re.DOTALL)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"Processed {filepath}")

for f in files:
    if os.path.exists(f):
        process_file(f)
    else:
        print(f"Not found: {f}")
