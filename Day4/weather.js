function fetchWeather(city) {
  fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}`)
    .then(response => response.json())
    .then(data => {
      if (data.results && data.results.length > 0) {
        const loc = data.results[0];
        const { latitude, longitude } = loc;

        return fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
      }
    })
    .then(response => response ? response.json() : null)
    .then(dataWeather => {
      if (dataWeather && dataWeather.current_weather) {
        const { temperature, windspeed, weathercode } = dataWeather.current_weather;
        document.getElementById("location-name").textContent = city;
        document.getElementById("temp").textContent = temperature;
        document.getElementById("wind").textContent = windspeed;
        updateBackground(weathercode);

        updateHistory(city);
      }
    })
}
function updateBackground(weatherCode) {
  const body = document.body;
  const backgrounds = {
    0: 'ritam-baishya-ROVBDer29PQ-unsplash.jpg', // trời quang
    1: 'istockphoto-1222088912-612x612', // mây
    2: 'daoudi-aissa-Pe1Ol9oLc4o-unsplash.jpg', // mây nhiều
    3: 'image.png', // mưa nhẹ
  };
  const bgUrl = backgrounds[weatherCode] || 'ritam-baishya-ROVBDer29PQ-unsplash.jpg';
  body.style.backgroundImage = `url(${bgUrl})`;
  body.style.backgroundSize = 'cover';
  body.style.backgroundPosition = 'center';
}
document.getElementById("search-form").addEventListener("submit", function(e) {
  e.preventDefault();
  const city = document.getElementById("location-input").value.trim();
  if (city) {
    fetchWeather(city);
    document.getElementById("location-input").value="";
  }
});
function updateHistory(city) {
  let history=JSON.parse(localStorage.getItem("searchHistory")) || [];
  if (!history.includes(city)) {
    history.push(city);
    localStorage.setItem("searchHistory",JSON.stringify(history));
  }
  showHistory();
}
function showHistory() {
  const container=document.getElementById("history");
  container.innerHTML="";
  const history= JSON.parse(localStorage.getItem("searchHistory")) || [];
  history.forEach((city) => {
    const div =document.createElement("div");
    div.className = "history-item";
    div.textContent=city;
    container.appendChild(div);
  });
}
window.onload = () => {
  showHistory();
};