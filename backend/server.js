global.mongoose = require("mongoose");

const dbName = "cute_animals";
mongoose.connect(`mongodb://localhost/${dbName}`, { useNewUrlParser: true });

global.db = mongoose.connection;

db.on("error", () => console.log("Couldn't connect to DB"));

db.once("open", () => {
  console.log("Connected to DB");
  startWebServer();
});

const express = require("express");
const path = require('path');
// Create a new webserver
// based on express
const app = express();
const PORT = 4000;

// Serve static files from the folder www
app.use(express.static(path.join(__dirname, "../frontend/build")));
app.use(express.json());

const fs = require("fs");
// Factory for loading all entities in the schemas folder
// Must load this before REST and API modules
const schemaModels = fs.readdirSync(__dirname + '/schemas');
schemaModels.forEach(model => require(`./schemas/${model}`))

const Rest = require("./modules/rest");
new Rest(app);

// Create route for start page
// req = request, res = response
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

app.get("/about", (req, res) => {
  res.setHeader("Content-Type", "text/plain");
  res.status(404).sendFile(path.join(__dirname, "../frontend/www/about.html"));
});

// Handle missing pages/404
// Put this last in your code,
// just before starting the server

app.all("*", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.status(404).send(`<h1>Page not found ${req.url}</h1>`);
});

if(process.argv.includes('reset-db')) {
  const resetDB = require('./modules/resetDB') 
  resetDB()
}

function startWebServer() {
  // Starting webserver on port 3000
  app.listen(PORT, () => console.log("Listening on port", PORT));
}
