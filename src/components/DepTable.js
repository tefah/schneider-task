import React from 'react'

import Table from 'react-bootstrap/Table'
import TableBody from '../components/DepTableBody'
import { Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'


const DepTable = ({selectedDeps, selectallDeps, deleteDep, selectDep, deleteSelected, departments}) => (
    <div className='fragment'>

        <h2>Departments list</h2>

        <Link to='/editDep'>
            <Button variant="outline-primary" >ADD</Button>
        </Link> {'     '}
        <Button onClick={() => window.location = '/editDep/' + selectedDeps[0]._id}  
        disabled={selectedDeps.length !== 1 }
        variant="outline-secondary" >
            EDIT
        </Button>{'         '}
        <Button onClick={deleteSelected}  
        disabled={selectedDeps.length  < 1 }
        variant="outline-secondary" >
            Delete
        </Button>
        
        <div className="table">
        </div>
        <Table striped bordered hover>
            <thead>
                <tr>
                <th>
                    <input type="checkbox" 
                    onChange={(e) => selectallDeps(e.target.checked)}
                    checked={departments.length === selectedDeps.length && departments !== 0}
                    /> 
                </th>
                <th>Department name</th>
                <th>Manager</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {departments.map(department => {
                    return (<TableBody 
                        key={department._id}
                        department={department} 
                        deleteDep={deleteDep}
                        select={selectDep}
                        selected={selectedDeps.includes(department)}
                        />)
                })}
            </tbody>
        </Table>
    </div>
)
export default DepTable