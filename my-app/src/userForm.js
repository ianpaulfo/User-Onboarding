import React, { useState, useEffect } from "react";
import axios from "axios";
import * as yup from "yup";
import { withFormik, Form, Field } from "formik";

function UserForm({status, errors, touched}) {

    const [ users, setUsers ] = useState([]);
    useEffect(() => {
        if (status) {
            setUsers([...users, status])
        }
    }, [status])
    return(
        <Form>
                    <h1>Please Register!</h1>
                    <div className="form-entry"> 
                <Field type="text" name="name" placeholder="Name" />
                {touched.name && errors.name && <span className="error-msg">{errors.name}</span>}
            </div>


            <div className="form-entry">           
                <Field type="text" name="email" placeholder="Email"/>
                {touched.email && errors.email && <span className="error-msg">{errors.email}</span>}
            </div>


            <div className="form-entry">            
                <Field type="password" name="password" placeholder="Password" />
                {touched.password && errors.password && <span className="error-msg">{errors.password}</span>}
            </div>


            <div className="form-entry">
                <Field component="select" className="role-select" name="role">
                    <option>Your Role</option>
                    <option value="Carry">Carry</option>
                    <option value="Mid">Mid</option>
                    <option value="Offlane">Offlane</option>
                    <option value="Roam">Roam</option>
                    <option value="Support">Support</option>
                </Field>
            </div>
            <div className="form-entry">
                <label>Please accept our terms of service        
                    <Field type="checkbox" name="terms" value="false" />
                    {touched.terms && errors.terms && <span className="error-msg">{errors.terms}</span>}       
                </label>
            </div>

            <button type="submit">Submit</button>

            <div className="card-grid">
                {users.map((user) => {
            return (

                <div className="user-card" key={user.name}> 
                    <h2>Name: {user.name}</h2>
                    <p>Email: {user.email}</p>
                    <p>Password: {user.password} *wink*, hehe, le irony</p>
                    <p>Preferred Role: {user.role}</p>
                </div>)
})}
</div>
        </Form>
    )
}


const FormikUserForm = withFormik({
    mapPropsToValues: ({ name, email, password, terms, role }) => {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            terms: terms || "false",
            role: role || ""

        }
    },

    validationSchema: yup.object().shape({
        name: yup.string().required("Please enter your name"),
        email: yup.string().required("Please enter your email"),
        password: yup.string().required("Please enter a password"),
        terms: yup.boolean().oneOf([true], "You must agree to our terms of service, worm. What are you gonna do about it?")
    }),

    handleSubmit: (values, { setStatus }) => {
        axios.post(" https://reqres.in/api/users", values)
        .then((res) => {
            console.log(res);
            setStatus(res.data);
        })
        .catch((err) => {
            console.log(`Error: ${err}`);
        })
    }
})(UserForm) 

export default FormikUserForm;