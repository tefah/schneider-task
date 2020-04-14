const mongoose = require('mongoose');
const employeeController = require('../controllers/employeeController')
const schema = mongoose.Schema;

const departmentFields = {
    name:{type: String,required: true, unique: true, trim: true},
    manager: {type: String, trim: true, required: true},
    numberOfEmployees: {type: Number, default:0}
}

const departmentSchema = new schema(departmentFields, {timestamps: true})

//deleting all employees of the department after removing it
departmentSchema.post('findOneAndRemove', (dep) => {
    employeeController.deleteEmpsWithDepID(dep._id)
  })

module.exports = mongoose.model('department', departmentSchema)