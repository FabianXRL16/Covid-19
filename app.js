const URL = "https://api.covid19api.com/summary";

let countries = [];
let global = {};

fetch(URL)
  .then((response) => response.json())
  .then((resp) => {
    countries = resp.Countries;
    global = resp.Global;
    toShowSearch(global, false);
    savePrint(global, false);
  });

function date() {
  let date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  if (month < 10) {
    document.getElementById("date").innerText =`${day}/0${month}/${year}`;
  } else {
    document.getElementById("date").innerText =`${day}/${month}/${year}`;
  }
}

function toShowSearch(obj, country) {
  document.getElementById("TotalConfirmed").innerText =
    obj.TotalConfirmed.toLocaleString();
  document.getElementById("NewConfirmed").innerText =
    obj.NewConfirmed.toLocaleString();
  document.getElementById("TotalDeaths").innerText =
    obj.TotalDeaths.toLocaleString();
  document.getElementById("NewDeaths").innerText =
    obj.NewDeaths.toLocaleString();
  if (country) {
    document.getElementById("containerTitle").innerHTML = `
        <h1 id="title" class="title">${obj.Country}</h1>
        <img id="imgCountry" class="imgCountry" src="https://flagcdn.com/${obj.CountryCode.toLowerCase()}.svg" alt="">
      `;
  } else {
    document.getElementById("containerTitle").innerHTML = `
        <h1 id="title" class="title">Covid-19</h1>
        <img id="imgCountry" class="imgGlobal" src="./Assets//Img/global.svg" alt="Global">
      `;
  }
}

function savePrint(obj, country) {
  document.getElementById("print__totalCases").innerText =
    obj.TotalConfirmed.toLocaleString();
  document.getElementById("print__newCases").innerText =
    obj.NewConfirmed.toLocaleString();
  document.getElementById("print__totalDeaths").innerText =
    obj.TotalDeaths.toLocaleString();
  document.getElementById("print__newDeaths").innerText =
    obj.NewDeaths.toLocaleString();
  if (country) {
    document.getElementById("print__title").innerHTML = `
        <h1 id="print__title">${obj.Country}</h1>
      `;
  } else {
    document.getElementById("print__title").innerHTML = `
        <h1 id="print__title">Global</h1>
      `;
  }
}

function search() {
  let inputValue = document.getElementById("findCountry").value;
  inputValue = convertWord(inputValue);
  limpiar();
  document.getElementById("findCountry").placeholder = "Country to search...";
  let findCountry = countries.filter((country) =>
    country.Slug.includes(inputValue)
  );
  document.getElementById("title").innerText = findCountry[0].Country;
  toShowSearch(findCountry[0], true);
  savePrint(findCountry[0], true);
}

function dataGlobal() {
  toShowSearch(global, false);
  savePrint(global, false);
}

function limpiar() {
  document.getElementById("findCountry").value = " ";
}

function toUpper(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => {
      return word[0].toUpperCase() + word.substr(1);
    })
    .join(" ");
}

function convertWord(str) {
  return str.toLowerCase().trim().split(" ").join("-");
}

function bestCountries(arr) {
  arr
    .sort((a, b) => a - b)
    .reverse()
    .splice(0, 3);
}

function inputSearch() {
  if (event.code == "Enter") {
    search();
  }
}

function print() {
  date()
  html2canvas(document.querySelector(".print"), {
    onrendered: function (canvas) {
      return Canvas2Image.saveAsPNG(canvas);
    },
  });
}
