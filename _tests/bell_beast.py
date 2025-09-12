import re

with open("_templates/languages/swedish.txt", encoding="utf-8") as l:
    # for count, line in enumerate(l):
    for i in range(50):
        line = l.readline()
        if re.findall("^<", line) == []:
            isNotIgnored = True
        else:
            isNotIgnored = False
        if re.findall("^$", line) == []:
            isNotEmpty = True
        else:
            isNotEmpty = False
        
        if isNotIgnored and isNotEmpty:
            lineInfo = line.split(" ", 1)
            
            print(lineInfo)
            print("---------")