document.getElementById('weather-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const location = document.getElementById('location').value.trim();
    if (!location) {
        alert('Please enter a location.');
        return;
    }

    const apiUrl = `http://www.7timer.info/bin/civil.php?lon=0&lat=0&product=civil&output=json&tzshift=0&location=${location}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Error fetching weather data. Please try again.');
    }
});

function displayWeather(data) {
    const weatherInfo = document.getElementById('weather-info');
    const location = data.meta.location.name;
    const weather = data.dataseries[0].weather;
    const temperature = data.dataseries[0].temp2m;

    weatherInfo.innerHTML = `
        <p>Location: ${location}</p>
        <p>Weather: ${weather}</p>
        <p>Temperature: ${temperature}°C</p>
    `;
}
