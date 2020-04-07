import React from 'react'
import {Button} from 'react-bootstrap';
import { useForm } from "react-hook-form";


let oldep = ''

const EditForm = (props) => {
    const {employee, submit, deps} = props 
    const { handleSubmit, register, errors, setValue, formState, watch } = useForm()

    if (employee._id && !formState.dirty)  {
        setValue([
        {sesaNumber: employee.sesaNumber},
        {fullName: employee.fullName},
        {employeeNumber: employee.employeeNumber},
        {phoneNumber: employee.phoneNumber},
        {email: employee.email},
        {department: employee.department},
        {team: employee.team},
        {manager: employee.team},
      ])
    }

    //watching for input department to change
    let department = watch('department')

    // run in the begining to make sure the manager input is set to whoever manager of the first department
    if(!formState.dirty){oldep = deps[0].name}
    
    //see if the deparment changed it change the manager accordingly 
    if(department !== oldep && !employee._id){
        oldep = department
        let manager = deps[0].manager
        deps.forEach(dep => manager = dep.name === department?dep.manager:manager)
        setValue([{manager: manager}])
    }

    return (
        <div className='container' >
            <form onSubmit={handleSubmit(values => submit(values))}>
                <div>
                    <label htmlFor="sesaNumber">SESA number</label>
                    <input
                    name="sesaNumber"
                    ref={register({
                        required: 'Required',
                        pattern: {
                        value: /^([1-9][0-9]*)$/i,
                        message: "invalid SESA number"
                        }
                    })}
                    />
                    {errors.sesaNumber && errors.sesaNumber.message}
                </div>
                
                <div>
                    <label htmlFor="fullName">Full Name</label>
                    <input
                    name="fullName"
                    ref={register({
                        required: 'Required',
                        minLength: {value: 3, message: "min length is 3"},
                        maxLength: {value: 50, message: "max length is 50"},
                        pattern: {
                        value: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/i,
                        message: "invalid charcters used in full Name"
                        }
                    })}
                    />
                    {errors.fullName && errors.fullName.message}
                </div>
                
                <div>
                    <label htmlFor="employeeNumber">Employee number</label>
                    <input
                    name="employeeNumber"
                    ref={register({
                        required: 'Required',
                        pattern: {
                        value: /^([1-9][0-9]*)$/i,
                        message: "invalid Employee number"
                        }
                    })}
                    />
                    {errors.employeeNumber && errors.employeeNumber.message}
                </div>
                
                <div>
                    <label htmlFor="employeeNumber">Phone number</label>
                    <input
                    name="phoneNumber"
                    ref={register({
                        required: 'Required',
                        pattern: {
                        value: /^([0-9]*)$/i,
                        message: "invalid phone number"
                        }
                    })}
                    />
                    {errors.phoneNumber && errors.phoneNumber.message}
                </div>

                <div>
                    <label htmlFor="email">Email</label>
                    <input
                    name="email"
                    ref={register({
                        required: 'Required',
                        pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: "invalid email address"
                        }
                    })}
                    />
                    {errors.email && errors.email.message}
                </div>
                
                <div>
                    <label htmlFor="department">Department</label>
                    <select name='department' ref={register} >
                        {deps.map(dep => {
                            return (<option value={dep.name} key={dep._id} >{dep.name}</option>)
                        })}
                    </select>

                </div>
                
                <div>
                    <label htmlFor="team">team</label>
                    <input
                    name="team"
                    ref={register({
                        required: 'Required',
                        minLength: {value: 3, message: "min length is 3"},
                        maxLength: {value: 50, message: "max length is 50"},
                        pattern: {
                        value: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/i,
                        message: "invalid charcters used in team"
                        }
                    })}
                    />
                    {errors.team && errors.team.message}
                    </div>
                
                <div>
                    <label htmlFor="manager">Manager</label>
                    <input
                    disabled
                    name="manager"
                    ref={register({
                        required: 'Required',
                        minLength: {value: 3, message: "min length is 3"},
                        maxLength: {value: 50, message: "max length is 50"},
                        pattern: {
                        value: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/i,
                        message: "invalid charcters used in manager"
                        }
                    })}
                    />
                    {errors.manager && errors.manager.message}
                </div>
                
                <div>
                    <Button variant="outline-primary"  type="submit" value="Submit" >Submit</Button>
                </div>
            </form>
    </div>
    );

}
export default EditForm