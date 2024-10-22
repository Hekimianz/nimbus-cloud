import dark from "./assets/darkMode.png";
import light from "./assets/lightMode.png";

let theme = "light";
export const themeSwitch = function (e) {
  const img = e.target;
  const body = document.querySelector("body");
  if (theme === "light") {
    theme = "dark";
    body.classList.add("dark-mode");
    img.src = dark;
  } else if (theme === "dark") {
    theme = "light";
    body.classList.remove("dark-mode");
    img.src = light;
  }
};
