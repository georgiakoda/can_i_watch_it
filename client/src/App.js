import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { supabase } from './supabaseClient';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


import Header from './components/Header';
import Results from './components/Results';
import NavBar from './components/NavBar';
import About from './components/About';
import Resources from './components/Resources';
import SignUp from './components/SignUp';
import Watchlist from './components/Watchlist';
import SignIn from './components/SignIn';
//import ResultsTest from './components/ResultsTest';


// Streaming Service Logo Icons
import NetflixIcon from './assets/netflix-icon.png';
import HuluIcon from './assets/hulu-icon.png';
import HboIcon from './assets/hbo-icon.png';
import AppleIcon from './assets/appletv-icon.png';
import DisneyIcon from './assets/disney-icon.png';
import PeacockIcon from './assets/peacock-icon.png';
import PrimeIcon from './assets/prime-icon.png';

const services = [
  { imageSrc: AppleIcon, label: 'Apple TV+', id: 'apple', link: '#', wmID:371 },
  { imageSrc: DisneyIcon, label: 'Disney+', id: 'disney', link: '#', wmID:372 },
  { imageSrc: HboIcon, label: 'HBO Max', id: 'hbo', link: '#', wmID:387 },
  { imageSrc: HuluIcon, label: 'Hulu', id: 'hulu', link: '#', wmID:157 },
  { imageSrc: NetflixIcon, label: 'Netflix', id: 'netflix', link: '#', wmID:203 },
  { imageSrc: PeacockIcon, label: 'Peacock', id: 'peacock', link: '#', wmID:389},
  { imageSrc: PrimeIcon, label: 'Prime', id: 'prime', link: '#', wmID:26}  
];


function App() {

  const [user, setUser] = useState(null);

  const [searchData, setSearchData] = useState({ services: [], query: '' });
  const [watchlist, setWatchlist] = useState([]);

  const handleSearch = (services, query) => {

    setSearchData({ services, query }); 

  };


  useEffect(() => {
    
    // Get the current session on app load
    const getCurrentSession = async () => {

      const { data: { session } } = await supabase.auth.getSession();
      if (session && session.user) {
        setUser(session.user);
      } else {
        setUser(null);
      }
    };

    getCurrentSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
    (event, session) => {
    setUser(session?.user || null); 
  }

);

    return () => {
      if (authListener?.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  return (
    <Router>
      <NavBar user={user} />
    <div className="App">
    <title>Can I Watch It?</title>
      <Routes>
      
      
        <Route path="/" element={
          <>
        <Header 
          onSearch={handleSearch} 
          services={services}  />

        {searchData.query && <Results 
          searchData={searchData} 
          selectedServices={searchData.services} 
          services={services} user={user} 
          watchlist={watchlist} 
          setWatchlist={setWatchlist} />}
        </>
        } />
        
        <Route path="/about" element={<About />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/watchlist" element={<Watchlist watchlist={watchlist} services={services}/>} />


      </Routes>
    </div>
    </Router>
  );
}

export default App;
