import React, { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { supabase } from '../supabaseClient';

const SignUp = () => {

    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: ''
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');


    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent form from submitting by default

        const { email, username, password } = formData;

        // Validate fields
        if (!email.trim() || !username.trim() || !password.trim()) {
            setErrorMessage('All fields are required.');
            return;
        } else {
            setErrorMessage(''); // Clear the error message if validation passes
        }

        // Use Supabase signUp to create the user
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            setErrorMessage('There was a problem creating your account.'); 
        } else {
            setSuccessMessage('Sign up successful! Check your email to confirm your account.');
            setFormData({
                email: '',
                username: '',
                password: ''
            });

        if (data?.user) {
            await saveUserInfo(data.user.id, username, email);
        }
    }

    };

    const saveUserInfo = async (userId, username, email) => {

        const { data, error } = await supabase
            .from('userInfo')
            .insert([{ id: userId, username, email }]);

        if (error) {
            console.error('Error saving user info:', error.message);
        } else {
            console.log('User info saved:', data);
        }
    };

    return (
        <div className="container px-4 pt-4 my-4">

            <h2 className="pb-2 border-bottom">Create an account</h2>

            <p>Enter your e-mail address, username and password below to save titles to your watch list.</p>

            {/* Error message for incomplete form */}
            {errorMessage && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <i className="bi bi-exclamation-triangle-fill mx-2"></i> {errorMessage}
                    <button 
                        type="button" 
                        className="btn-close" 
                        data-bs-dismiss="alert" 
                        aria-label="Close" 
                        onClick={() => setErrorMessage('')}
                    ></button>
                </div>
            )}

            {/* Form submitted message */}
            {successMessage && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    <i className="bi bi-check-circle-fill mx-2"></i> {successMessage}
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="alert"
                        aria-label="Close"
                        onClick={() => setSuccessMessage('')}
                    ></button>
                </div>
                )}

            <div className="p-5 bg-body-tertiary rounded-3 shadow-sm my-4">
                
                {/* Signup Form Begin */}
                <form className="row g-3" onSubmit={handleSubmit}>
                    
                    {/* Email */}
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">E-mail address</label>
                        <input 
                            type="email" 
                            className="form-control" 
                            id="email" 
                            placeholder="email@example.com"
                            value={formData.email}
                            onChange={handleInputChange}>
                            
                        </input>
                    </div>

                    {/* Username */}
                    <div className="col-md-6">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="username" 
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleInputChange}>
                                

                        </input>
                    </div>
                    
                    {/* Password */}
                    <div className="col-md-6">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            id="password" 
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleInputChange} >
                        </input>

                        <div id="passwordHelpBlock" className="form-text">
                            Password must be at least 6 characters long.
                        </div>


                    </div>
                    
                    <div className="col-12 py-2">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );

};

export default SignUp;