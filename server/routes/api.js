const express = require('express');
const router = express.Router();
const Employee = require('../models/employee')

//get list of employees from db
router.get('/employees', function(req, res, next) {
    Employee.find({}).then(function(employees){
        res.send(employees);
    })
});

//add a new employee to db
router.post('/employees', function(req, res,next) {
    Employee.create(req.body).then(function(employee){
        res.send(employee)
}).catch(next);
});



module.exports = router;