# How to add a language to the website: 
1. Put a .jpg in the images folder of the flag representing the language and name it the name of the language in lower case (example: german.jpg). The image should have the resolution 150 x 250
2. Add a column in the products database table with the product names in the new language
3. Copy "english.txt" in /_templates/languages/
4. Rename it to the new language (example: german.txt)
5. Replace "en" on the with the language code for the new language (example: !!!LANGUAGE!!! de)
6. Repalce _english with the name of the language, make sure it is the same as in the name of the .txt file (example: !!!LANGUAGE_ID!!! _german)
7. Replace the path to the flag (.images/english.jpg) to the path to the new flag (example .images/german.jpg)
8. Translate the words and phrases on the remaining rows with a template key word (example: !!!PRODUCTS_TITLE!!! Unsere produkten)
9. Run generate_pages-py
10. Done