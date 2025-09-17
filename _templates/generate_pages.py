import os
import re

# List of language templates
languageTemplateList = [
    ["_templates/languages/swedish.txt", ""],
    ["_templates/languages/english.txt", "_english"],
]

# List of page templates
pageTemplateList = [
    ["_templates/pages/index.html", "index"],
    ["_templates/pages/about_us.html", "about_us"],
    ["_templates/pages/consultation.html", "consultation"],
    ["_templates/pages/products.html", "products"],
    ["_templates/pages/flowergram.html", "flowergram"],
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

for languageTemplate in languageTemplateList:
    pageNumber = 0

    for page in pageList:

        # Sets the output file depending on both pageTemplate and languageTemplate
        currentPage = pageTemplateList[pageNumber][1]
        outputFile = os.path.join(outputFolder, f"{currentPage}{languageTemplate[1]}.html")
        pageNumber += 1

        with open(languageTemplate[0], encoding="utf-8") as l:

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
