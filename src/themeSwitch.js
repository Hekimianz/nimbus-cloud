import dark from "./assets/darkMode.png";
import light from "./assets/lightMode.png";
import darkLoader from "./assets/loadDark.png";
import lightLoader from "./assets/loadLight.png";

let theme = localStorage.getItem("theme") || "light";
export const themeSwitch = function () {
  if (theme === "light") {
    theme = "dark";
    localStorage.setItem("theme", "dark");
  } else if (theme === "dark") {
    theme = "light";
    localStorage.setItem("theme", "light");
  }
  applyTheme();
};

export const applyTheme = function () {
  const img = document.querySelector(".themeBtn");
  const body = document.querySelector("body");
  const input = document.querySelector("header input");
  const header = document.querySelector("header");
  const mainWeather = document.querySelector(".main-weather");
  const forecasts = document.querySelectorAll(".forecast");
  const loader = document.querySelector(".loader");

  if (theme === "light") {
    loader.src = lightLoader;
    body.classList.add("dark-mode");
    input.classList.add("dark-mode");
    header.classList.add("dark-mode");
    mainWeather.classList.add("dark-mode");
    forecasts.forEach((card) => card.classList.add("dark-mode"));
    img.src = dark;
  } else if (theme === "dark") {
    loader.src = darkLoader;
    body.classList.remove("dark-mode");
    input.classList.remove("dark-mode");
    header.classList.remove("dark-mode");
    mainWeather.classList.remove("dark-mode");
    forecasts.forEach((card) => card.classList.remove("dark-mode"));
    img.src = light;
  }
};
