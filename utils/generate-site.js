const fs = require('fs');
//passes some content (fileCOntent) into the function as a parameter for processing 
const writeFile = fileContent => {
    //creates a new promise 
    //accepts either a resolve function or a reject function based on the response of the writeFile function 
    return new Promise((resolve, reject) => {
        fs.writeFile('./dist/index.html', fileContent, err => {
            if (err) {
                //if error, reject Promise and use catch method below 
                reject(err);
                //stop function from executing further
                return; 
            }
            //if file created, resolve promise and use then method below
            resolve({
                ok: true,
                message: 'File created!'
            });
        });

    });
};

const copyFile = () => {
    return new Promise((resolve, reject) => {
        fs.copyFile('./src/style.css', './dist/style.css', err => {
            if (err) {
                reject(err);
                return;
            }
            resolve ({
                ok: true, 
                message: 'File copied!'
            });
        });
    });
};
