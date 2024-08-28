let dayInput = document.getElementById("dayinput");
let monthInput = document.getElementById("monthinput");
let yearInput = document.getElementById("yearinput");
let submitBtn = document.getElementById("submitBtn");
let box = document.getElementById("box");
let states = document.getElementById("states");

let dataDay = document.querySelector("[data-day]");
let dataDate = document.querySelector("[data-date]");
let dataYear = document.querySelector("[data-year]");
let dataHeartBeat = document.querySelector("[data-heart-beat]");
let dataBloodPump = document.querySelector("[data-blood-pump]");
let dataTotalDays = document.querySelector("[data-tl-days]");
let dataBreath = document.querySelector("[data-breath]");
let dataBlink = document.querySelector("[data-blink]");
let dataSleep = document.querySelector("[data-sleep]");
let dataY = document.querySelector("[data-y]");
let dataM = document.querySelector("[data-m]");
let dataTravel = document.querySelector("[data-travel]");
let dataSaliva = document.querySelector("[data-saliva]");
let dataSkin = document.querySelector("[data-skin]");
let dataUrine = document.querySelector("[data-urine]");
let dataCo2 = document.querySelector("[data-co2]");
let dataSunTravel = document.querySelector("[data-sunTravel]");
let dataMoonOrbit = document.querySelector("[data-moonOrbit]");
let dataMoonAway = document.querySelector("[data-moonaway]");
let dataNxtBday = document.querySelector("[data-bday]");
let dataAdvice = document.querySelector("[data-advice]");

document.querySelectorAll("input").forEach((elem) => {
  elem.addEventListener("keyup", () => {
    if (
      dayInput.value > 0 &&
      dayInput.value <= 31 &&
      monthInput.value > 0 &&
      monthInput.value <= 12 &&
      yearInput.value.length === 4 &&
      yearInput.value < new Date().getFullYear() &&
      yearInput.value >= new Date().getFullYear() - 100
    ) {
      submitBtn.removeAttribute("disabled");
    } else {
      submitBtn.disabled = true;
    }
  });
});

function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const elementMidPoint = rect.top + rect.height / 2;

  // Calculate the position 50vh from the bottom
  const targetPosition = viewportHeight * 0.6;

  return elementMidPoint >= targetPosition;
}
function applyDarkClass() {
  const paragraphs = document.querySelectorAll(".lines .text");
  let activeFound = false;

  paragraphs.forEach((paragraph) => {
    const imageId = paragraph.getAttribute("data-image");
    const image = document.getElementById(imageId);

    if (!activeFound && isElementInViewport(paragraph)) {
      paragraph.classList.add("dark");
      image.classList.add("active");

      activeFound = true;
    } else {
      paragraph.classList.remove("dark");
      image.classList.remove("active");
    }
  });
}
window.addEventListener("scroll", applyDarkClass);

function parseDate(dateString) {
  const [day, month, year] = dateString.split("/");
  const dateObject = new Date(`${year}-${month}-${day}`);
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayName = daysOfWeek[dateObject.getDay()];
  const monthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthName = monthsOfYear[dateObject.getMonth()];
  return {
    day: dayName,
    date: parseInt(day),
    month: monthName,
    year: parseInt(year),
  };
}

function calculateTimeDifference(dateString) {
  const [day, month, year] = dateString.split("/");
  const providedDate = new Date(`${year}-${month}-${day}`);
  const currentDate = new Date();
  const diffInMs = currentDate - providedDate;
  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const years = currentDate.getFullYear() - providedDate.getFullYear();
  let months = currentDate.getMonth() - providedDate.getMonth();
  if (months < 0) {
    months += 12;
    years -= 1;
  }
  const totalTime = {
    years: years,
    months: years * 12 + months,
    days: diffInDays,
    hours: diffInHours,
    minutes: diffInMinutes,
    seconds: diffInSeconds,
  };
  return totalTime;
}

function init() {
  let dateF = `${dayInput.value}/${monthInput.value}/${yearInput.value}`;
  let times = calculateTimeDifference(dateF);
  let i = 0;
  let b = 0;
  let sunT = 0;
  setInterval(() => {
    i++;
    dataHeartBeat.innerHTML = formattedNumberIn(times.minutes * 78 + i);
    dataBloodPump.innerHTML = formattedNumberIn(times.minutes * 6);
    dataTotalDays.innerHTML = formattedNumberIn(times.days);
    dataY.innerHTML = formattedNumberIn(times.years);
    dataM.innerHTML = formattedNumberIn(times.months);
    dataTravel.innerHTML = formattedNumberIn(times.days * 1200);
    dataSaliva.innerHTML = formattedNumberIn(times.days * 1);
    dataSkin.innerHTML = formattedNumberIn(Math.round(times.years * 4));
    dataUrine.innerHTML = formattedNumberIn(Math.round(times.days * 1.5));
    dataCo2.innerHTML = Math.round(times.years * 0.55);
    dataMoonOrbit.innerHTML = Math.round(times.days / 27.3);
    dataMoonAway.innerHTML = Math.round(times.years * 3.82);
    dataNxtBday.innerHTML = daysUntilNextBirthday(dateF);
  }, 1000);

  setInterval(() => {
    sunT += 30;
    dataSunTravel.innerHTML = formattedNumberIn(times.seconds * 30 + sunT);
  }, 100);

  setInterval(() => {
    b++;
    dataBreath.innerHTML = formattedNumberIn(times.minutes * 14 + b);
    dataBlink.innerHTML = formattedNumberIn(times.minutes * 12 + b);
  }, 4000);

  dataSleep.innerHTML = formattedNumberIn(Math.round(times.days / 3));
}

function go() {
  states.style.display = "flex";
  box.style.display = "none";
  init();
}

//Helper Functions

function formattedNumberIn(number) {
  const formatter = new Intl.NumberFormat();
  const formattedNumber = formatter.format(number);
  return formattedNumber;
}
function daysUntilNextBirthday(dobString) {
  const [day, month, year] = dobString.split("/").map(Number);
  const today = new Date();
  const currentYear = today.getFullYear();
  let nextBirthday = new Date(currentYear, month - 1, day);
  if (today > nextBirthday) {
    nextBirthday.setFullYear(currentYear + 1);
  }

  const diffTime = nextBirthday - today;

  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

async function fetchData(url) {
  try {
    const response = await fetch(url);
    return response.ok ? await response.json() : null;
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}

// Example usage:

fetchData("https://api.adviceslip.com/advice").then((data) => {
  dataAdvice.innerHTML = data.slip.advice;
  console.log(data.slip.advice);
});
