import os

files = os.listdir('./')
# files = ['test.md']

for filename in files:
    if not filename.endswith('.md'):
        continue
    
    with open(filename, 'r', encoding='utf-8') as f:
        text = f.read().split('\n')
    
    text.pop()

    with open(filename, 'w', encoding='utf-8') as f:

        for line in text:
            raw = line.strip()

            if len(raw) != 2 and raw.find('$$') != -1:
                if raw.startswith('$$') and raw.endswith('$$'):
                    raw = '$$\n' + raw[2 : -2] + '\n$$'
                    print('case 1')
                elif raw.startswith('$$'):
                    raw = '$$\n' + raw[2 :   ]
                    print('case 2')
                else:
                    print('case 3')
                    raw = raw[: -2] + '\n$$'

                f.write(raw + '\n')
            else:
                f.write(line + '\n')
