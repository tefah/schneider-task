import React from 'react'
import {Button} from 'react-bootstrap';
import { useForm } from "react-hook-form";

const EditForm = (props) => {
    const {employee, submit} = props 
    const { handleSubmit, register, errors, setValue } = useForm()

    if (employee._id)  {
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
    
    const onSubmit = values => {
        submit(values)
    };
    return (
        <div className='container' >
            <form onSubmit={handleSubmit(onSubmit)}>
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
                    <input
                    name="department"
                    ref={register({
                        required: 'Required',
                        minLength: {value: 3, message: "min length is 3"},
                        maxLength: {value: 50, message: "max length is 50"},
                        pattern: {
                        value: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/i,
                        message: "invalid charcters used in department"
                        }
                    })}
                    />
                    {errors.department && errors.department.message}
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