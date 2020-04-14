import React, { Component } from "react"
import EmpTable from '../components/EmpTable'
import {getEmployees, deleteEmployee} from '../httpUtils/EmployeeRequests'
import {getDepartments} from '../httpUtils/departmentsRequest'

class EmpFragment extends Component {
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
            err => console.log(err)
        )
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
        console.log(IS_CHECKED)
        if(IS_CHECKED){
            this.setState({selected: this.state.employees.filter(emp => emp._id)})
        }else {
            this.setState({selected: []})
        }
    }

    render = () => (
        <EmpTable 
        selectedEmps={this.state.selected}
        employees={this.state.employees}
        departments={this.state.departments}
        selectallEmps={this.selectall}
        deleteEmp={this.deleteEmp}
        selectEmp={this.selectEmployee} 
        deleteSelected={this.deleteSelected}
        />
    )

}

export default EmpFragment