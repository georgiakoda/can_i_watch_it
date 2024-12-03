import fetch from 'node-fetch';
import express from 'express';
import cors from 'cors';

const app = express();


//MOVE THESE TO .ENV FILE
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
const WATCHMODE_API_KEY = process.env.WATCHMODE_API_KEY; 
const API_URL = 'https://streaming-availability.p.rapidapi.com/shows/search/title';

app.use(express.json()); 

app.use(cors({
  origin: 'http://localhost:3000',
}));

// Movie of the night API endpoint for searching
app.get('/api/search', async (req, res) => {

  const { title, country = 'us', show_type } = req.query;

  if (!title) {
    return res.status(400).json({ error: 'Missing title in query' });
  }

  try {
    let externalApiUrl = `${API_URL}?title=${encodeURIComponent(title)}&country=${country}`;

    if (show_type) {
      externalApiUrl += `&show_type=${encodeURIComponent(show_type)}`;
    }
    
    const response = await fetch(externalApiUrl, {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': RAPIDAPI_KEY,
            'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com',
        },
    });

    if (!response.ok) {
        return res.status(response.status).json({ error: 'Error fetching data from the API' });
    }

    const data = await response.json();
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
    const watchmodeResponse = await fetch(watchmodeUrl, { method: 'GET' });

    if (!watchmodeResponse.ok) {
      return res.status(watchmodeResponse.status).json({ error: 'Error fetching data from Watchmode API' });
    }

    const watchmodeData = await watchmodeResponse.json();

    res.json(watchmodeData);

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
