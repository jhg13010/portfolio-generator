//call inquire module from npm download (3rd party)
const inquirer = require('inquirer');

 //function to call prompt method from inquirer
const promptUser = () => {
    return inquirer.prompt ([
        //receive an array of objects in the argument => called the 'question object'
        {
            //'input' will receive a text reply
            type: 'input',
            name: 'name',
          message: 'What is your name?'
        },
        {
            type: 'input',
            name:'github',
            message: 'Enter your GitHub Username'
        }, 
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself'
        }
    ]);
};

//portfolioData prameter/argument will store multiple project information 
    //better than local variables because local var's are limited in scope 
    //better than global variables because they can be changed by other parts of the application
const promptProject = portfolioData => {
    console.log(`
    ===================
    
    Add a New Project 
    
    ===================
    `);
    //initialize the projects array in the portfolioData object IF no projects already exist
    if (!portfolioData.projects) {
        portfolioData.projects = [];
    }
    return inquirer.prompt ([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of your project'
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description of the project (Required)'
        },
        {
            //type checkbox gives users options
            type: 'checkbox',
            name: 'languages',
            message: 'What did you build this project with? (Check all the apply)',
            choices: ['JaveScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
        },
        {
            tpye: 'input',
            name: 'link',
            message: 'Enter the GitHub link to your project (Required)'
        },
        {
            //confirm is a Boolean response 
            type: 'confirm',
            name: 'feature',
            message: 'Would you like to feature this project?',
            default: false
        },
        {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'Would you like to enter another project?',
            default: false
        }
    ])
    .then(projectData => {
        //use array method '.push' to place projectData into projects array 
        portfolioData.projects.push(projectData);
        //iff confirmAddProject is YES
        if (projectData.confirmAddProject) {
            //call the promptProject function 
            return promptProject(portfolioData);
        } else {
            //otherwise return the object to retrieve answers 
            return portfolioData;
        }
    });
};

//promptUser function is called, then returns the answer as a 'Promise'
promptUser()
    //.then method helps control sequence of the application
    .then(promptProject)
    .then(portfolioData => {
        console.log(portfolioData);
    });

//calls file system module from node.js
//const fs = require('fs');

//calls function from page-template module
//const generatePage = require('./src/page-template');

//const pageHTML = generatePage(name, github);

//fs.writeFile('index.html', pageHTML, err => {
//  if (err) throw err;

//console.log('Portfolio complete! Checkout index.html to see the output!');
//});