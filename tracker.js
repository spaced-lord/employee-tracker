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
          update();
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
    .then(
      (answers = () => {
        connection.query("INSERT INTO department SET ?", {
          department_name: answers.departmentName,
        });
      })
    );
};
const addRole = () => {
  inquirer
    .prompt({
      name: "roleName",
      type: "input",
      message: "Please enter the name of the new role.",
    })
    .then(
      (answers = () => {
        connection.query("INSERT INTO role SET ?", {
          role_name: answers.roleName,
        });
      })
    );
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

const update = () => {
  inquirer
    .prompt({
      name: "updateWhat",
      type: "list",
      choices: ["Employees", "Departments", "Roles"],
      message: "Which section would you like to update?",
    })
    .then((answer) => {
      switch (answer.updateWhat) {
        case "Employees":
          connection.query("SELECT * FROM employee", function (err, data) {
            if (err) throw err;
            console.table(data);
          });
          updateEmployee();
          break;
        case "Departments":
          connection.query("SELECT * FROM department", function (err, data) {
            if (err) throw err;
            console.table(data);
          });
          updateDepartment();
          break;
        case "Roles":
          connection.query("SELECT * FROM role", function (err, data) {
            if (err) throw err;
            console.table(data);
          });
          updateRole();
          break;
      }
    });
};

const updateEmployee = () => {
  inquirer
    .prompt({
      name: "newUpdate",
      type: "list",
      message: "Which part of employee needs update?",
      choices: ["Department", "Role", "Delete"],
    })
    .then((answer) => {
      switch (answer.newUpdate) {
        case "Department":
          const query = connection.query(
            "UPDATE employee SET ? WHERE ?",
            [
              {
                manager_id: "",
              },
            ],
            (err, data) => {
              if (err) throw err;
              console.log(`${data.affectedRows} has been updated`);
            }
          );
          break;
        case "Role":
          const query = connection.query(
            "UPDATE employee SET ? WHERE ?",
            [{ role_id: "" }],
            (err, data) => {
              if (err) throw err;
              console.log(`${data.affectedRows} has been updated`);
            }
          );
          break;
        case "Delete":
          deleteEmployee();
          break;
      }
    });
};
