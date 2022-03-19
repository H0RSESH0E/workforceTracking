const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const validate = require('../../utils/validate')


// SELECT * FROM departments ***

router.get('/department', (req, res) => {
    const sql = `SELECT * FROM department`;

    db.query(sql, (err, rows) => {

        // This if statement is a gaurd clause that directs the server to respond
        // with a 'Internal Server Error' code for the client and delivers the error
        // produced by the 'mysql2' module
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});


// INSERT INTO department ***

router.post('/department', ({ body }, res) => {
    const inputError =  validate(body, 'dept_name');

    // Tests the value of 'inputError' after validation
    // This is a gaurd clause that directs the server to respond
    // with a 'Bad Request' code for the client and delivers the error
    // produced by the 'validate' module
    if (inputError) {
        res.status(400).json({ error: inputError });
        return;
    }
    
    // 'sql' and 'params' hold the query input to keep the code legible
    const sql = `INSERT INTO department (dept_name) VALUES (?)`;
    const params = body.dept_name;

    // 'db' makes the connection to the mysql database through the 'mysql2' module 
    // in the connection.js file
    db.query(sql, params, (err, result) => {

        // This if statement is a gaurd clause that directs the server to respond
        // with a 'Bad Request' code for the client which also delivers the error
        // produced by the 'mysql2' module
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        } 

        // If there is no error produced by the query to the database,
        // simple response is given to the client including the body of the client's
        // initial request
        res.json({
          message: 'success',
          data: body
        });
      });
})

module.exports = router;
