let mlat; // Map Latitude
let mlng; // Map Longitude
let flag = true;
let map;

// Getting the user's IP address
let form = document.getElementById("form");
form.addEventListener("submit", (e) => {
  e.preventDefault(); // Preventing the from from autosubmitting
  let input = document.getElementById("input").value;
  flag = false;
  fetchingData(input);
});

// Clearing Input field on click
document.getElementById("input").addEventListener("click", () => {
  document.getElementById("input").value = "";
});

// Fetching the Data
async function fetchingData(ipadd) {
  const url = ipadd
    ? `https://geo.ipify.org/api/v2/country,city?apiKey=at_g4bPWNE8EOc0xpsa5XaabAqUPRgAz&ipAddress=${ipadd}`
    : `https://geo.ipify.org/api/v2/country,city?apiKey=at_g4bPWNE8EOc0xpsa5XaabAqUPRgAz`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    const entries = Object.entries(data);
    displayingData(entries);
  } catch (error) {
    alert("Invalid IP Address");
    document.getElementById("input").value = "";
    document.getElementById("ip-address").innerHTML = "";
    document.getElementById("location").innerHTML = "";
    document.getElementById("timezone").innerHTML = "";
    document.getElementById("isp").innerHTML = "";
  }
}
fetchingData();

// Displaying the Results
function displayingData(data) {
  document.getElementById("ip-address").innerHTML = data[0][1]; // Displaying the IP Address
  document.getElementById("location").innerHTML =
    data[1][1]["city"] + ", " + data[1][1]["country"]; // Displaying the Location
  document.getElementById("timezone").innerHTML = data[1][1]["timezone"]; // Displaying the Timezone
  document.getElementById("isp").innerHTML = data[3][1]; // Displaying the ISP
  mlat = data[1][1]["lat"];
  mlng = data[1][1]["lng"];
  flag ? mapCreation(mlat, mlng) : searchingMap(mlat, mlng);
}

// Map creation and Marker
function mapCreation(mlat, mlng) {
  map = L.map("map").setView([mlat, mlng], 13);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
  L.marker([mlat, mlng]).addTo(map);
}

// Marking user's input IP address on the map
function searchingMap(mlat, mlng) {
  map.setView(new L.LatLng(mlat, mlng), 13);
  L.marker([mlat, mlng]).addTo(map);
}
