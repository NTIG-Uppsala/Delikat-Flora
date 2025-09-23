# How to setup webhost on delikat.ntig.dev

1. Open CMD
2. Type SSH connection string: ssh root@ntig.dev -p 62041
3. Enter the password
4. Type apt update
5. Type apt upgrade
6. Type apt install nginx
7. Cd to nginx with cd /etc/nginx/
8. Cd to sites-available with cd sites-available/
9. Go into nano default by typing nano default in cmd
10. Go to server line and change listen from 80 to 3000
11. Add website after root /var/www/html; to this /var/www/html/website;
12. Restart nginx by typing systemctl restart nginx
13. Cd into html by typing cd /var/www/html/
14. Type ls to see all files in html
15. Type rm index to remove the autocreated index file in html
16. Install git by typing apt-get install git-all
17. Update git by typing apt-get update
18. Use git clone to clone repository by typing git clone https://github.com/NTIG-Uppsala/Delikat-Flora
19. Copy the file "config.example.js" and rename it to "config.js"
20. Enter the database url and database api key in "config.js"

# How to setup webhost on delikatdev.ntig.dev

1. Open CMD
2. Type SSH connection string: ssh root@ntig.dev -p 62040
3. Enter the password
4. Type apt update
5. Type apt upgrade
6. Type apt install nginx
7. Cd to nginx with cd /etc/nginx/
8. Cd to sites-available with cd sites-available/
9. Go into nano default by typing nano default in cmd
10. Go to server line and change listen from 80 to 3000
11. Add website after root /var/www/html; to this /var/www/html/website;
12. Restart nginx by typing systemctl restart nginx
13. Cd into html by typing cd /var/www/html/
14. Type ls to see all files in html
15. Type rm index to remove the autocreated index file in html
16. Install git by typing apt-get install git-all
17. Update git by typing apt-get update
18. Use git clone to clone repository by typing git clone https://github.com/NTIG-Uppsala/Delikat-Flora .
19. Copy the file "config.example.js" and rename it to "config.js"
20. Enter the database url and database api key in "config.js"