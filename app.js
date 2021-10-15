const URL = "https://api.covid19api.com/summary";

let countries = [];
let global = {};

fetch(URL)
  .then((response) => response.json())
  .then((resp) => {
    countries = resp.Countries;
    global = resp.Global;
    document.getElementById("TotalConfirmed").innerText =
      global.TotalConfirmed.toLocaleString();
    document.getElementById("NewConfirmed").innerText =
      global.NewConfirmed.toLocaleString();
    document.getElementById("TotalDeaths").innerText =
      global.TotalDeaths.toLocaleString();
    document.getElementById("NewDeaths").innerText =
      global.NewDeaths.toLocaleString();
    console.log(resp);
  });

function search() {
  let inputValue = document.getElementById("findCountry").value;
  inputValue = convertWord(inputValue);
  console.log(inputValue);
  limpiar();
  document.getElementById("findCountry").placeholder = "Country to search...";
  let findCountry = countries.filter((country) =>
    country.Slug.includes(inputValue)
  );
  console.log(findCountry);
  document.getElementById("title").innerText =
    findCountry[0].Country;
  document.getElementById("TotalConfirmed").innerText =
    findCountry[0].TotalConfirmed.toLocaleString();
  document.getElementById("NewConfirmed").innerText =
    findCountry[0].NewConfirmed.toLocaleString();
  document.getElementById("TotalDeaths").innerText =
    findCountry[0].TotalDeaths.toLocaleString();
  document.getElementById("NewDeaths").innerText =
    findCountry[0].NewDeaths.toLocaleString();
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
