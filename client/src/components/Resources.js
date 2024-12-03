import React from 'react';

const Resources = () => (
  <div className="container px-4 my-4 pt-4">
    <h2 className="pb-2 border-bottom">Resources <i className="bi bi-journal-text mx-2"></i></h2>

    {/* Accordion */}
    <div className="accordion" id="resourcesAccordion">
      
      {/* API Section */}
      <div className="accordion-item">
        <h2 className="accordion-header" id="apiSectionHeader">
          <button 
            className="accordion-button collapsed fs-4" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#apiSectionCollapse" 
            aria-expanded="false" 
            aria-controls="apiSectionCollapse"
          >
            APIs Used
          </button>
        </h2>
        <div 
          id="apiSectionCollapse" 
          className="accordion-collapse collapse show" 
          data-bs-parent="#resourcesAccordion"
        >
          <div className="accordion-body p-5 bg-body-tertiary rounded-3">
            <h4 className="pb-2 border-bottom">
              <span>
                <i className="bi bi-arrow-right fs-4 mx-2"></i>
              </span>
              Movie of the Night</h4>
              
            <p>This API is used for returning search results. Given a title, it returns a lot of information like...</p>
            <ul>
              <li>Release year</li>
              <li>A thumbnail image</li>
              <li>A description of the title</li>
              <li>Main cast</li>
              <li>Unique IMDB id (necessary for the second API)</li>
            </ul>
            <h5>Links</h5>
            <p>Rapid API: <a href="https://rapidapi.com/organization/movie-of-the-night">https://rapidapi.com/organization/movie-of-the-night</a></p>
            <p>Documentation: <a href="https://docs.movieofthenight.com/">https://docs.movieofthenight.com/</a></p>
            <br></br>

            <h4 className="pb-2 border-bottom">
            <span>
                <i className="bi bi-arrow-right fs-4 mx-2"></i>
              </span>
              Watchmode</h4>
            <p>This API is used for checking which streaming services have a given title available. This requires the IMDB id as a parameter. It returns streaming availability for a variety of countries but for this project I limited the scope to what's available in the US only.</p>
            <h5>Links</h5>
            <p>Documentation: <a href="https://api.watchmode.com/docs">https://api.watchmode.com/docs</a></p>
          </div>
        </div>
      </div>

      {/* Styling Info Section */}
      <div className="accordion-item">
        <h2 className="accordion-header" id="stylingSectionHeader">
          <button 
            className="accordion-button collapsed fs-4" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#stylingSectionCollapse" 
            aria-expanded="false" 
            aria-controls="stylingSectionCollapse"
          >
            Styling & Icons
          </button>
        </h2>
        <div 
          id="stylingSectionCollapse" 
          className="accordion-collapse collapse" 
          data-bs-parent="#resourcesAccordion"
        >
          <div className="accordion-body p-5 bg-body-tertiary rounded-3">
            <h4 className="pb-2 border-bottom">
            <span>
                <i className="bi bi-arrow-right fs-4 mx-2"></i>
              </span>Bootstrap</h4>
            <p>This project is styled predominantly with Bootstrap. Most icons and symbols featured are from the Bootstrap icon library.</p>
            <h5>Links</h5>
        
            <p>Documentation: <a href="https://getbootstrap.com/docs/">https://getbootstrap.com/docs/</a></p>
            <p>Icons: <a href="https://icons.getbootstrap.com/">https://icons.getbootstrap.com/</a></p>
            
            <br></br>
            <h4 className="pb-2 border-bottom">
            <span>
                <i className="bi bi-arrow-right fs-4 mx-2"></i>
              </span>Additional Icons</h4>
            <p>Icons for the different streaming services were downloaded from <a href="https://icons8.com/icons" className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">Icons8</a>.</p>
            
          </div>
        </div>
      </div>

      {/* Supabase Section */}
      <div className="accordion-item">
        <h2 className="accordion-header" id="databaseSectionHeader">
        <button 
            className="accordion-button collapsed fs-4" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#databaseSectionCollapse" 
            aria-expanded="false" 
            aria-controls="databaseSectionCollapse"
          >Database</button>
        </h2>

        <div 
          id="databaseSectionCollapse" 
          className="accordion-collapse collapse" 
          data-bs-parent="#resourcesAccordion">

            <div className="accordion-body p-5 bg-body-tertiary rounded-3">
              <h4>
              <span>
                <i className="bi bi-arrow-right fs-4 mx-2"></i>
              </span>
              Supabase</h4>

                <p>Database functionality for this project is handled with <a href="https://supabase.com/" className="link-primary link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">Supabase</a>. When a new user signs up, their username, e-mail address and unique ID are added to the project database. After creating an account, users can add titles to their Watchlist from the search page. The watchlist can be viewed and edited from the Watchlist page.</p>

            </div>

        </div>

      </div>

    </div>
  </div>
);

export default Resources;
