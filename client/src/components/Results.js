import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient'; 

const Results = ({ searchData, selectedServices, services, user, watchlist, setWatchlist }) => {
  

    const [searchResults, setSearchResults] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showServices, setShowServices] = useState({});
    const [availabilityResults, setAvailabilityResults] = useState({}); 
    const [errorMessage, setErrorMessage] = useState("");
    const [successAlert, setAlertMessage] = useState("");
    const [alreadyOnListMessage, setAlreadyOnListMessage] = useState("");



    useEffect(() => {

      if (!services) {

        return <div>Error: Services data is missing.</div>;
      }

        const fetchResults = async () => {

          console.log("fetchResults called with:", searchData);

          setLoading(true);
          setError('');

          const { query } = searchData;
          if (!query) return; 

          try {

            // Build the API URL dynamically based on the filters
            let apiUrl = `http://localhost:5001/api/search?title=${encodeURIComponent(query)}`;

            //console.log("Base API URL:", apiUrl);


            //console.log("Fetching from API with URL:", apiUrl);
            const response = await fetch(apiUrl);
            const data = await response.json();


            // Parses results from Movie of the Night for display
            if (Array.isArray(data) && data.length > 0) {
              const parsedResults = data.filter((item) => 
                item.overview && item.overview.trim() !== "" &&
                Object.keys(item.streamingOptions).length > 0
              ).map((item) => ({
                  title: item.title,
                  year: item.firstAirYear || item.releaseYear || "N/A",
                  overview: item.overview,
                  verticalPoster: item.imageSet?.verticalPoster?.w240,
                  imdbID: item.imdbId,
              }));

              setSearchResults(parsedResults);

            } else {
                setError('No results found');
            }
            
          } catch (err) {

            setError('Network error occurred');
            console.error(err);

          } finally {
            setLoading(false);
          }
        };
    
        fetchResults();
      }, [searchData, selectedServices, services]); 
    

      if (loading) return <p>Loading...</p>;
      if (error) return <p>{error}</p>;

      // Uses Watchmode API to get available streaming services for a given IMDB id
      const checkWatchmodeAvailability = async (imdbID, labels) => {
        const watchmodeUrl = `http://localhost:5001/api/watchmode-sources?imdbID=${imdbID}`;
    
        try {
          const watchmodeResponse = await fetch(watchmodeUrl, { method: 'GET' });
          
          if (!watchmodeResponse.ok) {
            throw new Error('Error fetching data from Watchmode API');
          }

          const watchmodeData = await watchmodeResponse.json();
    
          const availableSourceIDs = watchmodeData.map(item => item.source_id);
    
          const result = {};
          labels.forEach(label => {
            const service = services.find(service => service.label === label);
            if (service) {
              result[label] = availableSourceIDs.includes(service.wmID);
            } else {
              result[label] = false;
            }
          });
    
          return result;
    
        } catch (error) {
          console.error('Watchmode API Fetch Error:', error);
          return { error: 'Internal server error' };
        }
      };

      // The purpose of this is to limit Watchmode API calls.
      // Otherwise the API would be called for each displayed result. Which is bad.
      const toggleShowServices = async (imdbID, servicesList) => {
        setShowServices((prev) => ({
          ...prev,
          [imdbID]: !prev[imdbID],
        }));
        
        const availability = await checkWatchmodeAvailability(imdbID, servicesList);
        setAvailabilityResults(prev => ({
          ...prev,
          [imdbID]: availability,
        }));

      };


      const addToWatchlist = async (item) => {

        if (!user) {
          setErrorMessage("You must be logged in to add items to your watchlist.");
          return;
        }

        const newItem = {
          imdbID: item.imdbID,
          title: item.title,
          year: item.year,
          overview: item.overview,
          verticalPoster: item.verticalPoster,
          services: selectedServices, 
        };



        try {
          // Fetch the current watchlist from Supabase for the logged-in user
          const { data: userInfo, error: fetchError } = await supabase
            .from('userInfo')
            .select('watchlist')
            .eq('id', user.id)
            .single(); 
      
          if (fetchError) {
            console.error("Error fetching user data:", fetchError);
            setErrorMessage("Error fetching user data.");
            return;
          }
      
          const existingWatchlist = userInfo?.watchlist || [];
      
          // Check if the item is already in the watchlist
          if (!existingWatchlist.some((watchlistItem) => watchlistItem.imdbID === item.imdbID)) {
            // Append the new item to the watchlist
            const updatedWatchlist = [...existingWatchlist, newItem];
      
            // Update the watchlist in the database
            const { data, error } = await supabase
              .from('userInfo')
              .update({ watchlist: updatedWatchlist })
              .eq('id', user.id)
              .select('watchlist');

      
            if (error) {
              console.error("Error updating watchlist:", error);
              setErrorMessage("Error adding item to watchlist.");
            } else {

              setWatchlist(updatedWatchlist);
              setAlertMessage("Item successfully added to your watchlist!");
        
            }
          } else {

 
            setAlreadyOnListMessage("This item is already on your watchlist.")
            setAlertMessage("");
            //console.log("Item already in watchlist");

          }
        } catch (error) {
          console.error("Error adding to watchlist:", error);
          setErrorMessage("Error adding item to watchlist.");
        }

      };


    return (

        <div className="container my-5">
          
          {/* Error Alert */}
          {errorMessage && (
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
              <i className="bi bi-exclamation-triangle-fill"></i> {errorMessage}
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
                onClick={() => setErrorMessage("")}
              ></button>
            </div>
          )}

          {/* Added to Watchlist Alert */}
          {successAlert && (
            <div className="alert alert-success alert-dismissible fade show" role="alert"> 
              {successAlert}
              <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setAlertMessage("")}></button>
            </div>
          )}

          {/* Already in Watchlist Alert */}
          {alreadyOnListMessage && (
            <div className="alert alert-warning alert-dismissible fade show" role="alert">
              {alreadyOnListMessage}
              <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setAlreadyOnListMessage("")}></button>
            </div>
            )}


            <div className="p-5 bg-body-tertiary rounded-3">

                <h3 className="text-body-emphasis fw-light">Results</h3>

                {searchResults.length > 0 ? (

                  <ul className="list-group">

                    {/* Result Begin */}
                    {searchResults.map((result, index) => (

                      <li key={index} href="#" className="list-group-item d-flex align-items-center">
                        
                       {result.verticalPoster && (
                          <img
                            src={result.verticalPoster}
                            alt={`${result.title} Poster`}
                            width="100"
                            className="me-3"
                          />
                        )}

                      
                      <div className="flex-grow-1">
                          <h5> {result.title} ({result.year})</h5>
                          <p>{result.overview}</p>

                          <div className="d-flex justify-content-end align-items-center">


                            {/* Add to Watchlist Button */}
                            <button type="button" className="btn text-bg-light d-flex align-items-center mx-3" onClick={() => addToWatchlist(result)}>
                              Add to Watchlist
                              <i className="bi bi-star-fill text-warning mx-2"></i>
                            </button>


                            {/* Show/Hide Streaming Services Button */}
                            <button
                              type="button"
                              className="btn text-bg-light d-flex align-items-center mx-3"
                              onClick={() => toggleShowServices(result.imdbID, selectedServices)}
                            >
                              {showServices[result.imdbID] ? "" : "Show Availability"}
                              <i className="bi bi-tv text-primary mx-2"></i>
                            </button>


                            {/* Streaming Services Icons */}
                            {showServices[result.imdbID] && (

                            <div className="d-flex flex-wrap justify-content-end mx-3">

                              <span className="badge text-bg-light d-flex align-items-center">

                                {selectedServices.map((serviceName, idx) => {

                                const service = services.find((s) => s.label === serviceName);
                                if (!service) return null;

                                const isAvailable = availabilityResults[result.imdbID]?.[serviceName];

                                return (
                                <div key={idx} className="d-flex align-items-center me-4">
                                  <img
                                    src={service.imageSrc}
                                    alt={service}
                                    width="22"
                                    className="me-2"
                                  />
                                  
                                  {isAvailable !== undefined && (
                                  <i className={`bi ${isAvailable ? 'bi-check-circle-fill text-success' : 'bi bi-x-circle-fill text-danger'}`}></i>
                                )}

                                </div>
                                );
                                })}
                              </span>
                            </div>
                            )}              
                          </div>
                        </div>    
                      </li>
                    ))}
                  </ul>
               ) : (
                <p>No results found.</p>
              )}

            </div>

        </div>

    );
    
};

export default Results;
