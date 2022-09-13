//calls file system module from node.js
const fs = require('fs');

//calls function from page-template module
const generatePage = require('./src/page-template');

// process is a global object that contains everything in the file 
//argv is a property array of process that contains command line prompts 

//take the array process.argv and eliminate elements 0 (node) and 1 (app.js) 
const profileDataArgs = process.argv.slice(2);

//const name = profileDataArgs[0];
//const github = profileDataArgs[1];

//replaces the need to define both name and github via using assignment deconstructing
const [name, github] = profileDataArgs;

fs.writeFile('index.html', generatePage(name, github), err => {
    if (err) throw err;

    console.log('Portfolio complete! Checkout index.html to see the output!');
});











