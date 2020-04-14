import React, {useState} from 'react'
import {Button} from 'react-bootstrap';
import { useForm } from "react-hook-form";


const EditForm = (props) => {
    const {department, submit} = props 
    const { handleSubmit, register, errors, setValue, formState } = useForm()

    if (department._id  && !formState.dirty)  {
        setValue([
        {name: department.name},
        {manager: department.manager},
      ])
    }

    return (
        <div className={'form-edit'} >
            <form onSubmit={handleSubmit(values => submit(values))}>            
                <div>
                    <label htmlFor="name">Full Name</label>
                    <input
                    name="name"
                    ref={register({
                        required: 'Required',
                        minLength: {value: 3, message: "min length is 3"},
                        maxLength: {value: 50, message: "max length is 50"},
                        pattern: {
                        value: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/i,
                        message: "invalid charcters used in Name"
                        }
                    })}
                    />
                    {errors.name && errors.name.message}
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