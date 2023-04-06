const formEl = document.querySelector('#search');

function handleSearch(event) {
    event.preventDefault();

    const city = event.target.elements.city.value;
    console.log(city);

    fetch('https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${5857003d2f4974079f0c443aac764ae3}&units=metric')
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error(error);
    });
}
formEl.addEventListener('submit', handleSearch);