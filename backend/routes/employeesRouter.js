const router = require('express').Router()
let employeeModel = require('../models/employee.model')

// GET localhost:5000/employees
router.route('/').get((req, res) => {
    res.send("HERE is your employees bitch")
})


module.exports = router