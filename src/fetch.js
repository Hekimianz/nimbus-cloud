import { renderData } from "./renderData";

export const fetchData = async function (input) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${input}?key=VY7YZDM7XWUDYFHA6Q8D6QDGH`,
      { mode: "cors" }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();

    const output = {
      location: data.address,
      conditions: {
        condition: data.currentConditions.conditions,
        time: data.currentConditions.datetime,
        feelslike: data.currentConditions.feelslike,
        icon: data.currentConditions.icon,
        temp: data.currentConditions.temp,
      },
      days: data.days.map((day) => {
        return {
          time: day.datetime,
          icon: day.icon,
          temp: day.temp,
        };
      }),
      description: data.description,
      time: await getTime(data.timezone),
    };

    return output;
  } catch (error) {
    console.error(error);
  }
};

export const handleInput = function () {
  const input = document.querySelector("header input");
  const searchBtn = document.querySelector("header button");
  const loader = document.querySelector(".loader");
  const main = document.querySelector("main");
  searchBtn.addEventListener("click", async () => {
    if (input.value) {
      try {
        loader.classList.remove("hidden");
        main.classList.add("hidden");
        const data = await fetchData(input.value);
        renderData(data);
      } finally {
        loader.classList.add("hidden");
        main.classList.remove("hidden");
      }
    }
  });
  document.addEventListener("keydown", async (e) => {
    if (e.key === "Enter") {
      if (input.value) {
        try {
          loader.classList.remove("hidden");
          main.classList.add("hidden");
          const data = await fetchData(input.value);
          renderData(data);
        } finally {
          loader.classList.add("hidden");
          main.classList.remove("hidden");
        }
      }
    }
  });
};

const getTime = async function (timezone) {
  try {
    const response = await fetch(
      `https://timeapi.io/api/time/current/zone?timeZone=${timezone}`,
      { mode: "cors" }
    );
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();

    return data.time;
  } catch (error) {
    console.error(error);
  }
};
