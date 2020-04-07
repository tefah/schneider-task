import axios from 'axios'

const baseurl = 'http://localhost:5000/departments'


// POST localhost:5000/departments/add
export const addDepartment = (department, onSuccess, onError) => {
    axios.post(baseurl + '/add', department)
            .then(res => onSuccess(res))
            .catch(err => onError(err))
}



// DELETE localhost:5000/departments/?id=[]
export const deleteDepartment = (ids, onSuccess, onError) => {
    axios.delete(baseurl + `/?id=${ids}`)
            .then(res => onSuccess(res))
            .catch(err => onError(err))
}

// GET localhost:5000/departments
export const getDepartments = (onSuccess, onError) => {
    axios.get(baseurl)
            .then(res => {console.log(res);onSuccess(res.data)})
            .catch(err => onError(err))
}

// GET localhost:5000/departments/:id
export const getDepartmentByID = (id, onSuccess, onError) => {
    axios.get(baseurl + `/${id}`)
            .then(res => onSuccess(res.data))
            .catch(err => onError(err))
}
