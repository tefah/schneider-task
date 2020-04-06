import React from 'react'
import EditForm from './EditForm'
import {getEmployeeByID, addEmployee, editEmployee, getDepartments} from '../httpUtils/EmployeeRequests'
class EditPage extends React.Component {
    state = {
        employee:{},
        departments:['']
    }

    componentDidMount(){
         if (this.props.match.params.id) {
            //call to change the state if update
            getEmployeeByID(this.props.match.params.id,
                emp => this.setState({
                    employee: emp,
                    IS_UPDATE: true
                }),
                err => console.error(err)
            )
            getDepartments(
                deps => this.setState({departments: deps}),
                err => console.log(err)
            )
        }
    }

    //submit (add - edit) employee depending on the context
    submit = (employee) => {
        if (this.props.match.params.id) {
            employee = {
                ...employee,
                _id: this.props.match.params.id
            }
            editEmployee(employee, 
                res => {
                    if (res.status === 200){
                        //toast updated successfully
                        window.location = '/'
                    }
                },
                err => console.error(err)
            )
        }else {
            addEmployee(employee,
                res => {
                    if (res.status === 200){
                        //toast added successfully
                        window.location = '/'
                    }
                },
                err => console.error(err)
            )
        }
    }

    render() {
        console.log('rerendered')
        return (
            <EditForm 
            employee={this.state.employee}
            submit={this.submit}
            deps={this.state.departments}/>
        )
    }
}

export default EditPage