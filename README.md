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

# Filling Database
 - Ensure Sails is lifted (Either open another tab, or use forever)
 - Navigate to /assets/json
 - curl -X POST -H "Content-Type: application/json" -d @AllSets.json http://localhost:1337/insertCards

# Credits
 - http://hearthstonejson.com/ - Providing Data
