import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

const About = () => (
    
    <div className="container px-4 pt-4 my-4">



        <h2 className="pb-2 border-bottom">User Guide <i className="bi bi-book mx-2"></i> </h2>
            
            <div className="row g-4 py-4 row-cols-1 row-cols-lg-3 my-1">

                <div className="col d-flex align-items-start">

                    <div className="icon-square text-body-emphasis bg-body-primary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
                    
                        <i className="bi bi-search"></i>
                    
                    </div>

                    <div>
                
                        <h3 className="fs-2 text-body-emphasis">Search for a title</h3>
                    
                        <p>Use the search bar on the home page to enter the name of the movie or series you're looking for.</p>
          
                    </div>
                </div>


                <div className="col d-flex align-items-start">

                    <div className="icon-square text-body-emphasis bg-body-primary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
                    
                        <i className="bi bi-check2-square"></i>
                    
                    </div>

                    <div>
                
                        <h3 className="fs-2 text-body-emphasis">Select your streaming services</h3>
                    
                        <p>Use the dropdown menu to the left of the search bar to select the streaming services you subscribe to.</p>
          
                    </div>
                </div>


                <div className="col d-flex align-items-start">

                    <div className="icon-square text-body-emphasis bg-body-primary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
                    
                        <i className="bi bi-chevron-double-down"></i>
                    
                    </div>

                    <div>
                
                        <h3 className="fs-2 text-body-emphasis">View your results</h3>
                    
                        <p>When you see the title you're looking for, click the "Show Availability" button to see if you can watch it on your services.</p>
          
                    </div>
                </div>


            </div>

            
            
            <div className="d-flex justify-content-center pt-3 align-items-center my-3">

                    <div className="card text-center rounded-3 w-75">
                        <h3 className="card-header fw-light mb-3">Scope</h3>
                        <p className="px-4">This project is limited to the following streaming services: </p>

                        <div className="container w-75 text-center">

                            <div className="row">
                                <div className="col">
                                    <h6>Apple TV+</h6>

                                </div>

                                <div className="col">
                                    <h6>Disney+</h6>

                                </div>

                                <div className="col">
                                    <h6>HBO Max</h6>
                                </div>
   

                            </div>

                            <div className="row">
                                <div className="col">
                                    <h6>Hulu</h6>
                                    
                                </div>  

                                <div className="col">
                                    <h6>Netflix</h6>
                                    

                                </div>  
                                <div className="col">
                                    <h6>Peacock</h6>
                                   
                                </div>  
                                
                            </div>

                            <div className="row mb-2">
                                <h6>Prime Video</h6>

                            </div>

                        </div>       

                        <p className="px-4">Availability shown is limited to the United States. "Add-on" services are not included.</p>
                    </div>
              
            </div>


    </div>
);

export default About;
