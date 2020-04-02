import React from 'react'
import Table from 'react-bootstrap/Table'
import TableBody from './TableBody'
import { Button, Container, Row ,  Col} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {getEmployees} from '../httpUtils/EmployeeRequests'
import {deleteEmployee} from '../httpUtils/EmployeeRequests'

class HomePage extends React.Component {
    state = {
        employees: [],
        selected: [],
    }

    // go to /edit/:id
    editEmployee = () => {
        //go to /edit with the employee to edit
        window.location = '/edit/' + this.state.selected[0]._id
    }

    deleteEmployee = (id) => {
        //call for delete employee here
        deleteEmployee(id)
    }
    componentDidMount = () => {
        //getting employees data and setting the state with the new data
        getEmployees(res => {
            this.setState({employees: res.data  })
        },
        err => console.log(err))
    }

    //select / DEselect an entry by id
    selectEmployee = (IS_CHECKED, emp) => {     
        if (IS_CHECKED){
            const newSelected = [...(this.state.selected)]
            newSelected.push(emp)
            this.setState({
                selected: newSelected
            })
            console.log(this.state.selected)
        }else{
            const newSelected = this.state.selected.filter(employee => employee != emp)
            this.setState({
                selected: newSelected
            })
            console.log(this.state.selected)
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

                <Link to='/edit'>
                    <Button variant="outline-primary" >ADD</Button>
                </Link> {'     '}
                <Button onClick={this.editEmployee}  
                disabled={this.state.selected.length !== 1 }
                    variant="outline-secondary" >
                    EDIT
                </Button>
                {/* <Container >
                    <Row className="justify-content-md-center">
                    <Col as='input'  xs lg="2">
                        <label>Schneider Employees</label>
                    </Col>
                    <Col md="auto">
                        <Link to='/edit'>
                            <Button variant="outline-primary" >ADD</Button>
                        </Link> 
                    </Col>
                    <Col xs lg="2">
                        <Button variant="outline-primary" >edit</Button>
                    </Col>
                    <col>
                        <Button variant="outline-primary" >delete</Button>
                    </col>
                    </Row>
                </Container> */}
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
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.employees.map(employee => {
                            return (<TableBody 
                                employee={employee} 
                                delete={this.deleteEmployee}
                                select={this.selectEmployee}
                                edit={this.editEmployee}
                                key={employee._id}
                                selected={this.state.selected.includes(employee)} />)
                        })}
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default HomePage;