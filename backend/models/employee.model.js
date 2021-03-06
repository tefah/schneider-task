const mongoose = require('mongoose');
const schema = mongoose.Schema;

const departmemtsController = require('../controllers/departmentController')
const employeeController = require('../controllers/employeeController')

const employeeFields = {
    sesaNumber:{type: Number,required: true, unique: true, trim: true},
    fullName: {type: String, trim: true, required: true},
    employeeNumber: {type: Number, required: true, unique: true, trim: true},
    phoneNumber: {type: String, required: true, unique: true, trim: true},
    email: {type: String, trim: true, required: true},
    departmentID: {type: String, trim: true, required: true},
    team: {type: String, trim: true, required: true},
    manager: {type: String, trim: true, required: true},
    oldDepartmentID: String
}

const employeeSchema = new schema(employeeFields, {timestamps: true})

//incrementing # of employees after adding new employee
employeeSchema.post('save', (emp) => {
    departmemtsController.updateDepEmp(emp.departmentID, true)
  });

//decrementing # of employees after removing employee
employeeSchema.post('findOneAndRemove', (emp) => {
    departmemtsController.updateDepEmp(emp.departmentID, false)
  })

module.exports = mongoose.model('employee', employeeSchema)