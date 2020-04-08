import React from 'react'
import Table from 'react-bootstrap/Table'
import TableBody from './TableBody'
import { Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {getEmployees, deleteEmployee} from '../httpUtils/EmployeeRequests'
import {getDepartments} from '../httpUtils/departmentsRequest'

class HomePage extends React.Component {
    state = {
        employees: [],
        selected: [],
        departments:[]
    }

    componentDidMount = () => {
        //getting employees data and setting the state with the new data
        getDepartments(
            deps => this.setState({departments: deps}),
            err => console.log(err)
        )
        getEmployees(
            res => { this.setState({employees: res.data  })},
            err => console.log(err))

    }

    //remove employees from UI and empty selected
    onSuccessRemovingEmployees = (res, ids) => {
        if(res.status === 200){
            this.setState((state, props) => {
                return{
                    employees: state.employees.filter(employee => !ids.includes(employee._id)),
                    selected: []
                }
            })
        }
    }
    //delete selected employees by making string of ids 'id1,id2,id3,...'
    deleteSelected = () => {
        if (window.confirm('Are you sure you wish to delete the selected employees?')){
            const ids = this.state.selected.map(emp => emp._id)
            const idStr = ids.toString()
            deleteEmployee(idStr, 
                res => this.onSuccessRemovingEmployees(res, ids),
                err => console.log(err))
        }
    }

    //delete employee through employee delete button
    deleteEmp = (id)=>{
        if (window.confirm('Are you sure you wish to delete the selected employees?')){
            deleteEmployee(id, 
                res => this.onSuccessRemovingEmployees(res, [id]),
                err => console.log(err))
        }
    }

    //select / DEselect an entry by id
    selectEmployee = (IS_CHECKED, emp) => {     
        if (IS_CHECKED){
            const newSelected = [...(this.state.selected)]
            newSelected.push(emp)
            this.setState({
                selected: newSelected
            })
        }else{
            const newSelected = this.state.selected.filter(employee => employee !== emp)
            this.setState({
                selected: newSelected
            })
        }
    }

    //selectall / DEselect all depending on the IS_CHECKED boolean
    selectall = (IS_CHECKED) => {
        if(IS_CHECKED){
            this.setState({selected: this.state.employees.filter(emp => emp._id)})
        }else {
            this.setState({selected: []})
        }
    }

    render() {
        return (
            <div className='container'>

                <h2>Employees list</h2>

                <Link to='/edit'>
                    <Button variant="outline-primary" >ADD</Button>
                </Link> {'     '}
                <Button onClick={() => window.location = '/edit/' + this.state.selected[0]._id}  
                disabled={this.state.selected.length !== 1 }
                variant="outline-secondary" >
                    EDIT
                </Button>{'         '}
                <Button onClick={this.deleteSelected}  
                disabled={this.state.selected.length  < 1 }
                variant="outline-secondary" >
                    Delete
                </Button>
                
                <div className="container">
                   

                </div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>
                            <input type="checkbox" 
                            onChange={(e) => this.selectall(e.target.checked)} 
                            checked={this.state.employees.length === this.state.selected.length}
                            /> 
                        </th>
                        <th>SESA number</th>
                        <th>Full name</th>
                        <th>Employee Number</th>
                        <th>phone Number</th>
                        <th>Email</th>
                        <th>Department</th>
                        <th>Team</th>
                        <th>Manager</th>
                        <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.employees.map(employee => {
                            return (<TableBody 
                                employee={employee} 
                                deleteEmp={this.deleteEmp}
                                select={this.selectEmployee}
                                key={employee._id}
                                selected={this.state.selected.includes(employee)}
                                departments={this.state.departments} />)
                        })}
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default HomePage;