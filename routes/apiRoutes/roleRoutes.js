// Please see 'deptRoutes.js' for extensive comments detailing the function of
// this nearly identical code

const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const validate = require('../../utils/validate')


//SELECT * FROM roles ***

router.get('/roles', (req, res) => {
    const sql = `SELECT * FROM roles`;

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


// INSERT INTO roles ***

router.post('/roles', ({ body }, res) => {
    const inputError =  validate(body, 'role_title', 'dept_id', 'base_salary');

    if (inputError) {
        res.status(400).json({ error: inputError });
        return;
    }
    
    const sql = `INSERT INTO roles (role_title, dept_id, base_salary) VALUES (?,?,?)`;
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


module.exports = router;
