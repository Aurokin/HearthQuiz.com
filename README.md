# HearthQuiz.com

HearthQuiz is a nodeJS Web Application running on the Sails MVC Framework.  It provides a customizable Quiz for the different Hearthstone Cards. It will be used to help players memorize all the cards in the game. Currently live at http://HearthQuiz.com/

# Dependencies
 - nodeJS
 - Sails
  - sails-generate-bower
  - sails-postgresql
 - PostgreSQL
 - Bower


# Libraries
 - Animate.css
 - Bootstrap
 - jQuery
 - Underscore.js

# Installation
 - Install PostgreSQL
```
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib
```
 - Setup PostgreSQL
```
sudo -i -u postgres
psql
CREATE USER hearthquiz password 'cards';
CREATE DATABASE hearthquiz owner hearthquiz;
\q
exit
```
 - Install NodeJS
```
sudo apt-get update
sudo apt-get install python-software-properties python g++ make
sudo apt-get update
sudo apt-get install nodejs
```
 - Install Sails.js
```
sudo npm -g install sails
```
 - Install Bower
```
sudo npm install -g bower
bower install
```
 - Git Clone
 - Navigate To Directory
```
cd HearthQuiz.com
```
 - Install Sails-Postgresql
```
sudo npm install sails-postgresql
```
 - Install Sails-Generate-Bower
```
sudo npm install sails-generate-bower
```
 - Finish Instalation / Start Application
```
sudo npm install
sudo sails lift (--prod)
```

# Credits
 - http://hearthstonejson.com/ - Providing Data
