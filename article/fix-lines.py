import os

files = os.listdir('./')
# files = ['test.md']

for filename in files:
    if not filename.endswith('.md'):
        continue
    
    with open(filename, 'r', encoding='utf-8') as f:
        text = f.read().split('\n\n')
    
    text.pop()

    with open(filename, 'w', encoding='utf-8') as f:

        for line in text:
            f.write(line + '\n')