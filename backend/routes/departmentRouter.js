const router = require('express').Router()
const departmentsController = require('../controllers/departmentController')

// GET localhost:5000/departments
router.route('/').get(departmentsController.getDepartments)

// GET localhost:5000/departments/:name
router.route('/:name').get(departmentsController.getSingleDepartment)

// DELETE localhost:5000/departments/?id=[]
router.route('/').delete(departmentsController.deleteDepartments)

// POST localhost:5000/departments/add
router.route('/add').post(departmentsController.addDepartment)

// PUT localhost:5000/departments/update/:id
router.route('/update/:id').put(departmentsController.updateDepartment)


module.exports = router