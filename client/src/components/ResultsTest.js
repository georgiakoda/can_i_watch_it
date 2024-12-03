import React, { useState } from 'react';
import Header from './Header';



const ResultsTest = ({ services }) => {

    const [showServices, setShowServices] = useState({});
    const [availabilityResults, setAvailabilityResults] = useState({});

    async function checkWatchmodeAvailability(imdbID, labels) {
      const watchmodeUrl = `http://localhost:5001/api/watchmode-sources?imdbID=${imdbID}`;
    
      try {
        // Fetch data from Watchmode API
        const watchmodeResponse = await fetch(watchmodeUrl, { method: 'GET' });
        if (!watchmodeResponse.ok) {
          throw new Error('Error fetching data from Watchmode API');
        }
    
        const watchmodeData = await watchmodeResponse.json();
        
        // Extract source_id from API response
        const availableSourceIDs = watchmodeData.map(item => item.source_id);
    
        // Check for matches and build the result object
        const result = {};
        labels.forEach(label => {
          const service = services.find(service => service.label === label);
          if (service) {
            result[label] = availableSourceIDs.includes(service.wmID);
          } else {
            result[label] = false; // Label not found in services array
          }
        });
    
        return result;
    
      } catch (error) {
        console.error('Watchmode API Fetch Error:', error);
        return { error: 'Internal server error' };
      }
    }

    const sampleResults = [
        {
          year: 2007,
          title: "Bridge to Terabithia",
          imdbID: "tt0398808",
          overview: "A boy from the wrong side of the tracks befriends the new girl at school. Together, they create an imaginary world that helps them overcome their fears in the real world.",
          services: ["Hulu", "Netflix"],
          verticalPoster: "https://cdn.movieofthenight.com/show/2879/poster/vertical/en/240.jpg?Expires=1749505343&Signature=Mh~KNQOHgNDDBz-v0K8wru-XjAqoUYDWL7OmoLMNNRBE3EspExsHTjpbgLswkG1hX93KBCbp4A0HAe2qP0LzILVUY5AkSBScGCm2u~QnWv2qtnAaMFB5pDS~ncwVhEkEshMbJPEl8v9N52B1NnCPDC-UOXWxvxw4wO1R~ZgkzGgUThrGxpzfWLhWPP0h8pZzdk9QP-RzGQOgfZ0EQavJbz50bpUbkIGpjZTOLCiJ1FQ5jos-CQkeHS40QYYPKP0x8XtNFU6iogDJ4aEmL~4yUA1oFGmb2nxcW90gESOxxrpFrNKjr30tKfj3ckW0n80ElWEIX4J-FI9piapCTeENDw__&Key-Pair-Id=KK4HN3OO4AT5R"
        },

        {
          year: 2000,
          title: "Gladiator",
          imdbID: "tt0172495",
          overview: "Drawing its inspiration from Anthony Mann's 'The Fall of the Roman Empire' (1964) and Stanley Kubrick's 'Spartacus' (1960), Ridley Scott's Oscar-winning take on the Roman epic lavishes the genre with the very latest in computer-generated effects technology.",
          services: ["Hulu", "Netflix"],
          verticalPoster: "https://cdn.movieofthenight.com/show/96/poster/vertical/en/240.jpg?Expires=1749523134&Signature=hza4tb-3iLdhi7Ld3KbtFhFN0-kEtV3wZjPrjYwaev-jRowm4sft~t50d6Y1Fykmt9n9zTZWrijWbHgBgx-GHDSdSJC7IOx7AoGuQwMci6Oqlv3~DVq1-gK7pavNEKQ6PAQ21YVG9ZNN-H4ZnHoYOoLqhRPNGwYCkTaEiNJTozABz9PEHIOWMSQfoMTww9ANcBYddRVQLkhMq8oWVXMztBZobTqICF~0JdAVlaV27C7sufqQdLXwFjRo6grQrzXgl5paQPObppAjCHOZQC~fxxOYK5ElK4u5Ni~BZrbO-N4yo55HoIIByYET4jvPeDFylHeG6dvaFh5RfYu-4Y4vDQ__&Key-Pair-Id=KK4HN3OO4AT5R"
        }

      ];

      const toggleShowServices = async (imdbID, servicesList) => {
        setShowServices((prev) => ({
          ...prev,
          [imdbID]: !prev[imdbID], // Toggle visibility for the specific movie/show
        }));

        // Fetch the availability results for the clicked movie/show
        const availability = await checkWatchmodeAvailability(imdbID, servicesList);

        setAvailabilityResults((prev) => ({
          ...prev,
          [imdbID]: availability,
        }));
      };
  

   
    return (

      
        <div className="container my-5">

          <Header services={services} onSearch={() => {}} />
            
            <div className="p-5 bg-body-tertiary rounded-3">

                <h3 className="text-body-emphasis fw-light">Results</h3>

                {sampleResults.length > 0 ? (
          <ul className="list-group">

            {/* Result Begin */}
            {sampleResults.map((result, index) => (

              <li key={index} href="#" className="list-group-item d-flex align-items-center py-3">

                {result.verticalPoster && (
                  <img
                    src={result.verticalPoster}
                    alt={`${result.title} Poster`}
                    width="100"
                    className="me-3"
                  />
                )}

                <div className="flex-grow-1">
                  <h5>{result.title} ({result.year})</h5>
                  <p>{result.overview}</p>

                  <div className="d-flex justify-content-end align-items-center">
                    {/* Add to Watchlist Button */}
                    <button type="button" className="btn text-bg-light d-flex align-items-center mx-3">
                      Add to Watchlist
                      <i className="bi bi-star-fill text-warning mx-2"></i>
                    </button>

                    {/* Show/Hide Streaming Services Button */}
                    <button 
                        type="button" 
                        className="btn text-bg-light d-flex align-items-center mx-3" 
                        onClick={() => toggleShowServices(result.imdbID, result.services)}>

                      {showServices[result.imdbID] ? "" : "Show Streaming Services"}
                      <i className="bi bi-tv text-primary mx-2"></i>
                    </button>

                    {/* Streaming Services Icons */}
                    {showServices[result.imdbID] && result.services.length > 0 && (
                      <div className="d-flex flex-wrap justify-content-end mx-3">
                        <span className="badge text-bg-light d-flex align-items-center">
                          {result.services.map((service, idx) => {

                            // Find the service icon from services list
                            const serviceIcon = services.find(s => s.label === service);
                            if (!serviceIcon) return null;

                            const isAvailable = availabilityResults[result.imdbID]?.[service];

                            return (
                              <div key={idx} className="d-flex align-items-center me-4">
                                <img
                                  src={serviceIcon.imageSrc}
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

export default ResultsTest;
