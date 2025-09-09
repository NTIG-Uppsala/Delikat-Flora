import os
 
# List of page templates
pageTemplateList = [
    ["_templates/pages/index.html", "index.html"],
    ["_templates/pages/about_us.html", "about_us.html"],
    ["_templates/pages/consultation.html", "consultation.html"],
    ["_templates/pages/products.html", "products.html"],
    ["_templates/pages/flowergram.html", "flowergram.html"],
    ]

# List of module templates
moduleTemplateList = [
    ["_templates/modules/footer.html", "!!!FOOTER!!!"],
    ["_templates/modules/header.html", "!!!HEADER!!!"],
]

outputFolder = "website"

for pageTemplate in pageTemplateList:
    outputFile = os.path.join(outputFolder, pageTemplate[1])

    with open(pageTemplate[0], encoding="utf-8") as p:
        # Read page template
        page = p.read()
        
        for moduleTemplate in moduleTemplateList:

            with open(moduleTemplate[0], encoding="utf-8") as m:
                # Read module template
                module = m.read()

                # Replace module template call with module 
                page = page.replace(moduleTemplate[1], module)
        
        # Create new complete file
        with open(outputFile, "w", encoding="utf-8") as f:
            f.write(page)
