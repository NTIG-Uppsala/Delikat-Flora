import os
import re

pathLanguages = "_templates/languages"
pathPages = "_templates/pages"
pathModules = "_templates/modules"

# Finds all language templates in the languages folder
languageTemplateList = os.listdir(pathLanguages)

# Makes each language template its own list
for lang in range(len(languageTemplateList)):
    languageTemplateList[lang] = [languageTemplateList[lang]]

# Adds "_language" suffix to all languages except swedish
for lang in range(len(languageTemplateList)):
    if languageTemplateList[lang][0] == "swedish.txt":
        languageTemplateList[lang].append("")
        continue
    else:
        languageTemplateList[lang].append(f"_{languageTemplateList[lang][0].replace(".txt", "")}")

# Finds all page templates in the pages folder
pageTemplateList = os.listdir(pathPages)

# Finds all module templates in the modules folder
moduleTemplateList = os.listdir(pathModules)

# Adds the full path and the template keyword to each module template
for module in range(len(moduleTemplateList)):
    moduleTemplateList[module] = [os.path.join(pathModules, moduleTemplateList[module]), f"!!!{moduleTemplateList[module].replace(".html", "").upper()}!!!"]


pageList = []

outputFolder = "website"

for pageTemplate in pageTemplateList:

    with open(os.path.join(pathPages, f"{pageTemplate}"), encoding="utf-8") as p:
        # Read page template
        page = p.read()

        for moduleTemplate in moduleTemplateList:

            with open(moduleTemplate[0], encoding="utf-8") as m:
                # Read module template
                module = m.read()

                # Replace module template call with module
                page = page.replace(moduleTemplate[1], module)
        pageList.append(page)

for languageTemplate in languageTemplateList:
    pageNumber = 0

    for page in pageList:

        # Sets the output file depending on both pageTemplate and languageTemplate
        currentPage = pageTemplateList[pageNumber].replace(".html", "")
        outputFile = os.path.join(outputFolder, f"{currentPage}{languageTemplate[1]}.html")
        pageNumber += 1

        with open(os.path.join(pathLanguages, languageTemplate[0]), encoding="utf-8") as l:

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
                    replaceKeyword = lineInfo[0]
                    lineContent = lineInfo[1].split("\n")[0]
                    if re.findall("^!!!LANGUAGE_LINK", lineInfo[0]) != []:
                        lineContent = f"{currentPage}{lineContent}"
                    page = page.replace(replaceKeyword, lineContent)

            # Create new complete file
            with open(outputFile, "w", encoding="utf-8") as f:
                f.write(page)
