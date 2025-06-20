from flask import Flask, jsonify, send_from_directory, request
import requests
import logging

app = Flask(__name__)

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Replace with your actual OpenWeatherMap API key
WEATHER_API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY'

# Endpoint to fetch weather data from OpenWeatherMap
@app.route('/api/weather')
def weather():
    city = request.args.get('city', 'Paris')  # Default to Paris if no city is provided
    try:
        response = requests.get(f'https://api.openweathermap.org/data/2.5/weather?q={city}&appid={WEATHER_API_KEY}&lang=fr&units=metric')
        response.raise_for_status()  # Raise an error for bad responses
        logging.debug(f'Weather API response: {response.json()}')  # Log the response
        return jsonify(response.json())
    except requests.exceptions.HTTPError as http_err:
        logging.error(f'HTTP error occurred: {http_err}')  # Log the error
        return jsonify({'error': f'HTTP error occurred: {http_err}'}), 500
    except Exception as err:
        logging.error(f'An error occurred: {err}')  # Log the error
        return jsonify({'error': f'An error occurred: {err}'}), 500

# Endpoint to fetch news data from BFM TV
@app.route('/api/news')
def news():
    api_key = 'YOUR_API_KEY'  # Replace with your actual API key
    response = requests.get(f'https://newsapi.org/v2/everything?q=BFM&apiKey={api_key}&language=fr')
    return jsonify(response.json())

# Serve static files
@app.route('/')
def serve_index():
    return send_from_directory('', 'index.html')

@app.route('/<path:path>')
def send_static(path):
    return send_from_directory('', path)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)  # Changed port to 5001
