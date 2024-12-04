import React, { useState } from 'react';
import SearchBar from './SearchBar';

const Header = ({ services, onSearch, filterBy, setFilter }) => {

  return (
    <div className="container d-flex justify-content-center my-4 pt-5">

      <div className="p-5 w-75 text-center bg-body-tertiary rounded-3 shadow-sm">
        
        <h1 className="display-5">Can I Watch It?<i className="bi bi-play-btn text-danger mx-4"></i></h1>
        
        <p className="lead">
          Select your streaming services below and search for a title.
        </p>


        <SearchBar services={services} onSearch={onSearch} />
        

      </div>
    </div>
  );
};

export default Header;
  

