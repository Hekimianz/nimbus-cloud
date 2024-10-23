const iconMap = {
  "clear-day": "wi-day-sunny",
  "clear-night": "wi-night-clear",
  "partly-cloudy-day": "wi-day-cloudy",
  "partly-cloudy-night": "wi-night-alt-cloudy",
  rain: "wi-rain",
  snow: "wi-snow",
  fog: "wi-fog",
  wind: "wi-strong-wind",
  cloudy: "wi-cloudy",
  hail: "wi-hail",
  thunderstorm: "wi-thunderstorm",
  sleet: "wi-sleet",
};

export const renderData = function (data) {
  const location = document.querySelector(".main-weather h2");
  const time = document.querySelector(".main-weather .weather-time");
  const temp = document.querySelector(".main-weather .weather-temp");
  const desc = document.querySelector(".main-weather .weather-desc");
  const main = document.querySelector("main");
  const loader = document.querySelector(".loader");
  const forecasts = document.querySelector(".forecasts");
  const degSwitch = document.querySelector(".switch-deg");
  const tempF = `${data.conditions.temp} ºF`;
  const tempC = `${((5 / 9) * (data.conditions.temp - 32)).toFixed(1)} ºC`;
  let currentDeg = localStorage.getItem("deg") || "C";
  if (currentDeg === "F") {
    degSwitch.innerHTML = `Switch to ºC`;
  } else if (currentDeg === "C") {
    degSwitch.innerHTML = "Switch to ºF";
  }

  const formattedTitle = data.location
    .split(" ")
    .map((word) => word.slice(0, 1).toUpperCase() + word.slice(1))
    .join(" ");

  location.innerHTML = formattedTitle;
  time.innerHTML = data.time;
  // temp.innerHTML = `${data.conditions.temp} ºF`;
  desc.innerHTML = data.description;
  main.classList.remove("hidden");
  loader.classList.add("hidden");
  if (currentDeg === "F") {
    temp.innerHTML = tempF;
  } else if (currentDeg === "C") {
    temp.innerHTML = tempC;
  }

  // Render the current weather icon
  const weatherIcon = document.getElementById("weather-icon");
  const currentIconClass = iconMap[data.conditions.icon] || "wi-na";
  weatherIcon.className = `wi ${currentIconClass}`;

  const days = data.days.splice(1, 5);
  data.daysTemps = {
    f: days.map((day) => day.temp),
    c: days.map((day) => ((5 / 9) * (day.temp - 32)).toFixed(1)),
  };

  // Render forecasts
  forecasts.innerHTML = "";
  days.forEach((day, i) => {
    const formattedDate = day.time.split("-").splice(1).join("/");
    const card = document.createElement("div");
    card.classList.add("forecast");
    const date = document.createElement("h3");
    date.innerHTML = formattedDate;
    card.appendChild(date);
    forecasts.appendChild(card);

    // Render the day's icon
    const icon = document.createElement("i");
    const dayIconClass = iconMap[day.icon] || "wi-na";
    icon.classList.add("wi", dayIconClass, "weather-icon", "forecast--icon");
    card.appendChild(icon);

    const temp = document.createElement("span");
    if (currentDeg === "F") {
      temp.innerHTML = data.daysTemps.f[i] + " ºF";
    } else if (currentDeg === "C") {
      temp.innerHTML = data.daysTemps.c[i] + " ºC";
    }
    card.appendChild(temp);

    if (localStorage.getItem("theme") === "light") {
      card.classList.add("dark-mode");
    }
  });

  degSwitch.addEventListener("click", () => {
    const allDays = document.querySelectorAll(".forecast");

    if (currentDeg === "C") {
      currentDeg = "F";
      temp.innerHTML = tempF;
      degSwitch.innerHTML = "Switch to ºC";
      localStorage.setItem("deg", "F");
    } else if (currentDeg === "F") {
      currentDeg = "C";
      temp.innerHTML = tempC;
      localStorage.setItem("deg", "C");
      degSwitch.innerHTML = "Switch to ºF";
    }
    allDays.forEach((day, i) => {
      day.children[2].classList.add("switched");
      temp.classList.add("switched");
      let currentTemp = day.children[2].innerHTML.split(" ")[0];
      if (currentDeg === "F") {
        day.children[2].innerHTML = data.daysTemps.f[i] + " ºF";
      } else if (currentDeg === "C") {
        day.children[2].innerHTML = data.daysTemps.c[i] + " ºC";
      }
    });
    setTimeout(() => {
      temp.classList.remove("switched");
      allDays.forEach((day) => {
        day.children[2].classList.remove("switched");
      });
    }, 200);
  });
};
