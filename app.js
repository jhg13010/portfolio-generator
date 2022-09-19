const {writeFile, copyFile} = require('./utils/generate-site.js')
//calls function from page-template module
const generatePage = require('./src/page-template');
//call inquire module from npm download (3rd party)
const inquirer = require('inquirer');
 //function to call prompt method from inquirer
const promptUser = () => {
    return inquirer.prompt ([
        //receive an array of objects in the argument => called the 'question object'
        {
            //theese are all methods that can be researched via npm documents on the inquirer package  
            type: 'input',
            name: 'name',
          message: 'What is your name?',
          //validate method receives the nameInput as an argument 
          validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log('Please enter your name!');
                return false;
            }
          }
        },
        {
            type: 'input',
            name:'github',
            message: 'Enter your GitHub Username',
            validate: githubInput => {
                if (githubInput) {
                    return true;
                } else {
                    console.log('Please enter your GitHub Username');
                    return false;
                }
            }
        }, 
        {
            type:'confirm',
            name:'confirmAbout',
            message: 'Would you like to enter some information about yourself via an "About" section?',
            default: true
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself',
            //'when' method passes an object of the already answered questions through itself to make a decision
            when: ({confirmAbout}) => {
                //if confirmAbout is true (yes) then the question will display
                if (confirmAbout) {
                    return true;
                } else {
                    return false;
                }
            }
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
            message: 'What is the name of your project',
            validate: projectName => {
                if (projectName) {
                    return true;
                } else {
                    console.log('Please enter your project name');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description of the project (Required)',
            validate: projectDescription => {
                if (projectDescription) {
                    return true;
                } else {
                    console.log('Please enter your project description');
                    return false;
                }
            }
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
            message: 'Enter the GitHub link to your project (Required)',
            validate: projectLink => {
                if (projectLink) {
                    return true;
                } else {
                    console.log("Please enter your project's GitHub link");
                    return false;
                }
            }
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
        //if confirmAddProject is YES
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
        return generatePage(portfolioData);
    })
    .then(pageHTML => {
        return writeFile(pageHTML);
    })
    .then(writeFileRespone => {
        console.log(writeFileRespone);
        return copyFile();
    })
    .then(copyFileRespone => {
        console.log(copyFileRespone);
    })
    .catch(err => {
        console.log(err);
    })