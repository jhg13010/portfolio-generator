// process is a global object that contains everything in the file 
//argv is a property array of process that contains command line prompts 

//take the array process.argv and eliminate elements 0 (node) and 1 (app.js) 
const profileDataArgs = process.argv.slice(2, process.argvlength);

const printProfileData = profileDataArr => {
    profileDataArr.forEach(profileItem => console.log(profileItem))
}
 
printProfileData(profileDataArgs);





