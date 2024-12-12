import fetch from 'node-fetch';
import express from 'express';
import cors from 'cors';

// For hiding API keys
import dotenv from 'dotenv';
dotenv.config(); 
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
const WATCHMODE_API_KEY = process.env.WATCHMODE_API_KEY;

const app = express();

app.use(express.json()); 

const corsOptions = {
  origin: 'http://localhost:3000', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-requested-with'], 
  preflightContinue: true, 
  optionsSuccessStatus: 204, 
};

app.use(cors(corsOptions));

// Movie of the night API endpoint for searching
app.get('/api/search', async (req, res) => {

  const { title, country = 'us' } = req.query;

  if (!title) {
    return res.status(400).json({ error: 'Missing title in query' });
  }

  const url = `https://streaming-availability.p.rapidapi.com/shows/search/title?country=${country}&title=${title}`;
  
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': RAPIDAPI_KEY,
      'x-rapidapi-host': 'streaming-availability.p.rapidapi.com'
    }
  };

  try {

    const response = await fetch(url, options);
	  const data = await response.json();
    
    //console.log("Response status:", response.status);

    if (!response.ok) {
        return res.status(response.status).json({ error: 'Error fetching data from the API' });
    }

    res.json(data); 
    
  } catch (error) {
      console.error('API Fetch Error:', error);
      res.status(500).json({ error: 'Internal server error' });
  }

});


// Watchmode API endpoint for streaming availability
app.get('/api/watchmode-sources', async (req, res) => {
  const { imdbID } = req.query;


  if (!imdbID) {
    return res.status(400).json({ error: 'Missing imdbId in query' });
  }

  const watchmodeUrl = `https://api.watchmode.com/v1/title/${imdbID}/sources/?apiKey=${WATCHMODE_API_KEY}&regions=US`;

  try {

    // I'm using .then() because that's how the API docs did it in their example and I don't want to freestyle
    fetch(watchmodeUrl, { method: 'GET' })
      .then((watchmodeResponse) => {
        if (!watchmodeResponse.ok) {
          return res.status(watchmodeResponse.status).json({ error: 'Error fetching data from Watchmode API' });
        }
        return watchmodeResponse.json(); 
      })
      .then((watchmodeData) => {
        res.json(watchmodeData); 
      })
      .catch((error) => {
        console.error('Watchmode API Fetch Error:', error);
        res.status(500).json({ error: 'Internal server error' });
      });
    
  } catch (error) {
    console.error('Watchmode API Fetch Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//Supabase API endpoint for user signup
app.post('/api/signup', async (req, res) => {
  const { email, username, password } = req.body;

  const { data, error } = await supabase
      .from('userInfo')
      .insert([
          { email, username, password }
      ]);

  if (error) {
      return res.status(500).json({ error: error.message });
  }

  res.status(200).json({ message: 'User created successfully', data });
});


const port = 5001;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
