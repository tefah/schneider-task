import axios from 'axios'

const baseurl = 'http://localhost:5000/employees'
// POST localhost:5000/employees/add
export const addEmployee = (employee, onSuccess, onError) => {
    axios.post(baseurl + '/add', employee)
            .then(res => onSuccess(res))
            .catch(err => onError(err))
}

// PUT localhost:5000/employees/update/:id
export const editEmployee = (employee, onSuccess, onError) => {
    axios.put(baseurl + '/update/' + employee._id, employee)
            .then(res => onSuccess(res))
            .catch(err => onError(err))
}

// DELETE localhost:5000/employees/?id=[]
export const deleteEmployee = (ids, onSuccess, onError) => {
    axios.delete(baseurl + `/?id=${ids}`)
            .then(res => onSuccess(res))
            .catch(err => onError(err))
}

// GET localhost:5000/employees
export const getEmployees = (onSuccess, onError) => {
    axios.get(baseurl)
            .then(res => onSuccess(res))
            .catch(err => onError(err))
}

// GET localhost:5000/employees/:id
export const getEmployeeByID = (id, onSuccess, onError) => {
    axios.get(baseurl + `/${id}`)
            .then(res => onSuccess(res.data))
            .catch(err => onError(err))
}
