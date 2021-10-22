const URL = "https://api.covid19api.com/summary";

let countries = [];
let global = {};

const init = async (url) => {
  try {
    const data = await (await fetch(url)).json();
    countries = await data.Countries;
    global = await data.Global;
    toShowSearch(global, false);
    mostAffected();
    savePrint(global, false);
  } catch (error) {
    console.error(error);
  }
};

init(URL);

function date() {
  let date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  if (month < 10) {
    document.getElementById("date").innerText = `${day}/0${month}/${year}`;
  } else {
    document.getElementById("date").innerText = `${day}/${month}/${year}`;
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
        <h1 id="title" class="title"><span>${obj.Country}</span>
        <img id="imgCountry" class="imgCountry" src="https://flagcdn.com/${obj.CountryCode.toLowerCase()}.svg" alt=""></h1>
      `;
  } else {
    document.getElementById("containerTitle").innerHTML = `
        <h1 id="title" class="title"><span>Covid-19</span>
        <img id="imgCountry" class="imgGlobal" src="./Assets//Img/global.svg" alt="Global"></h1>
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
  document.getElementById("findCountry").value = "";
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

let inputEnter = document.querySelector('#findCountry');

inputEnter.addEventListener('keyup', (e)=>{
  if(e.keyCode === 13){
    search();
  }
})

function print() {
  date();
  html2canvas(document.querySelector(".print"), {
    onrendered: function (canvas) {
      return Canvas2Image.saveAsPNG(canvas);
    },
  });
}

function mostAffected() {
  let bestCountries = countries
    .sort((a, b) => a.TotalConfirmed - b.TotalConfirmed)
    .reverse()
    .slice(0, 3);
  let ul = document.querySelector("#bestCountry");
  let li = bestCountries.map(
    (i, pos) =>
      `
      <li>
        <button onclick="toShowBest('${i.Slug}')">
          <div class="higher">
            <img id="imgBestCountry" src="https://flagcdn.com/${i.CountryCode.toLowerCase()}.svg"
              alt="${i.Country} flag." />
          </div>
          <div class="lower">
            <div class="pos"><span>${pos + 1}</span>
            </div>
            <div class="count">
              <i class="fas fa-virus"></i>
              <p>${i.TotalConfirmed.toLocaleString()}</p>
            </div>
          </div>
        </button>
      </li>
    `
  );
  ul.innerHTML = li;
}

function toShowBest(bestCountry){
  let findCountry = countries.filter((country) =>
    country.Slug.includes(bestCountry)
  );
  document.getElementById("title").innerText = findCountry[0].Country;
  toShowSearch(findCountry[0], true);
  savePrint(findCountry[0], true);
}
