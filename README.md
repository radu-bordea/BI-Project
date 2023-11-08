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


create .env file
npm install dotenv




// to be continued ....


