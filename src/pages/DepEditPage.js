import React from 'react'
import EditForm from '../components/DepForm'
import {addDepartment, editDepartment, getDepartmentByID} from '../httpUtils/departmentsRequest'

class EditPage extends React.Component {
    state = {
        department:{}
    }

    componentDidMount(){
        if (this.props.match.params.id) {
            //call to change the state if edit
            getDepartmentByID(this.props.match.params.id,
                dep => this.setState({ department: dep }),
                err => console.error(err)
            )
        }
    }

    //submit (add - edit) employee depending on the context
    submit = (department) => {
        if (this.props.match.params.id) {
            department = {
                ...department,
                _id: this.props.match.params.id
            }
            editDepartment(department, 
                res => {
                    if (res.status === 200){
                        //TODO: toast updated successfully
                        window.location = '/'
                    }
                },
                err => console.error(err)
            )
        }else {
            addDepartment(department,
                res => {
                    if (res.status === 200){
                        //TODO: toast added successfully
                        window.location = '/'
                    }
                },
                err => console.error(err)
            )
        }
    }

    render() {
        return (
            <EditForm 
            department={this.state.department}
            submit={this.submit}
            />
        )
    }
}

export default EditPage