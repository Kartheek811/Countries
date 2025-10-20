let searchBtn = document.getElementById("search-btn");
let countryInp = document.getElementById("country-inp");
let result = document.getElementById("result");

countryInp.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    searchBtn.click();
  }
});

searchBtn.addEventListener("click", () => {
  let countryName = countryInp.value.trim();
  if (!countryName) {
    result.innerHTML = `<h3>The input field cannot be empty</h3>`;
    return;
  }

  let finalURL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
  fetch(finalURL)
    .then((response) => {
      if (!response.ok) throw new Error("Country not found");
      return response.json();
    })
    .then((data) => {
      let capital = data[0].capital ? data[0].capital[0] : "N/A";
      let currency = data[0].currencies
        ? `${data[0].currencies[Object.keys(data[0].currencies)].name} - ${Object.keys(data[0].currencies)[0]}`
        : "N/A";
      let languages = data[0].languages ? Object.values(data[0].languages).join(", ") : "N/A";

      result.innerHTML = `
        <img src="${data[0].flags.svg}" class="flag-img">
        <h2>${data[0].name.common}</h2>
        <div class="wrapper"><div class="data-wrapper"><h4>Capital:</h4><span>${capital}</span></div></div>
        <div class="wrapper"><div class="data-wrapper"><h4>Continent:</h4><span>${data[0].continents[0]}</span></div></div>
        <div class="wrapper"><div class="data-wrapper"><h4>Population:</h4><span>${data[0].population}</span></div></div>
        <div class="wrapper"><div class="data-wrapper"><h4>Currency:</h4><span>${currency}</span></div></div>
        <div class="wrapper"><div class="data-wrapper"><h4>Common Languages:</h4><span>${languages}</span></div></div>
      `;
    })
    .catch(() => {
      result.innerHTML = `<h3>Please enter a valid country name.</h3>`;
    });
});

