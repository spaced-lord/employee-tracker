const express = require('express');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "localhost",
    PORT: 3306,
    user: "root",
    password: "Duquense1029!",
    database: "employees"
});

