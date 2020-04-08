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
    oldDepartment: String
}

const employeeSchema = new schema(employeeFields, {timestamps: true})

//incrementing # of employees after adding new employee
employeeSchema.post('save', (emp) => {
    departmemtsController.updateDepEmp(emp.departmentID, true)
    console.log('save mw', this)
  });

//decrementing # of employees after removing employee
employeeSchema.post('findOneAndRemove', (emp) => {
    departmemtsController.updateDepEmp(emp.departmentID, false)
  })
  
  employeeSchema.post('findOneAndUpdate', (emp) => {
    if(emp.departmentID !== emp.oldDepartmentID){
      departmemtsController.updateDepEmp(emp.departmentID, true)
      departmemtsController.updateDepEmp(emp.oldDepartmentID, false)
      //TODO update employee making oldDepartment == department
      console.log(emp)
      emp.oldDepartmentID = emp.departmentID
      console.log(emp)
      employeeController.updateEmployeeInternally(emp)
      console.log('after update', this)
    }
 
  })

module.exports = mongoose.model('employee', employeeSchema)