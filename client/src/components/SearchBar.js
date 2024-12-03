import React, { useState } from 'react';
import { InputGroup, Form, Button, Dropdown, DropdownButton, Alert } from 'react-bootstrap'; 


const SearchBar = ({ services, onSearch, filterBy, setFilter }) => {

  const [selectedServices, setSelectedServices] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  
  
  const handleFilterChange = (filterType) => {
    const movieChecked = document.getElementById("movie").checked;
    const seriesChecked = document.getElementById("series").checked;

    if (movieChecked && seriesChecked) {
      setFilter([]); // No filtering when both are checked
    } else if (movieChecked) {
      setFilter(["movie"]); // Filter by movie
    } else if (seriesChecked) {
      setFilter(["series"]); // Filter by series
    } else {
      setFilter([]); // No filtering when none are checked
    }

  };
  


  const handleCheckboxChange = (event, service) => {
    event.stopPropagation(); // Prevent the dropdown from closing

    setSelectedServices((prevSelected) =>
      prevSelected.includes(service)
        ? prevSelected.filter((item) => item !== service) 
        : [...prevSelected, service] 
    );
  };

  const handleSearchClick = () => {

    handleFilterChange();

    if (!selectedServices.length && !searchText) {
      setAlertMessage('Please enter a search term and select at least one streaming service.');
    } else if (!selectedServices.length) {
      setAlertMessage('Please select at least one streaming service.');
    } else if (!searchText) {
      setAlertMessage('Please enter a search term.');
    } else {
      setAlertMessage(''); // Clear alert if everything is correct
      onSearch(selectedServices, searchText, filterBy);
    }

  };


  return (
      <div className="d-flex flex-column justify-content-center">

        {/* Display alert if there's a message */}
      {alertMessage && (
        <Alert variant="danger" className="d-flex align-items-center w-100 mb-3">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          <div>{alertMessage}</div>
        </Alert>
      )}
        
        {/* Search Bar Begin*/}
        <InputGroup className="mb-3">
          
          {/* Dropdown with checkboxes */}
          <DropdownButton
            variant="outline-secondary"
            title="Select Services"
            id="input-group-dropdown"
            drop="down"
            className="me-2"
          >
            {services.map((service, index) => (
              <Dropdown.Item key={index}>
                  <label
                      className="d-flex align-items-center"
                      onClick={(e) => handleCheckboxChange(e, service.label)} 

                  >
                  {/* Checkbox */}
                  <input
                    type="checkbox"
                    className="form-check-input me-2"
                    id={service.label}
                    checked={selectedServices.includes(service.label)}
                    onChange={(e) => handleCheckboxChange(e, service.label)}
                  />

                  {/* Service Logo Icon */}
                  <img
                    className="me-2"
                    width="22"
                    height="22"
                    src={service.imageSrc}
                    alt={service.label}
                  />
                  {/* Service Text */}
                  {service.label}
                </label>
              </Dropdown.Item>
            ))}
          </DropdownButton>
  
          {/* Search input field */}
          <Form.Control
            placeholder="Search for a title"
            aria-label="Search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)} 
          />
  
          {/* Search button */}
          <Button variant="outline-secondary" id="button-addon2" onClick={ () => {console.log('Button clicked'); 
            handleSearchClick();}}> 
            Search
          </Button>
        </InputGroup>
        

        <div>
            <InputGroup className="d-flex- justify-content-center">

              <p className="mx-3"><small>Filter results by:</small></p>

              <div className="form-check">

                <input 
                  type="checkbox" 
                  className="form-check-input me-2" 
                  id="movie"
                  >
                </input>
                <label className="form-check-label me-2" htmlFor="movieCheck"><small>Movie</small></label>

              </div>
              
              <div className="form-check">

                <input 
                  type="checkbox" 
                  className="form-check-input me-2" 
                  id="series"
                  >
                </input>
                <label className="form-check-label" htmlFor="seriesCheck"><small>Series</small></label>

              </div>
     
            
            </InputGroup>
            
      
        </div>
      </div>
    );
};

export default SearchBar; 
