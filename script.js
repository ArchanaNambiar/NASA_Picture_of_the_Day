document.addEventListener("DOMContentLoaded", getCurrentImageOfTheDay);

// Get the current image of the day when the page loads
function getCurrentImageOfTheDay() {
    const currentDate = new Date().toISOString().split('T')[0];
    getImageOfTheDay(currentDate);
}

// Fetch and display the image of the day
function getImageOfTheDay(date) {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=70CqLBAxDewtahJbjtpu8jINu4y0DNiivwVW3ZEO&date=${date}`)
        .then(response => response.json())
        .then(data => {
            displayImageData(data);
            saveSearch(date);
        })
        .catch(error => console.error(error));
}

// Display image data in the UI
function displayImageData(data) {
    const container = document.getElementById("current-image-container");
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    var npd = 'Picture On '+data.date

    today = yyyy + '-' + mm + '-' + dd;
    if (data.date == today){
        npd = "NASA Picture of the Day"
    }

    container.innerHTML = `
        <h2 class="npd">${npd}</h2>
        <img src="${data.url}" alt="${data.title}" />
        <h2>${data.title}</h2>
        <p>${data.explanation}</p>
    `;
}

// Save a date to local storage
function saveSearch(date) {
    const searches = JSON.parse(localStorage.getItem("searches")) || [];
    searches.push(date);
    localStorage.setItem("searches", JSON.stringify(searches));
    addSearchToHistory(date);
}

// Display search history in the UI
function addSearchToHistory(date) {
    const historyList = document.getElementById("search-history");
    const listItem = document.createElement("li");
    listItem.textContent = date;
    listItem.addEventListener("click", () => getImageOfTheDay(date));
    historyList.appendChild(listItem);
}

// Handle form submission
document.getElementById("search-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const date = document.getElementById("search-input").value;
    getImageOfTheDay(date);
});
