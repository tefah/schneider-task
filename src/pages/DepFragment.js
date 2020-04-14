import React, { Component } from "react"
import DepTable from '../components/DepTable'
import {getDepartments, deleteDepartment} from '../httpUtils/departmentsRequest'

class DepFragment extends Component {
    state = {
        departments: [],
        selected: [],
    }

    componentDidMount = () => {
        //getting departments data and setting the state with the new data
        getDepartments(
            deps => this.setState({departments: deps}),
            err => console.log(err)
        )
    }

    //remove departments from UI and empty selected
    onSuccessRemovingDeployees = (res, ids) => {
        if(res.status === 200){
            this.setState((state, props) => {
                return{
                    departments: state.departments.filter(department => !ids.includes(department._id)),
                    selected: []
                }
            })
        }
    }

    //delete selected departments by making string of ids 'id1,id2,id3,...'
    deleteSelected = () => {
        if (window.confirm('Are you sure you wish to delete the selected departments?')){
            if(window.confirm('Please NOTICE that ALL employees inside the selected departments will be deleted')){
                const ids = this.state.selected.map(emp => emp._id)
                const idStr = ids.toString()
                deleteDepartment(idStr, 
                    res => this.onSuccessRemovingDeployees(res, ids),
                    err => console.log(err))
            }
        }
    }

    //delete department through department delete button
    deleteDep = (id)=>{
        if (window.confirm('Are you sure you wish to delete the selected departments?')){
            if(window.confirm('Please NOTICE that ALL employees inside this department will be deleted')){
                deleteDepartment(id, 
                    res => this.onSuccessRemovingDeployees(res, [id]),
                    err => console.log(err))
            }
        }
    }

    //select / DEselect an entry by id
    selectDep = (IS_CHECKED, dep) => {     
        if (IS_CHECKED){
            const newSelected = [...(this.state.selected)]
            newSelected.push(dep)
            this.setState({
                selected: newSelected
            })
        }else{
            const newSelected = this.state.selected.filter(department => department !== dep)
            this.setState({
                selected: newSelected
            })
        }
    }

    //selectall / DEselect all depending on the IS_CHECKED boolean
    selectall = (IS_CHECKED) => {
        console.log(IS_CHECKED)
        if(IS_CHECKED){
            this.setState({selected: this.state.departments.filter(emp => emp._id)})
        }else {
            this.setState({selected: []})
        }
    }

    render = () => (
        <DepTable 
        selectedDeps={this.state.selected}
        departments={this.state.departments}
        selectallDeps={this.selectall}
        deleteDep={this.deleteDep}
        selectDep={this.selectDep} 
        deleteSelected={this.deleteSelected}
        />
    )

}

export default DepFragment