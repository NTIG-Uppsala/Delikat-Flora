import os
import re

# List of language templates
languageTemplateList = [
    "_templates/languages/swedish.txt",
    "_templates/languages/english.txt",
] 

# List of page templates
pageTemplateList = [
    ["_templates/pages/index.html", "index.html", "index_english.html"],
    ["_templates/pages/about_us.html", "about_us.html", "about_us_english.html"],
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

pageList = []

outputFolder = "website"
        
for pageTemplate in pageTemplateList:

    with open(pageTemplate[0], encoding="utf-8") as p:
        # Read page template
        page = p.read()
        
        for moduleTemplate in moduleTemplateList:

            with open(moduleTemplate[0], encoding="utf-8") as m:
                # Read module template
                module = m.read()

                # Replace module template call with module 
                page = page.replace(moduleTemplate[1], module)
        pageList.append(page)

languageIndex = 0

for languageTemplate in languageTemplateList: 
    languageIndex += 1
    pageNumber = 0

    for page in pageList:
        
        # Sets the output file depending on both pageTemplate and languageTemplate
        outputFile = os.path.join(outputFolder, pageTemplateList[pageNumber][languageIndex])
        pageNumber +=1
    
        with open(languageTemplate, encoding="utf-8") as l:

            for count, line in enumerate(l):
                
                # Checks if the line contains a hashtag and decides if it's a comment or not
                if re.findall("^#", line) == []:
                    isNotIgnored = True
                else:
                    isNotIgnored = False
                    
                # Checks if the line contains nothing at all and decides if it's empty or not
                if re.findall("^$", line) == []:
                    isNotEmpty = True
                else:
                    isNotEmpty = False
                
                if isNotIgnored and isNotEmpty:
                    # Splits the line into two separate strings where the first one contains 
                    # the replace keyword and the second contains the main content
                    lineInfo = line.split(" ", 1)
                    lineContent = lineInfo[1].split("\n")
                    page = page.replace(lineInfo[0], lineContent[0])

            # Create new complete file
            with open(outputFile, "w", encoding="utf-8") as f:
                f.write(page)
