const generateTeam = team => {
    
    const generateManager = manager => {
        return `
        <div class="card employee-card">
            <div class="card-header bg-danger text-white">
                <h3 class="card-title">${manager.name}</h3>
                <h4>Manager</h4>
            </div>
            <div class="card-body">
                <p class="id">ID: ${manager.id}</p>
                <p class="email">Email <a href="mailto:${manager.email}">${manager.email}</a></p>
                <p class="officeNumber">Office Number ${manager.officeNumber}</p>
            </div>
        </div>
            `;
    };

    const generateEngineer = function (engineer) {
        return `
        <div class="card employee-card">
            <div class="card-header bg-danger text-white">
                <h3 class="card-title">${engineer.name}</h3>
                <h4 class=" card-title">Engineer</h4>
            </div>
            <div class="card-body">
                <p class="id">${engineer.id}</p>
                <p class="email">Email: <a href="mailto:${engineer.email}">${engineer.email}</a> </p>
                <p class="github">Github: <a href="https://github.com/$engineer.github}">${engineer.github}</a></p>
            </div>
        </div>
        `;
    };

    
    const generateIntern = function (intern) {
        return `
        <div class="card employee-card">
            <div class="card-header bg-danger text-white">
                <h3 class="card-title">${intern.name}</h3>
                <h4 class=" card-title">Intern</h4>
            </div>
            <div class="card-body">
                <p class="id">${intern.id}</p>
                <p class="email">Email: <a href="mailto:${intern.email}">${intern.email}</a> </p>
                <p class="school">School: ${intern.school}</p>
            </div>
        </div>
            `;
    };

    generateHTML = (data) => {
        pageArray = [];

        for (let i = 0; i < data.length; i++) {
            const employee = data[i];
            const role = employee.getRole(); 
    
            if (role === 'Manager') {
                const managerCard = generateManager(employee);
    
                pageArray.push(managerCard);
            }

            if (role === 'Engineer') {
                const engineerCard = generateEngineer(employee);
    
                pageArray.push(engineerCard);
            }
     
            if (role === 'Intern') {
                const internCard = generateIntern(employee);
    
                pageArray.push(internCard);
            }
        }
     

        const employeeCards = pageArray.join('');

        const generateTeam = gernerateTeamPage(employeeCards);
        return generateTeam;
    };
    
    const gernerateTeamPage = function (employeeCards) {
        return `
        <!DOCTYPE html>
        <html lang="en-us">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous">
            <title>Team Profile Generator</title>
        </head>
        <body>
            <header class="bg-danger">
                <h1 class="text-white text-center">
                My Team
                </h1>
            </header>
            <main>
                <div class="container">
                    <div class="row justify-content-center">
                    ${employeeCards}
                    </div>
                </div>
            </main>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2" crossorigin="anonymous"></script>
        </body>
        </html>
            `;
    };    
};

module.exports = generateHTML;







