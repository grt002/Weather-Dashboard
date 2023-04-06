const formEl = document.querySelector('#search');

const apiKey = "5857003d2f4974079f0c443aac764ae3";

function handleSearch(event) {
    event.preventDefault();

    const city = event.target.elements.city.value;
    console.log(city);

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => {
        console.log(data);

        const cityName = document.querySelector('#city-name');
        cityName.textContent = data.name;

        const date = document.querySelector('#date');
        const dateObj = new Date();
        const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        date.textContent = dateObj.toLocaleDateString('enUS', options);
        
        const icon = document.querySelector('#icon');
        icon.setAttribute('src', `http://openweathermap.org/img/w/${data.weather[0].icon}.png`);
        icon.setAttribute('alt', data.weather[0].description);

        const temperature = document.querySelector('#temperature');
        temperature.textContent = `Temperature: ${data.main.temp}°C`;

        const humidity = document.querySelector('#humidity');
        humidity.textContent = `Humidity: ${data.main.humidity}%`;

        const windSpeed = document.querySelector('wind-speed');
        windSpeed.textContent = `Wind Speed: ${data.wind.speed}km/h`;
    })
    .catch(error => {
        console.error(error);
    });
}
formEl.addEventListener('submit', handleSearch);