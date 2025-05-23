# 1 - Project Title
Recipedia - BBY17

## 2 - Project Description
Our team BBY17 is developing a web app to select and track food items a user has in their home and allow them to post, browse and filter recipes based on those ingredients. Think of it sort of like a reverse-cookbook!

2.1 - Project Pitch:
Have you ever opened the fridge and stared at a random sort of vegetables, condiments, maybe some random proteins and felt unsure what to make? Have you ever been stuck in a loop, being hungry and having some vague sense of what you want to eat but not able to pull the trigger on anything? Recipedia is here to help. Simply enter some of the key ingredients in your fridge. Choose a tag such as “healthy”, “quick”, or maybe from a particular style of cuisine such as “italian” or “chinese”, and recipedia will give a list of recipes that match the criteria. Think of it kind of like a reverse cookbook.


2.2 - Names of Contributors:
* Liam Pickrell - 
    I contributed the organization, setup and hosting of our database in MySQL. I also assisted with the setup of front end elements like the individual recipe's pages and the cards the recipes are displayed onto. I finally made the functionality of fetching all data related to recipes in our database and posting it onto the home page and each individual recipe's pages.
* Kaid Krawchuk - 
    I created and contributed to many of the components we used throughout our app includeing the search bar which suggest ingredients from our database, the primary button used in various locations, the ingredient modal which lets you choose whether an ingredient goes into the fridge or pantry, the clickable recipe card that displays options, the galleries we use to hold the cards on the cookbook and home page, and the 'Pantry' and 'Fridge' containers that hold selectable ingredients. I styled the newest version of our top navbar as well.
    I also contributed to creating the fridge and cookbook page. I also completed the styling and and color pallet of each page of our app.
    I created various routes for our app, and worked on functionality to get and post ingredients/recipes from our database.
* Lucas Liu - 
    ***Insert details of what you contributed here***
* Leslie Zhang - 
    I created the overall project structure, set up the development environment for the team, created the UIs and APIs for user profile, register, login, and session, as well as the routing for each page so our project will be an SPA. I also created the AWS EC2 instances for hosting and deployed the project there. 
* James Smith - 
    I contributed to expanding and tweaking our MySQL database to improve its usefulness in our project, such as creating join tables for recipe and ingredient tracking. This also extended to filling in data for the website's ingredient list, and starting recipes (and associated join tables). I also made the functionality relating to writing new recipes to the database, as well as displaying user-written recipes on their cookbook page. Finally, I also worked on the initial work of pinning down the webapp's visual style, and creating the info-footer at the bottom of the webapp page.
	
## 3. Technologies and Resources Used

3.1 - List technologies (with version numbers), API's, icons, fonts, images, media or data sources, and other resources that were used.

* React, HTML, JavaScript, CSS
* Tailwind (Frontend library)
* MySQL (Database)
* Azure (Hosting the database)
* Render (Hosting the website)
* ChatGPT 4.0 mini (used to annotate code)
* Discord: Used for informal communication among team members for quick updates. 
* Zoom: Used for Weekly Scrum Meetings with our supervisor.
* Slack: Used for text communication between the team and our supervisor.
* Trello: Tracks sprint progress, assigns tasks, and monitors completion stages.
* Figma: Facilitates collaborative design, prototyping, and layout planning.
* GitHub: Serves as the central repository for version control, enabling team collaboration, code review, and tracking changes throughout the development process.
* SourceTree: Clarifies and simplifies the GitHub branching and commiting.

## 4: Contents of Folder
Content of the project folder:

```
 4.1 - Top level of project folder: 
├── .gitignore                # Git ignore file, listing what is excluded from the GitHub repo.
├── .env                      # The environment variables and their key-value pair. 
├── .env-sample               # The sample file of what the .env file contains. Just contains the key, without its value.
├── about.html                # A page that details the authors of the web app.
├── README.md                 # The file that lists the full details about the project.

4.2 - It has the following subfolders and files:

├── client                    # Folder for all the client-side files or the front-end of the app.

    /node-modules             # Folder containing all the Node-related files.

    /Public                   # Folder containing all the visible files using the URL of the web app.
        /Meals                # Folder containing all the stock images that are displayed on recipe cards.

    /src                      # Folder containing all the front-end files 
        /assets               # Folder containing the react logo
        /components           # Folder containing the react components used in pages. 
            /FilterTagSection.jsx               # File that displays the card that contains the tags to select
            /footbar.jsx                        # Handles the front end for the footbar
            /infoFooter.jsx                     # Handles the info footer on the front end
            /IngredientModal.jsx                # Contains the Modal for adding ingredients to either the pantry or fridge
            /PrimaryButton.jsx                  # File that styles all buttons consistently
            /recipecard.jsx                     # File that displays and styles each individual recipe card
            /recipecardgallery.jsx              # File that displays the combination of all the recipe cards on the home screen
            /SavedRecipeGalleryContainer.jsx    # File that displays the user's saved recipes in a horizonal scroll layout
            /search_bar.jsx                     # Displays each search bar as a layout
            /SearchBarWithDropdown.jsx          # Displays the dropdown for certain dropdown
            /SearchList.jsx                     # Displays the list that is contained within each dropdown searches 
            /SuggestedRecipeGallery.jsx         # Displays a grid layout of the suggested recipes based on user's ingredients
            /topnavbar.jsx                      # Displays the top nav bar and all buttons contained
            /UserLocation.jsx                   # Displays the user's location using OpenCage API
            /WarningMotal.jsx                   # Displays the warning modal when a user clicks to delete an self-written recipe

        /context              # Folder containing the authorization context.jsx file
            /AuthContext.jsx  # Authorizes a user and saves a session to the database

        /layout               # Folder containing the file that handles the layout of all sites.
            /Layout.jsx       # File that wraps every page element together to set the overall layout

        /pages
            /cookbook.jsx           # File for the overall cookbook page
            /createRecipe.jsx       # File for the Write a Recipe page
            /fridge.jsx             # File for the fridge page
            /home.jsx               # Home page, landing page for when a user is logged in or first registered
            /Index.jsx              # Landing page for unauthorized users
            /Login.jsx              # Login page that allows an existing user to log-in
            /NotFound.jsx           # Page that is routed to when a 404 error is encountered
            /RecipeDetail.jsx       # Page that is used for the AI generating "funny" recipes
            /RecipePage.jsx         # Page that is used for each individual recipe from the database
            /Register.jsx           # Registration page for brand new users
            /suggestedRecipes.jsx   # Page for the suggested recipes based on database recipes and user's ingredients
            /UserProfile.jsx        # Page for displaying the user's profile
        /utils
            /getClosestImagePath.js     #Front end script file that contains functionality to display an image based on a recipe's title
        /App.css            # File containing styling elements that span the entire application 
        /App.jsx            # File containing the routes for all front end files
        /index.css          # File containing the tailwind extentions used in all front end files
        /main.jsx           # Contains the routes and order for all front end files

    /index.html             # Contains the HTML rules that are used in all files, contains the route into main.jsx
    /package.json           # File with installation regulations for front end of the application
    /tailwind.config.js     # Contains the global tailwind front end display elements
    /vite.config.js         # Configures vite

├── server                   # Folder for the server side files and folders.
    /controller              # Folder containing all files that control backend functions
        /allUserIngredient.js       # Fetches the user's ingredients that are in their fridge
        /auth.js                    # Handles the authorization of users, hashes passwords, sets sessions
        /autosuggestsearchbar.js    # Gets all ingredients from the database meant to be used in search bars
        /funnyRecipe.js             # Sends all ingredients in the user's fridge and inputs a prompt to make a funny recipe using AI
        /getFridge.js               # Fetches all ingredients in the user's fridge and pantry
        /regularRecipe.js           # Sends all ingredients in the user's fridge and inputs a prompt to make a recipe using AI
        /savedRecipe.js             # Contains logic to fetch and save recipes
        /session.js                 # Contains session rules and submits to database
        /submitRecipe.js            # Sends the newly written recipe to the database
        /suggestRecipe.js           # Contains the logic that suggests a recipe in the database based on the user's ingredients
        /tags.js                    # Displays the tags that are in the database
        /userRecipes.js             # Fetches all saved recipes from the currently logged in user

    /middleware              # Folder for the middleware files
        /auth.js                        # Compares and validates authorization fields 
        /checkRecipeAlreadySaved.js     # Checks the user's saved recipes and sets the heart icon's colour accordingly
        /session.js                     # 

    /routes         # Folder containing all routing files
        /allUserIngredient.js       # Routes the user's ingredients
        /auth.js                    # Routes the authorization files
        /autosuggestsearchbar.js    # Routes the search bar
        /funnyRecipe.js             # Routes the AI funny suggested recipes
        /getFridge.js               # Routes the fridge functions
        /ingredients.js             # 
        /recipe.js                  # Routes the recipes on the home page and on each individual recipe pages
        /regularRecipe.js           # Routes the AI suggested regular recipes
        /savedRecipe.js             # Routes the user's saved recipes
        /session.js                 # Routes the sessions
        /submitRecipe.js            # Routes the submit recipe functionality
        /suggestRecipe.js           # Routes the recipe suggestion based on ingredients
        /tags.js                    # Routes the database's tags
        /userRecipes.js             # Routes the user's created recipes

    /app.js             # Entry point of the server of the application, calls on all other imports in the server folder
    /db.js              # Entry point of the database connection with MySQL 
    /package.json       # File containing installation information for server side


## 5. Complete setup/installion/usage

5.1 - SETUP AS A DEVELOPER:
* After downloading files in structure listed below in section 7, the developer should first confirm the contents of each package.json file. 
* The developer should then ensure Node.js is setup on their machine. To setup, visit nodejs.org and follow the steps to download the installer for your local machine's operating system.
* Once the long-term support version of Node.js is downloaded and installed on the local machine, confirm setup by running either Node -v or npm -v in the command line.
* Once confirmed, open a command line editor in both the client folder and server folder. 
* The instruction npm install or npm i will install dependencies needed and listed on the package.json file. This should be done in both the client and server folder.
* To run the server, run the command node app.js in the command line. If constant edits are being made and the developer wishes for the server to update as the server changes, run the command node --watch app.js.
* To run the client side using the developer's localhost, input the command npm run dev.

5.2 - SETUP AND USAGE AS A USER:
* When a user first navigates to our app, they will be prompted to either login or register as a new user. When they click register, they will need to input a username, email and password. If they already have an existing account, they will login using their username and password. 
* Once the user is authenticated or registered for the first time, they will arrive at the landing page with a greeting at the top and several featured recipe cards listed below. The user can then scroll through the list of favorited recipes if they wish to find inspiration of recipes to cook. A recipe can be saved by clicking on the heart icon in the recipe card.
* When a user clicks on any of the recipe cards, a recipe page is loaded and the full details about the ingredients required and steps is populated. The user can save a recipe by clicking on the heart icon next to the recipe's title.
* Next, the user can navigate to their fridge page using the bottom navbar. The user will click on the plus icon which expands the bottom navbar, then they can click on the left icon labeled fridge. The fridge page is how the app will know what ingredients the user currently has in their fridge.
* The fridge page will prompt the user to input a list of ingredients they currently have in either their fridge or pantry at home. Using the suggested search-bar, type ingredients and either click to add them to your fridge or pantry. The fridge is meant for exiprable items that belong in your fridge, and pantry is meant for ingredients that aren't expected to expire within a year and will be assumed the user always has this ingredient on hand. 
* Once the user has added all the items that are currently in their fridge and pantry, they can click on the "Suggest Recipe" button. This will re-direct the user to a page that will display recipe cards with recipes that only contain the ingredients they currently have at home. 
* Next, if the user clicks the bottom navbar again (plus icon) and then clicks the middle wand icon, the app will suggest a "funny" recipe based on the ingredients the user has in their fridge. The funny recipe will be generated using Gemini 2.5 text AI. 
* The user can then click on the cookbook page which is the right pot icon which routes them to a page that contains a list of the user's saved recipe at the top. Below, a list will populate of the user's written recipes. These recipes will populate into cards that contain a heart icon and a trash bin icon that will delete the recipe if the user wishes. If this user hasn't entered a personal/custom recipe, this list will be empty. 
* At the bottom of the cookbook page, there is a button the user can click labelled "Write a New Recipe". When the button is clicked, the app routes to a page where the user can input the recipes details including title, description, ingredients, steps and tags. The user can then either Submit Recipe by clicking the appropriately labelled button. If you'd like to reset the forms, the user can click the "Reset" button. 
* The user can navigate to the home page by clicking on the Recipedia title or the "Home" button in the top navbar.
* The user can logout of their account using the "Logout" button in the top navbar. The app will re-route to the landing page which prompts the user to either login or register. 
* The user can view their profile details by clicking on the person icon in the top navbar. 
* The user can click on the FAQ button on the bottom footer-bar to see the details of the site's authors.
* The user can click on the GitHub icon in the bottom footer-bar to re-route to the GitHub repo the developers used to make Recipedia. 


## 6 - How to use our webapp:

6.1 - How to use Recipedia

6.2 - Known Bugs and Limitations
* The system will only suggest recipes that are exact matches of a list of the ingredients the user contains. 
* User profile page doesn't allow users to alter their profile, just view it.
* Recipe's tags aren't fully functional
* All users currently have the ability to add ingredients that aren't in our database into the fridge or pantry.


6.3 - Features for Future
* Further implementation of AI to suggest serious recipes using user's ingredients if there isn't any such recipes that exist in Recipedia's database. 
* Expansion of the ingredient marker system, to allow users to filter away recipes that contain certain types of ingredients, like seafood or peanuts.
* Expansion of the available pictures displayed with recipes, or allowing users to upload their own photos.
* Adding additional information on the recipe page, such as displaying author username (after content moderation is added), or displaying the number of likes.
* Adding content moderation, with automatic filtration to stop users from entering profanity to the system.

## 7 - Credits, References and Licenses

7.1 - Front End Details and additional plugins:
    React + Vite

        This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.
        Currently, two official plugins are available:

        - [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh

        - [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

    Expanding the ESLint configuration

        If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## 8 - Outside Acknowledgements:

8.1 - API usage:

8.2 - AI Usage:
    * ChatGPT:

    * DeepSeek:

8.3 - Other Acknowledgements:

    * Net Ninja:
        Net Ninja tutorials were used as a baseline that many of our information modals were used from, that was then repurposed as needed for the project.

        See: https://www.youtube.com/watch?v=tt5uUMQgzl0 
    

## 9 - Contact Information