
const employees= require('../models/employee.model')
const departmemtsController = require('./departmentController')
const utils = require('../utils')

// handler for POST localhost:5000/employees/add
exports.addEmployee = (req,res) => {
    const employee = {
        ...req.body,
        oldDepartmentID: req.body.departmentID
    }
    const emp = new employees(employee)
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


// update employee department due to employee update
updateEmployeeInternally = (employee) => {
    employees.findOneAndUpdate({_id:  employee._id}, employee)
    .then(()=> 'update success')
    .catch(err => {
        // const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        utils.errorLogging('Internal update to employee failed', err)
    })
}
// update employee department/oldDep ids 
updateDepIDS = (id) => {
    employees.findById(id)
        .then(employee => {
            if(employee.departmentID !== employee.oldDepartmentID){
            departmemtsController.updateDepEmp(employee.departmentID, true)
            departmemtsController.updateDepEmp(employee.oldDepartmentID, false)
            //TODO update employee making oldDepartment == department
            employee.oldDepartmentID = employee.departmentID
            updateEmployeeInternally(employee)
            }
        })
        .catch(err => {
            // const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            utils.errorLogging('Internal update to employee failed', err)
        })
}
// Handler for PUT localhost:5000/employees/update/:id
exports.updateEmployee = (req, res) => {
    const id = req.params.id
    employees.findOneAndUpdate({_id: id}, req.body)
    .then((data) => {
        updateDepIDS(id)
        res.send("Updated Sucessfully")
    })
    .catch(err => {
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        utils.errorLogging(ip, err)
        res.status(400).send(`ERROR: while updating employee please try again`)
    })
}
// update employee department due to employee update
exports.updateEmployeeInternally = (employee) => {
    employees.findOneAndUpdate({_id:  employee._id}, employee)
    .then(()=> 'update success')
    .catch(err => {
        // const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        utils.errorLogging('Internal update to employee failed', err)
    })
}


//delete employees with tha department id
exports.deleteEmpsWithDepID = (id) =>{
    employees.deleteMany({departmentID: id})
    .catch(err => utils.errorLogging('Internal server error', err))
}