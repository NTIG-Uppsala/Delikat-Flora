import os

# skapa en fullständig hemsida (ersätt !!!FOOTER!!! med innehållet i footer.html)
# spara till real_website

pageTemplateList = [
    ["_templates/pages/index.html", "index.html"],
    ["_templates/pages/about_us.html", "about_us.html"],
    ["_templates/pages/consultation.html", "consultation.html"],
    ["_templates/pages/products.html", "products.html"],
    ]
moduleTemplateList = [
    ["_templates/modules/footer.html", "!!!FOOTER!!!"],
    ["_templates/modules/header.html", "!!!HEADER!!!"],
]

outputFolder = "website"

# read page template
for pageTemplate in pageTemplateList:
    outputFile = os.path.join(outputFolder, pageTemplate[1])

    with open(pageTemplate[0], encoding="utf-8") as p:
        page = p.read()
        # read module template
        for moduleTemplate in moduleTemplateList:

            with open(moduleTemplate[0], encoding="utf-8") as m:
                module = m.read()

                # replace module template call with module
                page = page.replace(moduleTemplate[1], module)
        
        with open(outputFile, "w", encoding="utf-8") as f:
            f.write(page)
