const mongoose = require('mongoose');
const schema = mongoose.Schema;

const departmentFields = {
    name:{type: String,required: true, unique: true, trim: true},
    manager: {type: String, trim: true, required: true},
    numberOfEmployees: {type: Number, default:0}
}

const departmentSchema = new schema(departmentFields, {timestamps: true})
module.exports = mongoose.model('department', departmentSchema)