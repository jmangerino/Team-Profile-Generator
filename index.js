const inquirer = require('inquirer');
const fs = require('fs');

const generateHTML = require('./src/template');

const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');


const teamArray = [];

const addManager = () => {
    return inquirer.prompt ([
        {
            type: 'input',
            name: 'name',
            message: "What is the manager's name?"
        },
        {
            type: 'input',
            name: 'id',
            message: "What is manager's id?"
        },
        {
            type: 'input',
            name: 'email',
            message: "What is the manager's email?"
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: "What is the mangager's office number?"
        },
    ])
    .then(managerInput => {
        const { name, id, email, officeNumber } = managerInput;
        const manager = new Manager (name, id, email, officeNumber);
        teamArray.push(manager);
        console.log(manager)
    })
};

const addEmployee = () => {
    console.log('Adding employee');
    
    return inquirer.prompt ([
        {
            type: 'list',
            name: 'role',
            message: 'What employee would you like to add next?',
            choices: ['Engineer', 'Intern']
        },
        {
            type: 'input',
            name: 'name',
            message: "What is your employee's name"
        },
        {
            type: 'input',
            name: 'id',
            message: "What is the employee's id?"
        },
        {
            type: 'input',
            name: 'email',
            message: "What is your employee's email?"
        },
        {
            type: 'input',
            name: 'github',
            message: "What is your Employee's github username?",
            when: (input) => input.role === 'Engineer'
        },
        {
            type: 'input',
            name: 'school',
            message: "What is your intern's school?",
            when: (input) => input.role === 'Intern'
        },
        {
            type: 'confirm',
            name: 'confirmAddEmployee',
            message: "Would you like to add any more employee's?",
            default: false
        },
    ])
    .then(employeeData => {
        let { name, id, email, role, github, school, confirmAddEmployee } = employeeData;
       

        if (role === 'Engineer') {
        
            const engineer = new Engineer (name, id, email, github);
            console.log(engineer);
            teamArray.push(engineer)
        } else if (role === 'Intern') {
            
        
            const intern = new Intern (name, id, email, school);
            console.log(intern);
            teamArray.push(intern)
        }

        
        
        if (confirmAddEmployee) {
            return addEmployee(teamArray);
        } else {
            return teamArray
        }
        
    })
};

const writeFile = data => {
    fs.writeFile('./dist/index.html', data, err => {
        if (err) {
            console.log(err);
            return;
        } else {
            console.log('Your team profile has beed generated in the index.html file.');
        }
    })
};

addManager()
.then(addEmployee)
.then(teamArray => {
    return generateHTML(teamArray);
})
.then(pageHTML => {
    return writeFile(pageHTML);
})
.catch(err => {
    console.log(err);
});