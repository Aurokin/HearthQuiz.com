# HearthQuiz.com

HearthQuiz is a nodeJS Web Application running on the Sails MVC Framework.  It provides a customizable Quiz for the different Hearthstone Cards. It will be used to help players memorize all the cards in the game.

# Dependencies
 - nodeJS
 - Sails
  - sails-generate-bower
  - sails-postgresql
 - PostgreSQL
 - Bower
 - curl

# Libraries
 - Animate.css
 - Bootstrap
 - jQuery
 - Underscore.js

# Installation
 - Install curl
    sudo apt-get update
    sudo apt-get install curl
 - Install PostgreSQL
  - sudo apt-get update
  - sudo apt-get install postgresql postgresql-contrib
 - Setup PostgreSQL
  - sudo -i -u postgres
  - psql
  - CREATE USER hearthquiz password 'cards';
  - CREATE DATABASE hearthquiz owner hearthquiz;
  - \q
  - exit
 - Install NodeJS
  - sudo apt-get update
  - sudo apt-get install python-software-properties python g++ make
  - sudo apt-get update
  - sudo apt-get install nodejs
 - Install Sails.js
  - sudo npm -g install sails
 - Install Bower
  - sudo npm install -g bower
  - bower install
 - Git Clone
 - Navigate To Directory
  - cd HearthQuiz.com
 - Install Sails-Postgresql
  - sudo npm install sails-postgresql
 - Install Sails-Generate-Bower
  - sudo npm install sails-generate-bower
 - sudo npm install
 - sails lift


# Filling Database
 - Ensure Sails is lifted (Either open another tab, or use forever)
 - Navigate to /assets/json
 - curl -X POST -H "Content-Type: application/json" -d @AllSets.json http://localhost:1337/insertCards

# Credits
 - http://hearthstonejson.com/ - Providing Data
