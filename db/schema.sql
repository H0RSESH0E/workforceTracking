DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS department;


CREATE TABLE department (
id INTEGER AUTO_INCREMENT PRIMARY KEY,
dept_name VARCHAR(40) NOT NULL
);

CREATE TABLE roles (
id INTEGER AUTO_INCREMENT PRIMARY KEY,
role_title VARCHAR(30) NOT NULL,
dept_id INTEGER,
base_salary DECIMAL(10, 2),
CONSTRAINT fk_dept FOREIGN KEY (dept_id) REFERENCES department(id) ON DELETE SET NULL
);

CREATE TABLE employees (
id INTEGER AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INTEGER,
salary DECIMAL(10, 2),
dept_id INTEGER,
manager VARCHAR(30),
created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
CONSTRAINT fk_roles FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE SET NULL,
CONSTRAINT fk_emp_dept FOREIGN KEY (dept_id) REFERENCES department(id) ON DELETE SET NULL
);