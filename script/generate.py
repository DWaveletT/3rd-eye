from typing import Annotated

import frontmatter

import os
import json

md_dir = '../public/article'
rs_dir = '../public/data'

fm = frontmatter.Frontmatter()

fronts = {}

filenames: list[str] = os.listdir(md_dir)

for filename in filenames:
    if filename.endswith('.md'):
        front = fm.read_file(md_dir + '/' + filename)["attributes"]
        fronts[filename.removesuffix('.md')] = front

with open(rs_dir + '/' + 'articles.json', 'w') as f:
    json.dump(fronts, f)
