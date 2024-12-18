# Can I Watch It?

## Description
"Can I Watch It?" is a web application that helps users find out whether a movie or TV show is available on their selected streaming services. Users can sign up for an account, search for titles, and save their favorite ones to a watchlist for future reference.

## Features
- **Search**: Search for movies and TV shows using the title and select your streaming services. Results include streaming availability across selected services.
- **Account Management**: Users can sign up, log in, and manage their watchlist.
- **Watchlist**: Save and manage titles you want to watch later.
- **Responsive Design**: Built with React and Bootstrap for an intuitive and responsive UI.

## Tech Stack
- **Frontend**: React, Bootstrap
- **Backend**: Node.js, Express
- **Database**: Supabase

- **APIs**: 
  - [Movie of the Night](https://rapidapi.com/organization/movie-of-the-night)
  - [Watchmode](https://www.watchmode.com/)

## Setup Instructions
1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/can-i-watch-it.git
   cd can-i-watch-it

2. Install dependencies for the server and client:
    **Install server dependencies**
    cd server
    npm install

    **Install client dependencies**
    cd ../client
    npm install

3. Create a .env file in the server directory with the following variables:
    RAPIDAPI_KEY=your_movie_of_the_night_api_key
    WATCHMODE_API_KEY=your_watchmode_api_key
    SUPABASE_URL=your_supabase_url
    SUPABASE_KEY=your_supabase_key

4. Run the application
    **Start the backend server**
    cd server
    npm start

    **Start the frontend**
    cd ../client
    npm start

## Limitations
    - API keys are required to use the app but are not included in the repository for security reasons.
    - The app currently supports streaming availability in the US region only.