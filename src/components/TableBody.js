import React from 'react'
import {Link} from 'react-router-dom'

const TableBody = props => (
    <tr>
        <td>  <input type="checkbox" checked={props.selected} onChange={e => {props.select(e.target.checked, props.employee)}} /> </td>
        <td>{props.employee.sesaNumber}</td>
        <td>{props.employee.fullName}</td>
        <td>{props.employee.employeeNumber}</td>
        <td>{props.employee.phoneNumber}</td>
        <td>{props.employee.email}</td>
        <td>{props.employee.team}</td>
        <td>{props.employee.manager}</td>
        <td>
            <Link to={"/edit/"+props.employee._id}>edit</Link> |
            <button onClick={() => { props.deleteEmployee(props.employee._id) }}>delete</button>
        </td>
    </tr>
  )

  export default TableBody