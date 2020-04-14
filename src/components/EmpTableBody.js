import React from 'react'
import {Link} from 'react-router-dom'

const customStyle= {
    minWidth: '150px'
}
const TableBody = ({employee, deleteEmp, select, selected, departments}) => {
    return (
        <tr>
            <td>  <input type="checkbox" checked={selected} onChange={e => {select(e.target.checked, employee)}} /> </td>
            <td>{employee.sesaNumber}</td>
            <td>{employee.fullName}</td>
            <td>{employee.employeeNumber}</td>
            <td>{employee.phoneNumber}</td>
            <td>{employee.email}</td>
            <td>{(departments.find(({_id}) => _id === employee.departmentID)).name }</td>
            <td>{employee.team}</td>
            <td>{employee.manager}</td>
            <td style={customStyle}>
                <Link to={"/edit/"+employee._id}>edit</Link> |
                <button onClick={() => { deleteEmp(employee._id) }}>delete</button>
            </td>
        </tr>
      )
}

  export default TableBody