from flask import Flask, jsonify, send_from_directory, request
import requests
import logging
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Active CORS pour toutes les origines, ajuste en prod

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Tes clés API (à garder secrètes en prod, ici juste pour l’exemple)
WEATHER_API_KEY = '38c9200d83e64ce2a8d114346252006'
NEWS_API_KEY = '387d7f38096c4df386a55848f9f0277c'

@app.route('/api/weather')
def weather():
    city = request.args.get('city', 'Paris')
    try:
        url = f'https://api.weatherapi.com/v1/current.json?key={WEATHER_API_KEY}&q={city}&aqi=no'
        response = requests.get(url)
        response.raise_for_status()
        logging.debug(f'Weather API response: {response.json()}')
        return jsonify(response.json())
    except requests.exceptions.HTTPError as http_err:
        logging.error(f'HTTP error occurred: {http_err}')
        return jsonify({'error': f'HTTP error occurred: {http_err}'}), 500
    except Exception as err:
        logging.error(f'Unexpected error: {err}')
        return jsonify({'error': f'Unexpected error: {err}'}), 500

@app.route('/api/news')
def news():
    try:
        url = f'https://newsapi.org/v2/everything?q=BFM&apiKey={NEWS_API_KEY}&language=fr'
        response = requests.get(url)
        response.raise_for_status()
        logging.debug(f'News API response: {response.json()}')
        return jsonify(response.json())
    except requests.exceptions.HTTPError as http_err:
        logging.error(f'HTTP error occurred: {http_err}')
        return jsonify({'error': f'HTTP error occurred: {http_err}'}), 500
    except Exception as err:
        logging.error(f'Unexpected error: {err}')
        return jsonify({'error': f'Unexpected error: {err}'}), 500

@app.route('/')
def serve_index():
    return send_from_directory('', 'index.html')

@app.route('/<path:path>')
def send_static(path):
    return send_from_directory('', path)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)
