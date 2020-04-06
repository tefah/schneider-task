
const employees= require('../models/employee.model')
const utils = require('../utils')

// handler for POST localhost:5000/employees/add
exports.addEmployee = (req,res) => {
    const emp = new employees(req.body)
    //adding new employee
    emp.save().then(data =>{
        res.send("added Sucessfully")
    })
    .catch(err => {
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        utils.errorLogging(ip, err)
        res.status(400).send(`ERROR: while adding employee please try again`)
    })
}

// Handler for GET localhost:5000/employees
exports.getEmployees = (req, res) => {
    employees.find()
    .then(result => {
        res.json(result)
    })
    .catch(err => {
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        utils.errorLogging(ip, err)
        res.status(400).send(`ERROR: while getting employees please try again`)
    })
}

// Handler for GET localhost:5000/employees/:id
exports.getSingleEmployee = (req, res) => {
    const id = req.params.id
    employees.findById(id)
    .then(result => { res.json(result) })
    .catch(err => {
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        utils.errorLogging(ip, err)
        res.status(400).send(`ERROR: while getting employee please try again`)
    })
}

// Handler for DELETE localhost:5000/employees/?id=x,x,x,x
// ids => must be comma seperated values
exports.deleteEmployees = (req, res) => {
    const ids = req.query.id.split(',')
    ids.forEach(id => {
        employees.findByIdAndRemove(id)
        .then(() => res.json('employee/s deleted.'))
        .catch(err => {
            const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            utils.errorLogging(ip, err)
            res.status(400).send(`ERROR: while deleteing employees please try again`)
        })
    });    
}

// Handler for PUT localhost:5000/employees/update/:id
exports.updateEmployee = (req, res) => {
    const id = req.params.id
    employees.findOneAndUpdate({_id: id}, req.body)
    .then(() => {
        res.send("Updated Sucessfully")
    })
    .catch(err => {
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        utils.errorLogging(ip, err)
        res.status(400).send(`ERROR: while updating employee please try again`)
    })
}