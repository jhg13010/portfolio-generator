//create about section on demand 
//the 'about' data from templateData will be passed into the function via the aboutText parameter 
const generateAbout = aboutText => {
    //if an 'about' data doesn't exists, it will put nothing in the main HTML section
    if (!aboutText) {
        return '';
    }

    return `
        <section class="my-3" id="about">
            <h2 class="text-dark bg-primary p-2 display-innline-block">About Me</h2>
            <p>${aboutText}</p>
        </section>
    `;
};

//create the projects section on demand when called in the module.exports function
//the 'projects' data from templateData will be passed into the function via the projectsArr parameter  
const generateProjects = projectsArr => {
//use the filter method to find projects where the feature object is true 
//then use the map method which functions like a forEach loop to extract project attributes 

    return `
        <section class="my-3" id="portfolio">
            <h2 class="text-dark bg-primary p-2 display-inline-block">Work</h2>
            <div class="flex-row justify-space-between">
                ${projectsArr.filter(({ feature }) => feature).map(({ name, description, languages, link}) => {
                    return `
                        <div class="col-12 mb-2 bg-dark text-light p-3 flex-column">
                            <h3 class="portfolio-item-title text-light">${name}</h3>
                            <h5 class="portfolio-languages">
                                Built With: 
                                ${languages.join(', ')}
                            </h5>
                            <p>${description}</p>
                            <a href="${link}" class="btn mt-auto"><i class="fab fa-github mr-2"></i>View Project on GitHub</a>
                        </div>
                    `;
                })
                .join('')}

                ${projectsArr.filter(({ feature}) => !feature).map(({ name, description, languages, link}) => {
                    return `
                        <div class="col-12 col-md-6 mb-2 bg-dark text-light p-3 flex-column">
                            <h3 class="portfolio-item-title text-light">${name}</h3>
                            <h5 class="portfolio-languages">
                                Built With: 
                                ${languages.join(', ')}
                            </h5>
                            <p>${description}</p>
                            <a href="${link}" class="btn mt-auto"><i class="fab fa-github mr-2"></i>View Project on Github</a>
                        </div>
                    `;
                })
                .join('')}
            </div>
        </section>
    `;
};

module.exports = templateData => {
    //destructure projects, about, and the rest of the data from templateData based on key names 
    //the '...' notation is the rest operator which indicates the rest of the data leftover after projects and about 
    const {projects, about, ...header} = templateData;
    return `
    <!DOCTYPE html>
    <html lang = "en">
    <head> 
        <meta charset = "UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href="https://cdnjs.cloudfare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css"> 
        <link href="https://fonts.googleapis.com/css?family=Public+Sans:300i,300,500&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="style.css"> 
        <title>Portfolio Demo</title>
    </head>

    <body>
        <header> 
            <div class="container flex-row justify-space-between align-center py-3"> 
                <h1 class="page-title text-secondary bg-dark py-2 px-3">${header.name}</h1>
                <nav class="flex-row">
                    <a class="ml-2 my-1 px-2 py-1 bg-secondary text-dark" href=https://github.com/${header.github}>GitHub</a> 
                </nav>
            </div>
        </header>
        <main class="container my-5"
            ${generateAbout(about)}
            ${generateProjects(projects)}
        </main>
        <footer class="container text-center py-3">
            <h3 class="text-dark">&copy; ${new Date().getFullYear()} by ${header.name}</h3> 
        </footer>
    </body>
    </html?>
    `;
};