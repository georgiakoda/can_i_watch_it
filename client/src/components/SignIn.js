import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { supabase } from '../supabaseClient';


const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); //Maybe unnecessary idk
    const [isLoading, setIsLoading] = useState(false); 

    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        setIsLoading(true);
        setErrorMessage('');  // Clear previous error messages
    
        // Use Supabase to sign in
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
    
        setIsLoading(false); 
    
        if (error) {
          setErrorMessage(error.message); // Display error message
          return;
        }
    
        // Refresh the page if login successful
        //console.log('User logged in:', data);
        navigate('/');

      };

    return (
        
        <div className="container px-4 pt-4 my-4">
            
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
                            onChange={(e) => setEmail(e.target.value)}></input>
                        <label htmlFor="email">E-mail</label>

                        </div>
                        
                        <div className="form-floating">

                            <input 
                                type="password" 
                                className="form-control" 
                                id="password" 
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}></input>
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