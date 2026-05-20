// http://api.weatherapi.com/v1/current.json?key=ef9705028ac44db49f6162756261805&q=London&aqi=no

const temperatureField = document.querySelector(".temp");
const locationField = document.querySelector(".time-location p:nth-child(2)");
const dateField = document.querySelector(".condition p:nth-child(1)");
const conditionField = document.querySelector(".condition p:nth-child(2)");
const searchForm = document.querySelector("form");
const searchInput = document.querySelector(".search-area");

let target = "London";

const updateDetails = (locationName, time, temp, condition) => {
  temperatureField.innerText = `${temp}°C`;
  locationField.innerText = locationName;
  dateField.innerText = time;
  conditionField.innerText = condition;
};

// Fetching data from the API.
const fetchResults = async (targetLocation) => {
  const url = `https://api.weatherapi.com/v1/current.json?key=ef9705028ac44db49f6162756261805&q=${targetLocation}&aqi=no`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error?.message || "Unable to fetch weather data");
    }

    const locationName = data.location.name;
    const time = data.location.localtime;
    const temp = data.current.temp_c;
    const condition = data.current.condition.text;

    updateDetails(locationName, time, temp, condition);
  } catch (error) {
    conditionField.innerText = error.message;
  }
};

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();

  target = searchInput.value.trim();

  if (!target) {
    conditionField.innerText = "Please enter a location";
    return;
  }

  fetchResults(target);
  searchInput.value = "";
});

fetchResults(target);
