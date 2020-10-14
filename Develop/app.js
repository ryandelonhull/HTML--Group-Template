const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");


const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let employees = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
async function managerQuestions(){
    inquirer.prompt([{
        type: "input",
        name: "name",
        message: "What is the team manager's name?",     
    },
    {
        type: "number",
        name: "id",
        message: "What is the team manager's ID?",
    },
    {
        type: "input",
        name: "email",
        message: "What is the team manager's email address?",
    },
    {
        type: "input",
        name: "officeNumber",
        message: "What is the team manager's office number?"
    }])

    .then(answers => {
        let manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
        
        nextPosition()

        console.log(manager);
        employees.push(manager);
        
        
        
        
        
        
        
    })

}

async function nextPosition(){
    inquirer.prompt([{   
        type: "list",
        name: "role",
        message: "What is the next position?",
        choices: ["engineer", "intern", "no more employees"]
    }])

    .then(function({role}){
        if (role === "engineer") {
            engineerQuestions();
        }else if (role === "intern") {
            internQuestions();
        }else if (role === "no more employees"){
            console.log("Check the rendered folder!");
            renderedhtml();
        }

    });
};


async function engineerQuestions(){
    inquirer.prompt([{
    type: "input",
    name: "name",
    message: "What is the engineer's name?",     
},
{
    type: "number",
    name: "id",
    message: "What is the engineer's ID?",
},
{
    type: "input",
    name: "email",
    message: "What is the engineer's email address?",
},
{
    type: "input",
    name: "github",
    message: "What is the engineer's GitHub username?",
}])
.then(answers => {
    let engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
    nextPosition();
    console.log(engineer);
    employees.push(engineer);    
})
}

async function internQuestions(){
    inquirer.prompt([{
        type: "input",
        name: "name",
        message: "What is the Intern's name?",     
    },
    {
        type: "number",
        name: "id",
        message: "What is the Intern's ID?",
    },
    {
        type: "input",
        name: "email",
        message: "What is the Intern's email address?",
    },
    {
        type: "input",
        name: "school",
        message: "What school did the intern go to?",
    }])  
    .then(answers => {
        let intern = new Intern(answers.name, answers.id, answers.email, answers.school);
        console.log(intern);
        employees.push(intern);
        nextPosition();         
    })      
}

async function renderedhtml(){
    let html = render(employees);
        // let html = render([manager, new Engineer("Greg", 234, "email@email.com", "guywithgithub"), new Intern("Joe", 222, "email2@email", "UC") ]);
        fs.writeFile("./rendered/index.html", html, function(err) {
            if (err) {
              throw err;
            }
          });
}



managerQuestions();


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
