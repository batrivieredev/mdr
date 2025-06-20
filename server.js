const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Endpoint to fetch weather data from Météo France
app.get('/api/weather', async (req, res) => {
    try {
        const response = await axios.get('https://api.meteo.fr/api/weather?location=Paris');
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error fetching weather data');
    }
});

// Endpoint to fetch news data
app.get('/api/news', async (req, res) => {
    try {
        const response = await axios.get('https://newsapi.org/v2/top-headlines?country=fr&apiKey=YOUR_API_KEY');
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error fetching news data');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
