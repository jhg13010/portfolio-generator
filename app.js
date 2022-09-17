//call inquire module from npm download (3rd party)
const inquirer = require('inquirer');

console.log(inquirer);

inquirer 
    //call prompt method from inquirer
    .prompt([
        //receive an array of objects in the argument => called the 'question object'
        {
            //'input' will receive a text reply
            type: 'input',
            name: 'name',
          message: 'What is your name?'
        }
    ])
    //answer is returned as a 'Promise'
    .then(answers => console.log(answers));


//calls file system module from node.js
//const fs = require('fs');

//calls function from page-template module
//const generatePage = require('./src/page-template');

//const pageHTML = generatePage(name, github);

//fs.writeFile('index.html', pageHTML, err => {
//  if (err) throw err;

//console.log('Portfolio complete! Checkout index.html to see the output!');
//});