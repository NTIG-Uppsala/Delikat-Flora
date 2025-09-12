import os
import re

languageTemplateList = [
    "_templates/languages/swedish.txt",
    "_templates/languages/englisg,txt",
] 

# List of page templates
pageTemplateList = [
    ["_templates/pages/index.html", "index.html", "index_english.html"],
    ["_templates/pages/about_us.html", "about_us.html", "about_us_english"],
    ["_templates/pages/consultation.html", "consultation.html", "consultation_english.html"],
    ["_templates/pages/products.html", "products.html", "products_english.html"],
    ["_templates/pages/flowergram.html", "flowergram.html", "flowergram_english.html"],
    ]

# List of module templates
moduleTemplateList = [
    ["_templates/modules/footer.html", "!!!FOOTER!!!"],
    ["_templates/modules/header.html", "!!!HEADER!!!"],
    ["_templates/modules/global_js.html", "!!!JS!!!"],
]

outputFolder = "website"
languageIndex = 0

for languageTemplate in languageTemplateList: 
    languageIndex += 1
    
    with open(languageTemplate, encoding="utf-8") as l:
        
        for pageTemplate in pageTemplateList:
            outputFile = os.path.join(outputFolder, pageTemplate[languageIndex])

            with open(pageTemplate[0], encoding="utf-8") as p:
                # Read page template
                page = p.read()
                
                for moduleTemplate in moduleTemplateList:

                    with open(moduleTemplate[0], encoding="utf-8") as m:
                        # Read module template
                        module = m.read()

                        # Replace module template call with module 
                        page = page.replace(moduleTemplate[1], module)
                
        for count, line in enumerate(l):
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
                lineContent = lineInfo[1].split("\n")
                page = page.replace(lineInfo[0], lineContent)
                print(lineInfo)
                print("---------")
        # Create new complete file
        with open(outputFile, "w", encoding="utf-8") as f:
            f.write(page)
