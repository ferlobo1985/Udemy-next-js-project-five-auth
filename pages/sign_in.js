import { useState } from 'react';
import { useFormik } from 'formik'
import * as Yup from 'yup';

import { errorHelper } from 'utils/tools';
import { TextField, Button } from '@material-ui/core';

import axios from 'axios';


const SignIn = () => {
    const [formType, setFormType] = useState(false);
    const [loading, setLoading] = useState(false);
   
    const formik = useFormik({
        initialValues:{ email:'',password:'' },
        validationSchema: Yup.object({
            email: Yup.string()
            .required('Sorry the email is required')
            .email('This is an invalid email'),
            password: Yup.string()
            .required('Sorry the password is required')
        }),
        onSubmit:(values)=>{
            submitForm(values)
        }
    })

    const submitForm = (values) => {
        if(formType){
            // register
            axios.post('/api/auth',values)
            .then(response => {
                console.log(response.data)
            })
        } else {
            // sign in
        }

    }


    const handleFormType = () => {
        setFormType(!formType)
    }


    return(
        <div>
            <h1>{formType ? 'Register':'Sign in'}</h1>

            { loading ?
                'Loading'
            :   
                <form className="mt-3" onSubmit={formik.handleSubmit}>

                    <div className="form-group">
                        <TextField
                            style={{width:'100%'}}
                            name="email"
                            label="Enter you email"
                            variant="outlined"
                            {...formik.getFieldProps('email')}
                            {...errorHelper(formik,'email')}
                        />
                    </div>

                    <div className="form-group">
                        <TextField
                            style={{width:'100%'}}
                            name="password"
                            label="Enter you password"
                            variant="outlined"
                            type="password"
                            {...formik.getFieldProps('password')}
                            {...errorHelper(formik,'password')}
                        />
                    </div>

                    <div className="mb-3">
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            size="small"
                        >   
                            {formType ? 'Register':'Sign in'}
                        </Button>
                    </div>
                    <div>
                        <Button
                            variant="contained"
                            color="secondary"
                            size="small"
                            onClick={handleFormType}
                        >   
                            {formType ? 
                                 'Need to Signed in ? click here'   
                            :
                                'Need to register ? click here'
                            }
                        </Button>
                    </div>


                </form>

            }

        </div>
    )
}

export default SignIn;