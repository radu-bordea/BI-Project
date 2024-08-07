==========
BI-Project
==========

----------------------
PROJECT IMPLEMENTATION
----------------------

Create a folder: - BI-Project:
Create a server folder in the rooth folder of the project

In the server folder:
- In the CMD(Command Line from the server) run “npm init”
- create a models folder with product.js file inside
In the server folder create the following files: 
- app.js
- mongoose.js
In the server folder from the CMD run:
	- npm install express
	- npm install body-parser
    - npm install mongodb
	- npm install mongoose
 	- npm install -g nodemon
	- npm install cors
	- npm install multer
In the package.json in the “scripts” add:
- “start”: “nodemon app.js”
Implement the necessary code in all the files.
When all the set up connection between the Mongo-Atlas and NodeJS are than, in CMD from the server location run:
- npm start .

In the rooth folder:
- In the CMD from client run "npx create-react-app client"
- a new folder "client" will apear with all react modules
- change the App.js component configuration
create a components folder
In the components folder:
	- create a navigation folder wich holds all the Navigation components and css styles
	  Content.js and Footer.js will belong to components on the same level asd Navigation folder 
	- create a models folder which will contain the models components neeed it for recat front end
	- create Devices.js, Keeper.js, Locations.js, Types.js, models.css
	
install dependencies more:
 - npm install --save react-router-dom@5 --save-exact
 - npm install axios chart.js react-chartjs-2
 - npm install bootstrap
 - npm install react-transition-group
 - npm install react-icons
 - npm install --save google-maps-react
 - npm install @auth0/auth0-react
 - npm install react-slick --save
 - npm install slick-carousel
 - npm install http-proxy-middleware --save
 - npm install @babel/plugin-proposal-private-property-in-object --save-dev
 - npm install --save-dev @babel/preset-env
 - npm install react-app-rewired --save-dev
 - npm install moment
 - npm install react-datepicker
 - npm install --save react-toastify
 - npm install -D tailwindcss
 - npx tailwindcss init
 - npm install @mui/x-charts
 - npm install @mui/material @emotion/react @emotion/styled






create .env file
npm install dotenv


// git commands
- git checkout -b feature
- git rm -r --cached server/node_modules // Remove node_modules from the staging area.
- git checkout main
- git branch -d feature
- git push origin --delete feature


- front end port 443 & ceriticat proxi ????? important
- back needs to comunicate proxi?


- npm i -D nodemon concurrently
- npm install react-scripts

// these are part of scripts:
  "scripts": {
    "server": "nodemon app.js"
    "client": "cd ../client && npm start",
    "start": "concurrently \"npm run server\" \"npm run client\""
  },

  // commands:
  - npm install --save-dev @babel/plugin-proposal-private-property-in-object
- npm run build