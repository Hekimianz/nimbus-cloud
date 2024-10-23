import "./style.css";
import { themeSwitch, applyTheme } from "./themeSwitch";
import { handleInput } from "./fetch";
const searchBtn = document.querySelector("header button");

// theme switch
const themeBtn = document.querySelector(".themeBtn");
themeBtn.addEventListener("click", themeSwitch);
applyTheme();

// fetch data & render
const data = handleInput();
