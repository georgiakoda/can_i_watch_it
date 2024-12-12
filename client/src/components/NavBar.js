import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 

const NavBar = () => {

  const [user, setUser] = useState(null);

  useEffect(() => {

    const fetchUser = async () => {

      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Error fetching user:', error.message);
      } else {
        setUser(user); 
      }
    };

    fetchUser();
    
    // Listen for authentication state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null); 
    });


    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error logging out:', error.message);
    } else {
      setUser(null); // Clear user state after successful log out
      window.location.reload(); 
    }
  };

    return (

      <nav className="navbar nav-fill fixed-bottom bg-body-tertiary pb-3">

        <div className="container-fluid">
  

          <ul className="nav nav-pills  my-2 mb-lg-0">

            {/* Home */}
            <li className="nav-item">
              <Link to="/" className="nav-link active" aria-current="page"><span><i className="bi bi-house px-1"></i></span>Home</Link>
            </li>

            {/* About Dropup */}
            <li className="nav-item dropup">
            
              <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="/" role="button" aria-expanded="false"><span><i className="bi bi-info-circle px-1"></i></span>About</a>
            
              <ul className="dropdown-menu">
                <li>
                  <Link to="/about" className="nav-link dropdown-item">User Guide</Link>
                </li>

                <li>
                  <Link to="/resources" className="nav-link dropdown-item">Resources</Link>
                </li>

              </ul>

            </li>

            {/* Watchlist */}
            <li className="nav-item">
              <Link to="/watchlist" className="nav-link" aria-current="page"><span><i className="bi bi-star px-1"></i></span>My Watchlist</Link>
            </li>

            {/* Account */}
            <li className="nav-item dropup">
            
              <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="/" role="button" aria-expanded="false"><span><i className="bi bi-person px-1"></i></span>Account</a>
            
              <ul className="dropdown-menu">

                <li>
                  <Link to="/signin" className="nav-link dropdown-item">Sign In</Link>
                </li>

                <li>
                  <Link to="/signup" className="nav-link dropdown-item">Create an Account</Link>
                </li>      

              </ul>

            </li>         

          </ul>


          {user ? (
            // Show log out button if user is logged in
            <button
              className="btn btn-outline-danger"
              onClick={handleLogout}
            >
              Log Out
            </button>
          ) : (
            <div></div>
          )}

        </div>
 
      </nav>
    );

}

export default NavBar;