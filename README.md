# AppProgCwk

# **[GitPushNumber]**

# [1] Added all the files into here, the index.mjs will need more modularisation

# pushed to github

# **[TESTING]** button pushing

# [2] Ditched the idea of 'inputbox',
# added letters as buttons instead,
# improved the design of the game to make the UI appeal better.

# [3] Made functionality of the letter-buttons on screen,
# allowing the user to use both the keyboard and buttons to choose their letter.

# [4] Generating randoms moved from client to server

# [5] Improved the wins/losses grabbed from server and set on client

# [6]
# - Added the grid style,
# - Improved the UI,
# - Changed 'lives' variables to 'guesses',
# - Modularised 'mouseClickCheck.mjs', 'disable/enable~Inputs.mjs', 'displayMessage.mjs', 'createPrompt.mjs'
# - Added a category 'lecturers',
# - Changed canvas properties.

# [7]
# improved coding structure and functions;
# - Improved namings of functions and variables,
# - In 'index.mjs', the switch statement was improved on function 'checkKeys',
# - In 'index.mjs', the asynchronous functions that retrieve a random category and a word were improved,
# - Improved validation of the input based on whichever key was presed on user keyboard,
# - Removed the 'check' button as it was pointless to have it at this point,
# - improved the design of the game more to make the UI appeal better, using grids.

# **[NEW_BRANCH]**
# added lint
# [8]
# Made some changes to the code and added package.json for 'eslint' config
# [9]
# Fixed all problems identified by ESLint (with portsoc config)

# [10]
# Added the name option after the player decides to finish playing the game through the prompt button 'No' after asking to play again.
# If they choose 'Yes', the game will restart with defaulted variables.

# [11]
# When the player enters their name, that name along with their wins and losses score will become an object and stored in the list on server.
# Each time new player is added, the list of those players will be displayed on the console/terminal on server-side.

# [12]
# Changed canvas properties as well as stickman colour-coding to appeal better.

# [13]
# Ditched the idea of keeping most things on a server, because of more problems arising with it rather than using current state of the code.

# **[FEATURES]**

# ---
# A server will host the game;
# - It will store client values of lives, wins and losses.
# - It will store all available categories as well as the words, which will be randomised and sent to the client once requested.
# - It will store the list of stats, where the names of the players as well as their score and unique user id will be stored and displayed on a console/terminal at server-side.
# ---
# ---
# A client will prepare all handles once the page is loaded to effectively access DOM elements. These handles are modularised on a separate JS file.
# A client will check event listeners for pressing mouse button and a key.
# A client will fetch the score count list from the server where the lives, wins and losses are stored, diplay it on the web page.
# Gallows will be displayed as canvas. A nice background is drawn and gallows are brown colour. The stickman is colour-coded in different stages of guesses.
# Error messages will be displayed on a client web page and client console if any problems arise by fetching from or posting to the server.
# ---

# [HOW-TO-PLAY]
# When the game starts, the player will be shown a category of the word, blanks for that hidden word and their chosen letter displayed with 'Your letter' as well as the disabled input box with 3 dots. (This only exists to show what letter they picked)

# [1]
# The player can either use the keyboard to press any key of their choice or press any button on the page to record that letter as their choice.

# [2]
# The game will also display how many guesses the player has left.
# 'guesses left: 8'

# [3]
# If their guess was correct, that certain blank for the letter will be revealed, opening up the hidden word.

# [4]
# If their guess was wrong, the page will display the user the warning message, saying that their letter was incorrect, thereby reducing the guess count and drawing a gallow on canvas (a stickman hanging).

# [5]
# If their guess is repeated despite it already being recorded, the page will display a warning message saying that their letter was already guessed before.

# [6]
# Regardless of the letter being correct or wrong, it will be recorded into an array called 'usedLetters' which will store the chosen letters.

# [7]
# Once the player guesses the word correctly, the value of their 'wins' will be increased. Same thing for 'losses' value. This will be their score.

# [8]
# Once the game is finished regardless of the condition, the player will be prompted to play again and as stated before, either they play again to increment the score of 'wins' or 'losses' or decide to finish and add their name to the stat on a server.

# [9]
# Once they are on a 'prompting' stage, all the other buttons and inputs will be disabled to avoid tampering or cheating with the page. Even if the player reloads the page, they will restart the game but their score will be remembered, so they can't trick it.