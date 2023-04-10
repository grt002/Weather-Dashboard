const formEl = document.querySelector('#search');

const apiKey = "5857003d2f4974079f0c443aac764ae3";

function handleSearch(event) {
  event.preventDefault();

  const city = event.target.elements.city.value;
  console.log(city);

  // Store the searched city in local storage
  let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
  if (!searchHistory.includes(city)) {
    searchHistory.push(city);
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }

  // Current Weather Forecast
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => {
      console.log(data);

      const cityName = document.querySelector('#city-name');
      cityName.textContent = data.name;

      const date = document.querySelector('#date');
      const dateObj = new Date();
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      date.textContent = dateObj.toLocaleDateString('en-US', options);

      const icon = document.querySelector('#icon');
      icon.setAttribute('src', `http://openweathermap.org/img/w/${data.weather[0].icon}.png`);
      icon.setAttribute('alt', data.weather[0].description);

      const temperature = document.querySelector('#temperature');
      temperature.textContent = `Temperature: ${data.main.temp}°C`;

      const humidity = document.querySelector('#humidity');
      humidity.textContent = `Humidity: ${data.main.humidity}%`;

      const windSpeed = document.querySelector('#wind-speed');
      windSpeed.textContent = `Wind Speed: ${data.wind.speed}km/h`;

      // 5-Day Forecast
      fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          const forecastEl = document.querySelector('#forecast');
          forecastEl.innerHTML = '';
          const forecastList = data.list;
          for (let i = 0; i < forecastList.length; i += 8) {
            // Only display one forecast per day (data is provided every 3 hours)
            const forecast = forecastList[i];
            const forecastDate = new Date(forecast.dt * 1000);
            const forecastDateStr = forecastDate.toLocaleDateString('en-US', { weekday: 'long' });
            const forecastIcon = `http://openweathermap.org/img/w/${forecast.weather[0].icon}.png`;
            const forecastTemp = forecast.main.temp;
            const forecastWindSpeed = forecast.wind.speed;
            const forecastHumidity = forecast.main.humidity;
            const forecastItemEl = document.createElement('div');
            forecastItemEl.classList.add('forecast-item');
            forecastItemEl.innerHTML = `
            <div class="forecast-item__header">${forecastDateStr}</div>
            <img class="forecast-item__icon" src="${forecastIcon}" alt=${forecast.weather[0].description}">
            <div class="forecast-item__temp">Temperature: ${forecastTemp}°C</div>
            <div class="forecast-item__wind">Wind Speed: ${forecastWindSpeed}km/h</div>
            <div class="forecast-item__humidity">Humidity: ${forecastHumidity}%</div>
            `;
            forecastEl.appendChild(forecastItemEl);
          }
        })
        .catch(error => {
          console.error(error);
        });
    })
    .catch(error => {
      console.error(error);
    });
}
formEl.addEventListener('submit', handleSearch);

// Get the search history from Local Storage
const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

// Loop through the search history and create a button for each city
const searchHistoryEl = document.querySelector('#search-history');
searchHistory.forEach(city => {
    const buttonEl = document.createElement('button');
    buttonEl.textContent = city;
    searchHistoryEl.appendChild(buttonEl);

    // Add an event listener to each button
    buttonEl.addEventListener('click', () => {
        // When a button is clicked, call the handleSearch function with the city name
        handleSearch({ target: { elements: { city: { value: city } } } });
    });
});