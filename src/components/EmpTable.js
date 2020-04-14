import React from 'react'

import Table from 'react-bootstrap/Table'
import TableBody from '../components/EmpTableBody'
import { Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'


const EmpTable = ({selectedEmps, selectallEmps, employees, deleteEmp, selectEmp, deleteSelected, filterEmps, departments}) => (
    <div className='fragment'>

        <h2>Employees list</h2>

        <Link to='/editEmp'>
            <Button variant="outline-primary" >ADD</Button>
        </Link> {'     '}
        <Button onClick={() => window.location = '/editEmp/' + selectedEmps[0]._id}  
        disabled={selectedEmps.length !== 1 }
        variant="outline-secondary" >
            EDIT
        </Button>{'         '}
        <Button onClick={deleteSelected}  
        disabled={selectedEmps.length  < 1 }
        variant="outline-secondary" >
            Delete
        </Button>
        <select onChange={filterEmps} defaultChecked={'all'} >
            <option key={0} value={'all'} >All departments</option>
            {departments.map(dep => (
                <option key={dep._id} value={dep._id} >{dep.name}</option>
            ))}
        </select>
        
        <div className="table">
        </div>
        <Table striped bordered hover>
            <thead>
                <tr>
                <th>
                    <input type="checkbox" 
                    onChange={(e) => selectallEmps(e.target.checked)}
                    checked={employees.length === selectedEmps.length && employees.length !== 0}
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
                {employees.map(employee => {
                    return (<TableBody 
                        employee={employee} 
                        deleteEmp={deleteEmp}
                        select={selectEmp}
                        key={employee._id}
                        selected={selectedEmps.includes(employee)}
                        departments={departments} />)
                })}
            </tbody>
        </Table>
    </div>
)
export default EmpTable