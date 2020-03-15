# MyPermit!

Made for Engineering 551 - Advanced Geospatial Topics Winter 2020  
Lab 3 - Mapbox Vector Tile

Link to special demo: https://youtu.be/-CtFOSGZ6OM

## Features 

* Building Permit Date Range Query: This allows users to select a date range and display all permits within the date range.

* Permit Visualization: Once permits are found, they are visualized on the map where users can click on the marker to display relevant information about.  

## Instructions to Run the Website

* Vue: While in the directory, run the command "npm install" to install all the required dependencies used in this project. Once that is finished installing, run the command "npm run serve". This will host the website on your local machine and you can access it by going to "localhost:8080" which is the default address.  

## File Explanation 
* .gitignore - This file is used to ignore directories or files when pushing/ committing changes. In this case we are ignoring node modules that have been installed for the website. To install these dependencies and modules, we can use the command "npm install".

* package.json/ package-lock.json - These files describe what dependencies and modules that the website uses.

* /public - Here you can find the index.html used for the website.

* /src/App.vue - This file contains the vue application that uses the components. 

* /src/components - This app uses two components. The toolbar.vue component contains the code for the UI including the app bar and search tool. The leaflet.vue component contains the code for the map and implementing data visualization.  
