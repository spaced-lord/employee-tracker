USE employees_db;

INSERT INTO department
    (name)
VALUES
    ("Garden");
INSERT INTO department
    (name)
VALUES
    ("Cure");
INSERT INTO department
    (name)
VALUES
    ("Trim");

INSERT INTO role
    (title, salary, department_id)
VALUES
    ("Gardener", 45000, 1);
INSERT INTO role
    (title, salary, department_id)
VALUES
    ("Tech", 30000, 2);
INSERT INTO role
    (title, salary, department_id)
VALUES
    ("Trimmer", 25000, 3);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Jon", "Bayko", 1, null);
INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Joey", "Pousson", 1, 1);
INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Shazzon", "Turner", 1, 1);
INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Zack", "Noe", 2, 1);
INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Rich", "Eyre", 2, 4);
INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Shannon", "Scholten", 2, 4);
INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Matthew", "Mitchell", 2, 4);

