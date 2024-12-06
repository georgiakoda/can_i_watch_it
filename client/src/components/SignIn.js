import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { supabase } from '../supabaseClient';


const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); //Maybe unnecessary idk
    const [isLoading, setIsLoading] = useState(false); 
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const navigate = useNavigate(); 

    // Check if user is logged in already
    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setIsLoggedIn(!!session); // Set to true if a session exists
        };
        checkUser();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrorMessage(''); 
        
        // If already logged in
        if (isLoggedIn){
            setErrorMessage('You are already signed in.');
            return;
        }

        // If input fields are blank
        if (!email || !password) {
            setErrorMessage('All fields required.');
            return;
        }

        setIsLoading(true);
        
    
        // Use Supabase to sign in
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        

    
        setIsLoading(false); 
    
        if (error) {
          setErrorMessage('Oops! Unable to sign in.'); 
          return;
        }
    
        // Refresh the page if login successful
        //console.log('User logged in:', data);
        navigate('/');

      };

    return (
        
        <div className="container px-4 pt-4 my-4">
            <div className="d-flex justify-content-center">
            {errorMessage && (
                    <div className="alert alert-danger alert-dismissible w-50 fade show" role="alert">
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
            </div>
            
            
            <div className="d-flex justify-content-center">


            <div className="p-5 w-50 bg-body-tertiary rounded-3 shadow-sm my-4">
                
                {/* Form Begin */}
                <form className="row g-3" onSubmit={handleSubmit}>

                    {/* Username */}
                    <div className="mb-0">
                        <div className="form-floating">

                        <input 
                            type="email" 
                            className="form-control mb-3" 
                            id="email" 
                            placeholder="E-mail" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isLoggedIn}>
                            
                            </input>
                        <label htmlFor="email">E-mail</label>

                        </div>
                        
                        <div className="form-floating">

                            <input 
                                type="password" 
                                className="form-control" 
                                id="password" 
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={isLoggedIn}>
                                
                                </input>
                            <label htmlFor="password">Password</label>

                        </div>

                        <div className="pt-4 d-flex justify-content-center">
                            <button type="submit" className="btn btn-primary" disabled={isLoading}>
                            {isLoading ? 'Signing In...' : 'Sign In'}
                            </button>
                        </div>


                    </div>


                </form>
               
            </div>

          </div>
           
      </div>

    );
}

export default SignIn;