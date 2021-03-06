const express = require("express");
const inquirer = require("inquirer");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  PORT: 3306,
  user: "root",
  password: "Duquesne1029!",
  database: "employees_db",
});

connection.connect((err) => {
  if (err) throw err;
  startingChoices();
});

const startingChoices = () => {
  inquirer
    .prompt({
      type: "list",
      name: "action",
      message: "What action would you like to perform?",
      choices: ["Add", "View", "Update", "Quit"],
    })
    .then(function (answers) {
      switch (answers.action) {
        case "Add":
          add();
          break;
        case "View":
          view();
          break;
        case "Update":
          updateEmployee();
          break;
        case "Quit":
          quit();
          break;
        default:
          quit();
          break;
      }
    });
};

const quit = () => {
  console.log("Now Exiting");
  connection.end();
};

const add = () => {
  inquirer
    .prompt({
      type: "list",
      name: "addWhat",
      message: "Would you like to add, an Employee, Department or Role?",
      choices: ["Employee", "Department", "Role"],
    })
    .then(function (answers) {
      switch (answers.addWhat) {
        case "Employee":
          addEmployee();
          break;
        case "Department":
          addDepartment();
          break;
        case "Role":
          addRole();
          break;
        default:
          break;
      }
    });
};

const addEmployee = () => {
  inquirer
    .prompt([
      {
        name: "employeeFirst",
        type: "input",
        message: "Please enter the new employees first name.",
      },
      {
        name: "employeeLast",
        type: "input",
        message: "Please enter the new employees last name.",
      },
      {
        name: "employeeManager",
        type: "number",
        message: "Please enter the new employees manager id.",
      },
      {
        name: "employeeRole",
        type: "number",
        message: "Please enter the new employees role.",
      },
    ])
    .then((answers) => {
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answers.employeeFirst,
          last_name: answers.employeeLast,
          manager_id: answers.employeeManager,
          role_id: answers.employeeRole,
        },
        function (err, data) {
          if (err) throw err;
          connection.query("SELECT * FROM employee", function (err, data) {
            if (err) throw err;
            console.table(data);
            startingChoices();
          });
        }
      );
    });
};

const addDepartment = () => {
  inquirer
    .prompt({
      name: "departmentName",
      type: "input",
      message: "Please enter the name of the new department.",
    })
    .then((answer) => {
      connection.query(
        "INSERT INTO department SET ?",
        {
          name: answer.departmentName,
        },
        function (err, data) {
          if (err) throw err;
          connection.query("SELECT * FROM department", function (err, data) {
            if (err) throw err;
            console.table(data);
            startingChoices();
          });
        }
      );
    });
};
const addRole = () => {
  inquirer
    .prompt([
      {
        name: "roleName",
        type: "input",
        message: "Please enter the name of the new role.",
      },
      {
        name: "roleSalary",
        type: "input",
        message: "What is the salary for this role?",
      },
    ])
    .then((answer) => {
      connection.query(
        "INSERT INTO role SET ?",
        {
          title: answer.roleName,
          salary: answer.roleSalary,
        },
        function (err, data) {
          if (err) throw err;
          connection.query("SELECT * FROM role", function (err, data) {
            if (err) throw err;
            console.table(data);
            startingChoices();
          });
        }
      );
    });
};

const view = () => {
  inquirer
    .prompt({
      name: "viewWhat",
      type: "list",
      choices: ["Employees", "Department", "Roles"],
      message: "Which section would you like to view?",
    })
    .then((answer) => {
      switch (answer.viewWhat) {
        case "Employees":
          connection.query("SELECT * FROM employee", function (err, data) {
            if (err) throw err;
            console.table(data);
            startingChoices();
          });
          break;
        case "Department":
          connection.query("SELECT * FROM department", function (err, data) {
            if (err) throw err;
            console.table(data);
            startingChoices();
          });
          break;
        case "Roles":
          connection.query("SELECT * FROM role", function (err, data) {
            if (err) throw err;
            console.table(data);
            startingChoices();
          });
          break;
        default:
          break;
      }
    });
};

const updateEmployee = async () => {
  const empArray = await connection.query(
    "SELECT * FROM employee",
    (err, res) => {
      if (err) throw err;
    }
  );

  const { selectEmployee } = await inquirer.prompt([
    {
      type: "list",
      message: "Select an employee to update.",
      choices() {
        res.forEach(({ first_name, id }) => {
          empArray.push({ name: first_name, value: id });
        });
        return empArray;
      },
      name: "selectEmployee",
    },
  ]);

  const { newRole } = await inquier.prompt([
    {
      name: "newRole",
      type: "number",
      message: "What is their new role id number?",
    },
  ]);

  connection.query(
    "UPDATE employee SET ? WHERE ?",
    [{ role_id: selectEmployee }, { id: newRole }],
    (err) => {
      if (err) throw err;
    }
  );
};
