import React from 'react'
import {Link} from 'react-router-dom'

const customStyle= {
    minWidth: '150px'
}

const TableBody = ({department, deleteDep, select, selected}) => {
    return (
        <tr>
            <td>  <input type="checkbox" checked={selected} onChange={e => {select(e.target.checked, department)}} /> </td>
            <td>{department.name}</td>
            <td>{department.manager}</td>
            <td style={customStyle}>
                <Link to={"/edit/"+department._id}>edit</Link> |
                <button onClick={() => { deleteDep(department._id) }}>delete</button>
            </td>
        </tr>
      )
}

export default TableBody