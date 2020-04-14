
const departments= require('../models/department.model')
const utils = require('../utils')

// handler for POST localhost:5000/departments/add
exports.addDepartment = (req,res) => {
    const dep = new departments(req.body)
    //adding new department
    dep.save().then(data =>{
        res.send("added Sucessfully")
    })
    .catch(err => {
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        utils.errorLogging(ip, err)
        res.status(400).send(`ERROR: while adding department please try again`)
    })
}

// Handler for GET localhost:5000/departments
exports.getDepartments = (req, res) => {
    departments.find()
    .then(result => {
        res.json(result)
    })
    .catch(err => {
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        utils.errorLogging(ip, err)
        res.status(400).send(`ERROR: while getting departments please try again`)
    })
}

// Handler for GET localhost:5000/departments/:name
exports.getSingleDepartment = (req, res) => {
    const name = req.params.name
    departments.findOne({'name': name})
    .then(result => { res.json(result) })
    .catch(err => {
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        utils.errorLogging(ip, err)
        res.status(400).send(`ERROR: while getting department please try again`)
    })
}

// TODO: change this function to delete all the employees in the department
// Handler for DELETE localhost:5000/departments/?id=x,x,x,x
// ids => must be comma seperated values
exports.deleteDepartments = (req, res) => {
    const ids = req.query.id.split(',')
    ids.forEach(id => {
        departments.findByIdAndRemove(id)
        .then(() => res.json('department/s deleted.'))
        .catch(err => {
            const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            utils.errorLogging(ip, err)
            res.status(400).send(`ERROR: while deleteing departments please try again`)
        })
    }); 
}

// Handler for PUT localhost:5000/departments/update/:id
exports.updateDepartment = (req, res) => {
    const id = req.params.id
    departments.findOneAndUpdate({_id: id}, req.body)
    .then(() => {
        res.send("Updated Sucessfully")
    })
    .catch(err => {
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        utils.errorLogging(ip, err)
        res.status(400).send(`ERROR: while updating department please try again`)
    })
}

// increments/decrements the number of employees of a department by 1
exports.updateDepEmp = async(id, IS_INC) => {
    try{
        let dep = ''
        if(IS_INC){
            dep = await departments.findOneAndUpdate({_id: id},{ $inc: { numberOfEmployees: 1 } })
        }else{
            dep = await departments.findOneAndUpdate({_id: id},{ $inc: { numberOfEmployees: -1 } })
        }
    }catch(err) {
        console.log(err)
    }
}