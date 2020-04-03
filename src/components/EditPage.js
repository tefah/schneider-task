import React from 'react'
import EditForm from './EditForm'
import {getEmployeeByID, addEmployee, editEmployee} from '../httpUtils/EmployeeRequests'
class EditPage extends React.Component {
    state = {
        employee:{},
    }

    componentDidMount(){
         if (this.props.match.params.id) {
            //call to change the state if update
            getEmployeeByID(this.props.match.params.id,
                emp => this.setState({employee: emp}),
                err => console.error(err)
            )

        }
    }

    //submit (add - edit) employee depending on the context
    submit = (employee) => {
        console.log(employee)
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
            submit={this.submit} />
        )
    }
}

export default EditPage