import React from 'react'
import EditForm from './EditForm'
import {getEmployeeByID, addEmployee} from '../httpUtils/EmployeeRequests'
class EditPage extends React.Component {
    state = {
        employee:{},
        sesaNumber: '',
        fullName: '',
        employeeNumber: '',
        phoneNumber: '',
        email: '',
        department: '',
        team: '',
        manager: ''
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

    submit(employee){
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

    render() {
        return (
            <EditForm 
            employee={this.state.employee}
            submit={this.submit} />
        )
    }
}

export default EditPage