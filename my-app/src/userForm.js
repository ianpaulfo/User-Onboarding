import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as yup from 'yup';
import { withFormik, Form, Field } from 'formik';

function UserForm({status, errors, touched}) {

    const [ users, setUsers ] = useState([]);
    useEffect(() => {
        if (status) {
            setUsers([...users, status])
        }
    }, [status])
    return(
        <Form>
        {touched.name && errors.name && <p>{errors.name}</p>}
        <Field type='text' name='name' placeholder='Name' />


        <button type='submit'>Submit</button>
        </Form>
    )
}


const FormikUserForm = withFormik({
    mapPropsToValues: ({ name, email, password, terms }) => {
        return {
            name: name || '',
            email: email || '',
            password: password || '',
            terms: terms || 'false'
        }
    },

    validationSchema: yup.object().shape({
        name: yup.string().required("Please enter your name"),
        email: yup.string().required("Please enter your email"),
        password: yup.string().required("Please enter a password"),
        terms: yup.boolean().oneOf([true], 'You must agree to our terms of service, worm. What are you gonna do about it?')
    }),

    handleSubmit: (values, { setStatus }) => {
        axios.post(' https://reqres.in/api/users', values)
        .then((res) => {
            setStatus(res.data);
        })
        .catch((err) => {
            console.log(`Error: ${err}`);
        })
    }
})(UserForm) 

export default FormikUserForm;