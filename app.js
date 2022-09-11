
const fs = require('fs');

// process is a global object that contains everything in the file 
//argv is a property array of process that contains command line prompts 

//take the array process.argv and eliminate elements 0 (node) and 1 (app.js) 
const profileDataArgs = process.argv.slice(2, process.argvlength);

//const name = profileDataArgs[0];
//const github = profileDataArgs[1];

//replaces the need to define both name and github via using assignment deconstructing
const [name, github] = profileDataArgs;

const generatePage = (userName, githubName) => {
    return `
    <!DOCTYPE html>
    <html lang = "en">
    <head> 
        <meta charset = "UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Portfolio Demo</title>
    </head>

    <body>
        <h1>${name}</h1?
        <h2><a href="https://github.com/${github}">Github</h2>
    </body>

    </html?>
    `;
};

FileSystem.writefile('index.html', generatePage(name, github), err => {
    if (err) throw err;

    console.log('Portfolio complete! Checkout index.html to see the output!');
});










