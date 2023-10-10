import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import ReactLogo from './react.png'; // Import your React logo image

import { history } from '_helpers';
import { userActions, alertActions } from '_store';
import { useState } from 'react'; // Import useState
import PasswordChecklist from "react-password-checklist";



//22222222222







export { Register };

function Register() {
    const dispatch = useDispatch();
    const [selectedGender, setSelectedGender] = useState('male'); // Set the default selection to "male"

    const [password, setPassword] = useState(''); // State to store the password
    const [isPasswordEntered, setIsPasswordEntered] = useState(false); // State to track whether a password is entered
    const [isLoading, setIsLoading] = useState(false); // New loading state
    const [selectedDate, setSelectedDate] = useState('');

    // form validation rules 
    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .required('First Name is required'),
        lastName: Yup.string()
            .required('Last Name is required'),
        Email: Yup.string()
            .required('Email is required')
            .matches(
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                'Email address is not valid'
            ),
        phone: Yup.string()
            .required('Phone number is required')
            .matches(/^\d{10}$/, 'Phone number is not valid'), // Validate 10 digits    
        password: Yup.string()
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match') // Check if confirmPassword matches password
            .required('Confirm Password is required'),    
    });
    const formOptions = { resolver: yupResolver(validationSchema) };



    // General values for day, month, and year dropdowns
    const days = Array.from({ length: 31 }, (_, i) => i + 1); // 1 to 31
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i); // Current year to 100 years ago

    // get functions to build form with useForm() hook
    const { register, handleSubmit, formState, reset } = useForm(formOptions);
    const { errors, isSubmitting } = formState;

    async function onSubmit(data) {
        dispatch(alertActions.clear());
        setIsLoading(true); // Set loading state to true
        try {
            const formData = {
                ...data,
                gender: selectedGender,
                 // Add selected gender to formData
                 selectedDate: `${data.day}/${data.month}/${data.year}`, // Combine day, month, and year

            };
            const response = await dispatch(userActions.register(formData)).unwrap();

            if (response && response.success) {
                // Clear the form and update button text
                reset();
                setPassword('');
                setIsPasswordEntered(false);
                setIsLoading(false); // Set loading state back to false
            } else {
                // Handle registration failure here
                setIsLoading(false); // Set loading state back to false
                // You can display an error message or handle it as needed
            }
            dispatch(alertActions.success({ message: 'Record Successfully added', showAfterRedirect: false }));

        } catch (error) {
            dispatch(alertActions.error(error));
            setIsLoading(false); // Set loading state back to false in case of an error
        }
    }


    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        setIsPasswordEntered(!!newPassword); // Set isPasswordEntered to true if a password is entered
    };
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    {/* Form Container without card class */}
                    <div className="card m-3 border-0">
                        <h4 className="card-header border-0   custom-title">Registration Form</h4>
                        <div className="card-body bg-light">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="mb-3">
                                    <label className="form-label">First Name<span className="text-danger">*</span></label>
                                    <input
                                        name="firstName"
                                        type="text"
                                        {...register('firstName')}
                                        className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                        placeholder="John"
                                   />
                                    <div className="invalid-feedback">{errors.firstName?.message}</div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Last Name<span className="text-danger">*</span></label>
                                    <input
                                        name="lastName"
                                        type="text"
                                        {...register('lastName')}
                                        className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                        placeholder="Piter"
                                    />
                                    <div className="invalid-feedback">{errors.lastName?.message}</div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email<span className="text-danger">*</span></label>
                                    <input
                                        name="Email"
                                        type="text"
                                        {...register('Email')}
                                        className={`form-control bg-light ${errors.Email ? 'is-invalid' : ''}`}
                                        placeholder="abc@gmail.com"
                                   />
                                    <div className="invalid-feedback">{errors.Email?.message}</div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Phone<span className="text-danger">*</span></label>
                                    <input
                                        name="phone"
                                        type="text"
                                        {...register('phone')}
                                        className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                                        placeholder="0123456789"
                                    />
                                    <div className="invalid-feedback">{errors.phone?.message}</div>
                                </div>
                                <div className="mb-3">
                                    <div className="form-check form-check-inline">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="gender"
                                            value="male"
                                            checked={selectedGender === 'male'} // Check if 'male' is selected
                                            onChange={() => setSelectedGender('male')} // Set gender to 'male' when selected
                                        />
                                        <label className="form-check-label">Male</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="gender"
                                            value="female"
                                            checked={selectedGender === 'female'} // Check if 'female' is selected
                                            onChange={() => setSelectedGender('female')} // Set gender to 'female' when selected
                                        />
                                        <label className="form-check-label">Female</label>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Birthday</label>
                                    <div className="row">
                                        <div className="col">
                                            <select className="form-select" name="day" {...register('day')}>
                                                <option value="">Day</option>
                                                {days.map((day) => (
                                                    <option key={day} value={day}>{day}</option>
                                                ))}
                                            </select>
                                            <div className="invalid-feedback">{errors.day?.message}</div>
                                        </div>
                                        <div className="col">
                                            <select className="form-select" name="month" {...register('month')}>
                                                <option value="">Month</option>
                                                {months.map((month, index) => (
                                                    <option key={index} value={index + 1}>{month}</option>
                                                ))}
                                            </select>
                                            <div className="invalid-feedback">{errors.month?.message}</div>
                                        </div>
                                        <div className="col">
                                            <select className="form-select" name="year" {...register('year')}>
                                                <option value="">Year</option>
                                                {years.map((year) => (
                                                    <option key={year} value={year}>{year}</option>
                                                ))}
                                            </select>
                                            <div className="invalid-feedback">{errors.year?.message}</div>
                                        </div>
                                    </div>
                                </div>
                                <input
                                    type="hidden"
                                    name="selectedDate"
                                    value={selectedDate}
                                    ref={register()}
                                />                          
                                <div className="mb-3">
                                    <label className="form-label">Password<span className="text-danger">*</span></label>
                                    <input
                                        name="password"
                                        type="password"
                                        {...register('password')}
                                        className={`form-control bg-light ${errors.password ? 'is-invalid' : ''}`}
                                        placeholder="#####"
                                        onChange={handlePasswordChange} // Update the password state and isPasswordEntered
                                    />
                                    {isPasswordEntered && (
                                        <PasswordChecklist
                                            rules={["minLength", "specialChar", "number", "capital", "lowercase"]}
                                            minLength={8}
                                            value={password}
                                        />
                                    )}
                                    <div className="invalid-feedback">{errors.password?.message}</div>
                                </div>
                                <div className="mb-3">
                                   <label className="form-label">
                                       Confirm Password<span className="text-danger">*</span>
                                   </label>
                                   <input
                                        name="confirmPassword"
                                        type="password"
                                        {...register('confirmPassword')}
                                        className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                                        placeholder="#####"
                                   />
                                   <div className="invalid-feedback">{errors.confirmPassword?.message}</div>
                                </div>
                                <div className="mb-3 form-check">
                                    <input
                                       type="checkbox"
                                       className="form-check-input"
                                       {...register('Marketing')}
                                       id="Marketing"
                                       defaultChecked  
                                    />
                                    <label className="form-check-label" htmlFor="Marketing">
                                    I'd like to receive marketing promotions, special offers, and updates.
                                    </label>
                                </div>
                                
                                <button
                                    disabled={isSubmitting || isLoading} // Disable the button while submitting or loading
                                    className="btn btn-primary"
                                    style={{ width: '100%' }}
                                >
                                    {isLoading ? 'Processing...' : isSubmitting ? (
                                        <span className="spinner-border spinner-border-sm me-1"></span>
                                    ) : null}
                                    Sign Up
                                </button>
                                <p className="mt-3">Already have an account? <Link to="../login">Login</Link></p>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    {/* Image Container with custom CSS to remove border */}
                    <div className="image-container" style={{ border: 'none', borderLeft: '1px solid #ccc', height: '100%', display: 'flex',  alignItems: 'center'  }}>
                        {/* Your image goes here */}
                        <img src={ReactLogo} alt="Registration" style={{ height: '50%' }} />
                    </div>
                </div>
            </div>
        </div>
    )
}
