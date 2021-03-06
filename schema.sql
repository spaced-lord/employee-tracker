DROP DATABASE IF EXISTS employees_db;

CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department
(
        id INT NOT NULL
        AUTO_INCREMENT,
name VARCHAR
        (30) NOT NULL,
PRIMARY KEY
        (id) 
);

        CREATE TABLE role
        (
                id INT NOT NULL
                AUTO_INCREMENT,
title VARCHAR
                (30) NOT NULL,
salary DECIMAL
                (10, 2) NOT NULL,
department_id INT,
INDEX dep_ind
                (department_id),
CONSTRAINT fk_department FOREIGN KEY
                (department_id) REFERENCES department
                (id) ON
                DELETE CASCADE,
PRIMARY KEY(id)
                );

                CREATE TABLE employee
                (
                        id INT NOT NULL
                        AUTO_INCREMENT,
first_name VARCHAR
                        (30) NOT NULL,
last_name VARCHAR
                        (30) NOT NULL,
role_id INT,
INDEX role_ind
                        (role_id),
CONSTRAINT fk_role FOREIGN KEY
                        (role_id) REFERENCES role
                        (id) ON
                        DELETE CASCADE,
manager_id INT,
INDEX man_ind
                        (manager_id),
CONSTRAINT fk_manager FOREIGN KEY
                        (manager_id) REFERENCES employee
                        (id) ON
                        DELETE
                        SET NULL
                        ,
PRIMARY KEY
                        (id)
);