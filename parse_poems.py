import json

poems_file = 'murky'
poems = {}

f = open('poems/'+poems_file+'.txt')

lines = []
ctr = 0
for line in f:
    line = line.strip()
    if line.split(":")[0] == 'title':
        title = line.split(":")[1].strip()
        lines = []
        ctr = 0
    else:
        ctr += 1
    if line == "}":
        poems[title] = lines
    elif ctr > 1:
        lines.append(line)
    
f.close()
    
with open('poems/poems.json', 'w') as outfile:
    json.dump(poems, outfile)
    