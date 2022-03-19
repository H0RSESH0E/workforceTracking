// Please see 'deptRoutes.js' for extensive comments detailing the function of
// this nearly identical code

const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const validate = require('../../utils/validate')


// SELECT * FROM employees ***

router.get('/employees', (req, res) => {
    const sql = `SELECT * FROM employees`;

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: error.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});


// INSERT INTO employees ***

router.post('/employees', ({ body }, res) => {
    const inputError =  validate(body, 'first_name', 'last_name', 'role_id', 'salary', 'dept_id', 'manager');

    if (inputError) {
        res.status(400).json({ error: inputError });
        return;
    }
    
    const sql = `INSERT INTO employees (first_name, last_name, role_id, salary, dept_id, manager) VALUES (?,?,?,?,?,?)`;
    const params = Object.values(body);

    db.query(sql, params, (err, result) => {

        if (err) {
          res.status(500).json({ error: err.message });
          return;
        } 

        res.json({
          message: 'success',
          data: body
        });
      });
})


// INSERT INTO employees ***

router.put('/employees/:id', (req, res) => {
    const inputError =  validate(req.body, 'role_id');

    if (inputError) {
        res.status(400).json({ error: inputError });
        return;
    }
    
    const sql = `UPDATE employees SET dept_id = ? WHERE id = ?`;
    const params = [req.body.role_id, req.params.id];

    db.query(sql, params, (err, result) => {

        if (err) {
          res.status(500).json({ error: err.message });
          return;
        } 

        res.json({
          message: 'success',
          sql_response: result
        });
      });
})


module.exports = router;
