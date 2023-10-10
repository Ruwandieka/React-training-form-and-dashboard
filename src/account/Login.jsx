import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import ReactLogo from './react.png'; // Import your React logo image

import { authActions } from '_store';

export { Login };

function Login() {
    const dispatch = useDispatch();

    // form validation rules 
    const validationSchema = Yup.object().shape({
        Email: Yup.string().required('Email is required'),
        password: Yup.string().required('Password is required')
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    function onSubmit({ Email, password }) {
        return dispatch(authActions.login({ Email, password }));
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    {/* Form Container without card class */}
                    <div className="m-3">
                        <h4>Login Form</h4>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input
                                    name="Email"
                                    type="text"
                                    {...register('Email')}
                                    className={`form-control  ${errors.Email ? 'is-invalid' : ''}`}
                                    placeholder="john"  // Placeholder for email
                                />
                                <div className="invalid-feedback">{errors.Email?.message}</div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">
                                    Password<span className="text-danger">*</span> {/* Red asterisk */}
                                </label>
                                <input
                                    name="password"
                                    type="password"
                                    {...register('password')}
                                    className={`form-control  ${errors.password ? 'is-invalid' : ''}`}
                                    placeholder="#####"
                                />
                                <div className="invalid-feedback">{errors.password?.message}</div>
                            </div>
                            <button disabled={isSubmitting} className="btn btn-primary" style={{ width: '100%' }}>
                                {isSubmitting && <span className="spinner-border spinner-border-sm me-1"></span>}
                                Login
                            </button>
                            <p>Don't  you have an account? <Link to="../register" className="btn btn-link">Sign Up</Link></p>
                        </form>
                    </div>
                </div>
                <div className="col-md-6">
                    {/* Image Container with custom CSS to remove border */}
                    <div className="image-container" style={{ border: 'none', borderLeft: '1px solid #ccc', height: '100%' }}>
                        {/* Your image goes here */}
                        <img src={ReactLogo} alt="Registration" style={{ height: '100%' }} />
                    </div>
                </div>
            </div>
        </div>
    )
}
