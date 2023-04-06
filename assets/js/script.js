const formEl = document.querySelector('#search');

function handleSearch(event) {
    event.preventDefault();
    const city = event.target.elements.city.value;
    console.log(city);
}
formEl.addEventListener('submit', handleSearch);