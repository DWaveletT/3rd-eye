import json
import os
import yaml

import time

LUOGU_DIR = 'D:/ComputerScience/workspace/blog/luogu-climb/'
ARTICLE_DIR = '../public/article/'

article_list = os.listdir(LUOGU_DIR + 'articles')

for article_name in article_list:
    print(article_name)

    with open(LUOGU_DIR + 'articles/' + article_name, 'r', encoding='utf-8') as f:
        article = json.loads(f.read())
    
    md = {}
    md['create_time'] = article['time']
    md['update_time'] = article['time']
    md['title'] = article['title']
    md['board'] = 1
    md['tag'] = []

    name = ''

    problem = article['solutionFor']

    if problem != None:
        
        md['tag'].append(1)
        md['extension'] = {
            'problem': {
                'id': problem['pid'],
                'type': problem['type'],
                'title': problem['title'],
                'difficulty': problem['difficulty'],
                'submitted': problem['submitted'],
                'accepted': problem['accepted'],
            }
        }
        name = 'solution-' + problem['pid'].lower()
    else:
        md['tag'].append(2)
        name = input(article['title'] + '\n')
    
    name = name + '.md'
    
    with open(ARTICLE_DIR + name, 'w', encoding='utf-8') as f:
        f.write('---\n')
        f.write(yaml.dump(md, allow_unicode=True, sort_keys=False))
        f.write('---\n\n')
        f.write(article['content'])
    
    # time.sleep(5)