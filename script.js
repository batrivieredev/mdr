document.addEventListener('DOMContentLoaded', function() {
    fetchWeather();
    fetchNews();

    // Search functionality
    document.getElementById('searchButton').addEventListener('click', function() {
        const query = document.getElementById('searchInput').value;
        fetchGoogleResults(query);
    });
});

function fetchWeather() {
    fetch('/api/weather?city=Rennes')  // Ensure this endpoint is correct
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const weatherDiv = document.getElementById('weather');
            if (data.error) {
                weatherDiv.innerHTML = `<div class="alert alert-danger">${data.error}</div>`;
            } else {
                weatherDiv.innerHTML = `
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Météo à ${data.location.name}</h5>
                            <p class="card-text">Température: ${data.current.temp_c} °C</p>
                            <p class="card-text">Condition: ${data.current.condition.text}</p>
                            <img src="${data.current.condition.icon}" alt="${data.current.condition.text}" class="img-fluid">
                        </div>
                    </div>
                `;
            }
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données météo:', error);
            document.getElementById('weather').innerHTML = `<div class="alert alert-danger">Erreur lors de la récupération des données météo.</div>`;
        });
}

function fetchNews() {
    fetch('/api/news')  // Ensure this endpoint is correct
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const newsDiv = document.getElementById('news');
            newsDiv.innerHTML = '';
            data.articles.forEach(article => {
                newsDiv.innerHTML += `
                    <div class="col-md-4 mb-3">
                        <div class="card">
                            <img src="${article.urlToImage}" class="card-img-top" alt="${article.title}">
                            <div class="card-body">
                                <h5 class="card-title">${article.title}</h5>
                                <p class="card-text">${article.description}</p>
                                <button class="btn btn-primary" onclick="openArticle('${article.url}')">Lire plus</button>
                            </div>
                        </div>
                    </div>
                `;
            });
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des actualités:', error);
            document.getElementById('news').innerHTML = `<div class="alert alert-danger">Erreur lors de la récupération des actualités.</div>`;
        });
}

function openArticle(url) {
    // Open the article in a new page on your site
    const articleWindow = window.open('', '_self');
    articleWindow.document.write('<h1>Article</h1>');
    articleWindow.document.write('<iframe src="' + url + '" style="width:100%; height:100vh;" frameborder="0"></iframe>');
}

function fetchGoogleResults(query) {
    // Fetch Google search results and display them on the site
    fetch(`https://www.googleapis.com/customsearch/v1?key=YOUR_API_KEY&cx=YOUR_CX&q=${encodeURIComponent(query)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Log the response for debugging
            const resultsDiv = document.getElementById('news');
            resultsDiv.innerHTML = '';
            data.items.forEach(item => {
                resultsDiv.innerHTML += `
                    <div class="col-md-4 mb-3">
                        <div class="card">
                            <img src="${item.pagemap.cse_image[0].src}" class="card-img-top" alt="${item.title}">
                            <div class="card-body">
                                <h5 class="card-title">${item.title}</h5>
                                <p class="card-text">${item.snippet}</p>
                                <a href="${item.link}" class="btn btn-primary" target="_blank">Lire plus</a>
                            </div>
                        </div>
                    </div>
                `;
            });
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des résultats de recherche:', error);
            document.getElementById('news').innerHTML = `<div class="alert alert-danger">Erreur lors de la récupération des résultats de recherche.</div>`;
        });
}
