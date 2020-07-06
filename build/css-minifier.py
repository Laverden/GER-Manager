# -*- coding: utf-8 -*-

import os
import requests

ROOT = os.path.abspath(os.getcwd())
CSS_MIN_PATH = os.path.abspath(os.path.join(ROOT, '../src/css/min'))
CSS_SRC_PATH = os.path.abspath(os.path.join(ROOT, '../src/css/src'))

IGNORE_SRC = []
TARGET_SRC = {'main': IGNORE_SRC}


def compress_src(target='main'):
    """Copies source css into one compressed file.
    It removes comment and empty lines.
    """
    file_dst = '{}-compress.css'.format(target)
    dst = os.path.join(CSS_MIN_PATH, file_dst)

    writer = open(file=dst, mode='w+', encoding='utf-8')

    for _root, _, files in os.walk(CSS_SRC_PATH, topdown=True, followlinks=True): 
        # For each file in every root copy the contents.
    
        for f in files:
            file_path = os.path.join(_root, f)
            file_name = os.path.basename(file_path)

            if target == 'main':
                if file_name in TARGET_SRC[target]:
                    continue

            print('Copying source from {}'.format(file_name))

            with open(file_path ,'r') as c:
                for line in c:
                    if line.startswith('/*') or line.startswith(' *'):
                        continue
                    if line.strip():
                        writer.write(line)

    writer.close()
    print('Source compressed to {}'.format(os.path.basename(dst)))


def minify_src(target='main'):
    '''Sends request for minifiying compressed css file.
    See cssminifier.com for more information.
    '''
    target_file_name = '{}-compress.css'.format(target)
    target_file = os.path.join(CSS_MIN_PATH, target_file_name)
    
    # Grab the file contents
    with open(target_file, 'r') as c:
        css = c.read()

    # Pack it, ship it
    payload = {'input': css}
    url = 'https://cssminifier.com/raw'
    r = requests.post(url, payload)

    # Write out minified version
    mini_name = '{}.min.css'.format(target)
    minified = os.path.join(CSS_MIN_PATH, mini_name)

    with open(minified, 'w') as m:
        m.write(r.text)

    print("Minification complete > {}\n".format(m.name))


if __name__ == "__main__":

    compress_src()
    minify_src()