const router = require('express').Router()
const employeesController = require('../controllers/employeeController')

// GET localhost:5000/employees
router.route('/').get(employeesController.getEmployees)

// GET localhost:5000/employees/:id
router.route('/:id').get(employeesController.getSingleEmployee)

// DELETE localhost:5000/employees/?id=[]
router.route('/').delete(employeesController.deleteEmployees)

// POST localhost:5000/employees/add
router.route('/add').post(employeesController.addEmployee)

// PUT localhost:5000/employees/update/:id
router.route('/update/:id').put(employeesController.updateEmployee)


module.exports = router