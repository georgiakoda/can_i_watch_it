import 'bootstrap-icons/font/bootstrap-icons.css';
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient'; 

const Watchlist = ({ services }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [watchlist, setWatchlist] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  // Function to delete when the modal pops up
  const handleDeleteClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Function to handle item deletion
  const handleConfirmDelete = async () => {
    if (!selectedItem) return;

    console.log('Deleting item:', selectedItem);

    try {
      // Get the current user
      const { data: { user }, error: authError } = await supabase.auth.getUser();
  
      if (authError || !user) {
        setErrorMessage("Error: Unable to identify the user.");
        console.error(authError);
        return;
      }
  
      // Fetch the current watchlist
      const { data: userInfo, error: fetchError } = await supabase
        .from('userInfo')
        .select('watchlist')
        .eq('id', user.id)
        .single();
  
      if (fetchError) {
        setErrorMessage("Error fetching watchlist data.");
        console.error(fetchError);
        return;
      }
  
      const currentWatchlist = userInfo?.watchlist || [];
  
      // Remove the selected item
      const updatedWatchlist = currentWatchlist.filter(
        (item) => item.title !== selectedItem.title
      );
  
      // Update the watchlist in the database
      const { error: updateError } = await supabase
        .from('userInfo')
        .update({ watchlist: updatedWatchlist })
        .eq('id', user.id);
  
      if (updateError) {
        setErrorMessage("Error updating watchlist.");
        console.error(updateError);
        return;
      }
  
      // Update the local state
      setWatchlist(updatedWatchlist);
      setSelectedItem(null);
      setIsModalOpen(false);
    } catch (error) {
      setErrorMessage("Unexpected error occurred.");
      console.error(error);
    }
    //closeModal(); 

  };

  useEffect(() => {


    const fetchWatchlist = async () => {

      setIsLoading(true);
      

      try {
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError) {
          setErrorMessage("Error fetching user data.");
          console.error(authError);
          return;
        }

        if (user) {
          setIsUserLoggedIn(true); // User is logged in
          try {
            const { data: userInfo, error } = await supabase
              .from('userInfo')
              .select('watchlist')
              .eq('id', user.id)
              .single(); 

            if (error) {
              setErrorMessage("Error fetching watchlist");
              console.error(error);
            } else {
              setWatchlist(userInfo?.watchlist || []); // Set the watchlist or empty array
            }
          } catch (error) {
            setErrorMessage("Error fetching user data.");
            console.error(error);
          }
        } else {
          setIsUserLoggedIn(false); // User is not logged in
        }
      } catch (error) {
        setErrorMessage("Unexpected error occurred.");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWatchlist();

    
  }, []);

  

    return (
        <div className="container px-4 pt-4 my-4">

            <h2 className="pb-2 border-bottom">My Watchlist <span><i className="bi bi-stars px-1 text-warning"></i></span></h2>
            
            <div className="p-5 bg-body-tertiary rounded-3 my-4">
              
              {isLoading ? (

                  <div className="d-flex justify-content-center align-items-center">

                    {/* Loading Spinner */}
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                
                  </div>

              ) : !isUserLoggedIn ? (

                <h5 className="fw-light">Log in to view or edit your watchlist.</h5>

              ) : watchlist.length === 0 ? (

                <div>
                  <h4 className="fw-light">Your watchlist is empty</h4>
                </div>
          
              ) : (
                
                <ul className="list-group">
                  
                  {/* Item Display */}
                  {watchlist.map((item, index) => (
              
                  <li key={index} className="list-group-item list-group-item-action d-flex align-items-center">
                    {item.verticalPoster && (
                      <img
                        src={item.verticalPoster}
                        alt={`${item.title} Poster`}
                        width="100"
                        className="me-3 my-2"
                      />
                    )}

                    {/* Delete Button & Other Text */}
                    <div>
                      <div className="d-flex justify-content-end" onClick={() => handleDeleteClick(item)}>
                        <i className="bi bi-trash3 text-danger"></i>
                      </div>

                      <h5>{item.title} ({item.year})</h5>
                      <p>{item.overview}</p>
                    </div>

                  </li>
                ))}
              </ul>
              )}
          </div>

          {/* Delete Popup */}
          {isModalOpen && (
            <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content shadow-lg">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="staticBackdropLabel">Remove from Watchlist</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeModal}></button>
                  </div>
                  <div className="modal-body">
                    <p>Are you sure you want to delete <strong>{selectedItem?.title}</strong> from your watchlist?</p>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={closeModal}> Cancel </button>
                    <button type="button" className="btn btn-danger" onClick={handleConfirmDelete}>Delete</button>
                  </div>
                </div>
             </div>
            </div>
          )}
        </div>
    );
}

export default Watchlist;