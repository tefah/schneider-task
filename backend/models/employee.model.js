const mongoose = require('mongoose');
const schema = mongoose.Schema;

const employeeFields = {
    sesaNumber:{type: Number, 
        required: "kindly fill in your  SESA number ",
        unique: true,
        trim: true},
    fullName: {type: String, trim: true, required: "kindly fill in your Name"},
    employeeNumber: {type: Number, 
        required: "kindly fill in your  Employee number ",
        unique: true,
        trim: true},
    phoneNumber: {type: Number, 
        required: "kindly fill in your  Phone number ",
        unique: true,
        trim: true},
    email: {type: String, trim: true, required: "kindly fill in your Email"},
    department: {type: String, trim: true, required: "kindly fill in your Department "},
    team: {type: String, trim: true, required: "kindly fill in your Team"},
    manager: {type: String, trim: true, required: "kindly fill in your Manager"}

}

const employeeSchema = new schema(employeeFields, {timestamps: true})
module.exports = mongoose.model('employee', employeeSchema)