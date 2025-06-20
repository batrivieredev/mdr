// Function to fetch weather data from OpenWeatherMap
async function fetchWeather(city = 'Paris') {
    const response = await fetch(`/api/weather?city=${city}`);
    const data = await response.json();
    if (data.cod === 200) {
        document.getElementById('weather-info').innerText = `Température: ${data.main.temp}°C, Temps: ${data.weather[0].description}`;
    } else {
        document.getElementById('weather-info').innerText = 'Erreur lors de la récupération des données météo.';
    }
}

// Function to fetch news data from BFM TV
async function fetchNews() {
    const response = await fetch('/api/news');
    const data = await response.json();
    const newsContainer = document.getElementById('news-info');
    newsContainer.innerHTML = '';
    data.articles.forEach(article => {
        const div = document.createElement('a');
        div.className = 'list-group-item list-group-item-action';
        div.innerHTML = `<h5 class="mb-1">${article.title}</h5><p class="mb-1">${article.description}</p>`;
        div.href = article.url; // Link to the article
        newsContainer.appendChild(div);
    });
}

// Function to perform search
async function performSearch() {
    const query = document.getElementById('search').value;
    const response = await fetch(`/api/news?q=${query}`);
    const data = await response.json();
    const newsContainer = document.getElementById('news-info');
    newsContainer.innerHTML = '';
    data.articles.forEach(article => {
        const div = document.createElement('a');
        div.className = 'list-group-item list-group-item-action';
        div.innerHTML = `<h5 class="mb-1">${article.title}</h5><p class="mb-1">${article.description}</p>`;
        div.href = article.url; // Link to the article
        newsContainer.appendChild(div);
    });
}

// Initial fetch calls
fetchWeather();
fetchNews();

// Set interval to update weather every minute
setInterval(fetchWeather, 60000);
