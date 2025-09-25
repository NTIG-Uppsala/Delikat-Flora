import os
import re

pathLanguages = "_templates/languages"
pathSources = "_templates/source_files"
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

# Finds all templates in the source_files folder
templateList = os.listdir(pathSources)

# Finds all modules in the modules folder
moduleList = os.listdir(pathModules)

# Adds the full path and the template keyword to each module
for module in range(len(moduleList)):
    moduleList[module] = [os.path.join(pathModules, moduleList[module]), f"!!!{moduleList[module].replace(".html", "").upper()}!!!"]


fileList = []

outputFolder = "website"

for template in templateList:

    with open(os.path.join(pathSources, f"{template}"), encoding="utf-8") as t:
        # Read template
        file = t.read()

        for module in moduleList:

            with open(module[0], encoding="utf-8") as m:
                # Read module
                moduleContent = m.read()

                # Replace module call with module
                file = file.replace(module[1], moduleContent)
        fileList.append(file)

for languageTemplate in languageTemplateList:
    for fileNumber in range(len(fileList)):

        # Sets the output file depending on both template and languageTemplate
        file = fileList[fileNumber]
        currentFile = templateList[fileNumber].split(".")[0]
        outputFile = os.path.join(outputFolder, f"{currentFile}{languageTemplate[1]}.{templateList[fileNumber].split(".")[-1]}")

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
                        lineContent = f"{currentFile}{lineContent}"
                    file = file.replace(replaceKeyword, lineContent)

            # Create new complete file
            with open(outputFile, "w", encoding="utf-8") as f:
                f.write(file)
