'use strict';

/**
 * navbar toggle
 */

const overlay = document.querySelector("[data-overlay]");
const navbar = document.querySelector("[data-navbar]");
const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");

const navToggleFunc = function () {
  navToggleBtn.classList.toggle("active");
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
}

navToggleBtn.addEventListener("click", navToggleFunc);
overlay.addEventListener("click", navToggleFunc);

for (let i = 0; i < navbarLinks.length; i++) {
  navbarLinks[i].addEventListener("click", navToggleFunc);
}



/**
 * header active on scroll
 */

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
  window.scrollY >= 10 ? header.classList.add("active")
    : header.classList.remove("active");
});

/*DatePicker*/
$(function() {
  const datetimesInput = $('input[name="datetimes"]');
  const startDateElem = document.querySelector('.start-date');
  const endDateElem = document.querySelector('.end-date');
  
  datetimesInput.daterangepicker({
    timePicker: true,
    minDate: new Date(),
    startDate: moment().startOf('hour'),
    endDate: moment().startOf('hour').add(32, 'hour'),
    locale: {
    format: 'M/DD hh:mm A'
    }
  });

  if (localStorage.getItem('buttonEditDatesClicked')) {
    $('input[name="datetimes"]').data('daterangepicker').show();
  }

  // Save selected dates to localStorage on change
  datetimesInput.on('apply.daterangepicker', function(ev, picker) {
    const startDate = picker.startDate.format('M/DD hh:mm A');
    const endDate = picker.endDate.format('M/DD hh:mm A')
    const daysDiff = picker.endDate.diff(picker.startDate, 'days') + 1; // Add 1 to include both start and end days
    localStorage.setItem('numberOfDates', daysDiff);
    localStorage.setItem('startDate', startDate); // Save start date to localStorage
    localStorage.setItem('endDate',endDate); // Save end date to localStorage
    startDateElem.textContent = picker.startDate.format('M/DD hh:mm A'); // Set start date in the HTML element
    endDateElem.textContent = picker.endDate.format('M/DD hh:mm A'); // Set end date in the HTML element
    console.log(daysDiff);
  });
});

//locations
const buttonSetItUp = document.querySelector(".setItUp");

buttonSetItUp.addEventListener('click', function(){
  const pickUpLocation = document.querySelector(".pickUp").value;
  const dropOffLocation = document.querySelector(".dropOff").value;
  console.log(pickUpLocation);

  localStorage.setItem('pickUp', pickUpLocation);
  localStorage.setItem('dropOff', dropOffLocation);
 
});

/*cars json parser*/
const CarsJson = 'assets/js/CarsJson.json';
const display = document.querySelector('.featured-car-list');
const minPriceInput = document.querySelector('#min-price-input');
const maxPriceInput = document.querySelector('#max-price-input');

const getCars = async () => {
  const res = await fetch(CarsJson);
  const data = await res.json();
  return data;
}

async function displayCars() {
  let minPrice = parseFloat(minPriceInput.value) || 0;
  let maxPrice = parseFloat(maxPriceInput.value) || Number.MAX_VALUE;

  const data = await getCars();

  let carsInRange = data.featuredCars.filter((car) => {
    return car.carPrice >= minPrice && car.carPrice <= maxPrice;
  });

  // Restartira the filteredIndex property za svako auto na originalni index
  carsInRange.forEach((car, index) => {
    car.filteredIndex = data.featuredCars.findIndex((c) => c === car);
  });

  // Sortira auta po njihovim novim indexima
  carsInRange.sort((a, b) => a.filteredIndex - b.filteredIndex);

  let dataDisplay = '';

  if (carsInRange.length > 0) {
    dataDisplay = carsInRange.map((car, filteredIndex) => {
      const listItem = `
        <div class="featured-car-card">
          <li class="car-li-${filteredIndex}">
            <figure class="card-banner">
              <img src="${car.carSmallImage}" alt="${car.carTitle} ${car.carYear}" loading="lazy" width="440" height="300" class="w-100">
            </figure>

            <div class="card-content">
              <div class="card-title-wrapper">
                <h3 class="h3 card-title">
                  <a href="#">${car.carTitle}</a>
                </h3>
                <data class="year" value="${car.carYear}">${car.carYear}</data>
              </div>

              <ul class="card-list">
                <li class="card-list-item">
                  <ion-icon name="${car.carList[0].icon}"></ion-icon>
                  <span class="card-item-text">${car.carList[0].text}</span>
                </li>
                <li class="card-list-item">
                  <ion-icon name="${car.carList[1].icon}"></ion-icon>
                  <span class="card-item-text">${car.carList[1].text}</span>
                </li>
                <li class="card-list-item">
                  <ion-icon name="${car.carList[2].icon}"></ion-icon>
                  <span class="card-item-text">${car.carList[2].text}</span>
                </li>
                <li class="card-list-item">
                  <ion-icon name="${car.carList[3].icon}"></ion-icon>
                  <span class="card-item-text">${car.carList[3].text}</span>
                </li>
              </ul>

              <div class="card-price-wrapper">
                <p class="card-price">
                  <strong>${car.carPrice + car.valute}</strong>
                </p>
                <button class="btn fav-btn" aria-label="Add to favourite list">
                  <ion-icon name="heart-outline"></ion-icon>
                </button>
                <button class="btn" onclick="rentCar(${car.carIndex})">Rent now</button>
              </div>
            </div>
          </li>
        </div>
      `;
      return listItem;
    }).join('');
  } else {
    dataDisplay = '<p>No cars found for the given price range</p>';
  }

  display.innerHTML = dataDisplay;
}


async function rentCar(index) {
  const data = await getCars();
  console.log(index);

  // dohvača index od odabranog auta 
  const pickedCarIndex = data.featuredCars.findIndex((car) => car.carIndex === index);

  // sprema index u local storage
  localStorage.setItem('pickedCarIndex', pickedCarIndex);

  const url = 'PickedCar.html';
  window.open(url);
}


// To invoke the displayCars function on change of the input fields.
const searchByPrice = document.querySelector(".price");

if(searchByPrice){
  minPriceInput.addEventListener('change', displayCars);
  maxPriceInput.addEventListener('change', displayCars);
}

displayCars();











  

