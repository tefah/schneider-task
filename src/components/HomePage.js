import React from 'react'
import Table from 'react-bootstrap/Table'
import TableBody from './TableBody'
import { Button, Container, Row ,  Col} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {getEmployees} from '../httpUtils/EmployeeRequests'

class HomePage extends React.Component {
    state = {
        employees: [],
        selected: [],
    }

    selectEmployee(id){
        //add employee _id to selected array
        this.setState((state) => {
            selected: [...state.selected,id] 
            debugger
        })

    }
    editEmployee(){
        //go to /edit with the employee to edit
    }

    deleteEmployee(id){
        //call for delete employee here
    }
    componentDidMount() {
        //getting employees data and setting the state with the new data
        getEmployees(res => {
            this.setState({employees: res.data  })
        },
        err => console.log(err))
    }

    render() {
        return (
            <div className='container'>

                <Link to='/edit'>
                    <Button variant="outline-primary" >ADD</Button>
                </Link> {'     '}
                <Button onClick={this.editEmployee} variant="outline-secondary" >EDIT</Button>
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
                            <input type="checkbox"  /> 
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
                                key={employee._id} />)
                        })}
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default HomePage;