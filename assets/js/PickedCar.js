//navigation and scrool

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


let rentalPrice = 0;

fetch('assets/js/CarsJson.json')
  .then(response => response.json())
  .then(data => {
    //dohvaćanje svega odabranog s prve stranice
    const pickUpLocation = localStorage.getItem('pickUp');
    const dropOffLocation = localStorage.getItem('dropOff');
    const pickedCarIndex = localStorage.getItem('pickedCarIndex');
    const startDate = localStorage.getItem('startDate');
    const endDate = localStorage.getItem('endDate');
    const daysDif = localStorage.getItem('numberOfDates');

    //ovaj ovdje dio dohvača poslani index iz pvog js "filea"
    const pickedCar = data.featuredCars[pickedCarIndex];

    //dohvaćanje divova u kojima će biti spremljeni podaci 
    const startDateElem = document.querySelector('.start-date');
    const endDateElem = document.querySelector('.end-date');
    const carImage = document.querySelector('.car-image img');
    const carTitle = document.querySelector('.car-title');
    const year = document.querySelector('.year');
    const cardListItems = document.querySelectorAll('.card-list-item');
    const buttonEditDates = document.querySelector(".edit-dates-btn");
    const priceInsurance = document.querySelector(".priceOfInsurance");

    //divs for sending mail
    const cardPriceInput = document.querySelector('#card-price-input');
    const PicklUpInput = document.querySelector('#pickUp-input');
    const DropOffInput = document.querySelector('#dropOff-input');
    const FromDateInput = document.querySelector('#dates-from-input');
    const ToDateInput = document.querySelector('#dates-to-input');
    const carName = document.querySelector("#carName-input");
    
    //prikaz sadržaja na zadnjem "stepu" (tamo gdje se ispiše )
    const cardPrice = document.querySelector('.car-price-last .wraper-right');
    const days = document.querySelector(".days .wraper-right");
    const insurance = document.querySelector(".insurance-last .wraper-right");
    const addons = document.querySelector(".accessories-last .wraper-right");
    const pickUp = document.querySelector(".pickUp-last .wraper-right");
    const dropOff = document.querySelector(".dropOff-last .wraper-right");
    const fromDate = document.querySelector(".dates-from span:nth-child(2)");
    const toDate = document.querySelector(".dates-to span:nth-child(2)");
  
    //prikaz lokacija 
    const showPickUpLocation = document.querySelector(".pickUpLocation");
    const showDropOffLocation = document.querySelector(".dropOffLocation");

    //insurance price
    priceInsurance.textContent = "Price: " + pickedCar.carInsurance + "€";

    showPickUpLocation.textContent = "PickUp location: " + pickUpLocation;
    showDropOffLocation.textContent = "DropOff location: " + dropOffLocation;

    //prikaz lokacija na zadnjem "stepu"t
    pickUp.textContent = pickUpLocation;
    dropOff.textContent = dropOffLocation;

    //postavljanej lokacija u formu(tako da bi se odabrane lokacije poslale na mail)
    PicklUpInput.value = pickUpLocation;
    DropOffInput.value = dropOffLocation;

    //dohvaćanje divova za ispis maloga infa koji je prožet kroz cijelu stranicu
    const carImage2 = document.querySelector('.car-image-2 img');
    const carTitle2 = document.querySelector('.car-title-2');
    const cardPrice2 = document.querySelector('.car-price-2');

    //izmjena cijene u malom prikazu u slučaju odabira premium insurancea(osiguranja)
    const smallPremiumInsurancePrice = cardPrice2;

    //postavljanje vrijednosti unutar divova koji se ispiruju na zadnjem "stepu"
    carImage.src = pickedCar.carSmallImage;
    carImage.alt = `${pickedCar.carTitle} ${pickedCar.carYear}`;
    carTitle.textContent = pickedCar.carTitle;
    year.value = pickedCar.carYear;
    year.textContent = pickedCar.carYear;
    carName.value = pickedCar.carTitle;
    
    //insurance


    //snall info
    carImage2.src = pickedCar.carSmallImage;
    carTitle2.textContent = pickedCar.carTitle;

    //pen--EDIT DATES:
    buttonEditDates.addEventListener('click', function(){
      localStorage.setItem('buttonEditDatesClicked', true); // ako je pen botun kliknut vodi nazad na prvu stranicu

      const url = 'index.html';
       window.open(url)
    })

    //Datumi
    startDateElem.textContent = startDate // Set start date in the HTML element
    endDateElem.textContent = endDate; // Set end date in the HTML element

    //seting inpt value last dates
    FromDateInput.value = startDate;
    ToDateInput.value = endDate;

    //seting last dates
    fromDate.textContent = startDate;
    toDate.textContent = endDate;


    for (let i = 0; i < pickedCar.carList.length; i++) {
      cardListItems[i].querySelector('ion-icon').name = pickedCar.carList[i].icon;
      cardListItems[i].querySelector('.card-item-text').textContent = pickedCar.carList[i].text;
    }

    const carPriceDays = pickedCar.carPrice * daysDif
    days.textContent =  daysDif;
    rentalPrice = pickedCar.carPrice;

    //prikaz cijene kroz stranicu
    cardPrice2.textContent =  `${pickedCar.carPrice}€ x ${daysDif} days = ${carPriceDays}€`;
    //lista za dodavanje

    //dohvaćanje divova za ispis cijena s dodacima
    const accessoriesList = document.querySelector('.accessories-list');
    const basePrice = document.querySelector('.base-price span');
    const accessoryPrice = document.querySelector('.accessory-price span');
    const totalPrice = document.querySelector('.total-price span');

    //definiranje cijena dodataka
    const accessoryPrices = {
      gps: 8,
      'child-seat-toodler': 8,
      'child-seat-infant': 8,
      '3rd-driver': 2,
      wifi: 8,
    };
    
  //definiranje sekcija te sakrivanje onih koji trenutno ne trebaju biti prikazani
  const futuredCardRender = document.querySelector(".featured-car");
  futuredCardRender.style.display = "none";
  const accessoriesSection = document.querySelector(".accessories");
  accessoriesSection.style.display = "none";
  const insuranceSection = document.querySelector(".insurance");
  const carDateInfo = document.querySelector(".carDateInfo");
  const textAfterSubmition = document.querySelector(".textConframtion");

  //hvtnje diva steper
  const steper = document.querySelector(".steper");
  steper.textContent = "1.Step-insurance";//innsurance steper

  const nextbasic = document.querySelector(".next-basic");
  const nextPremium = document.querySelector(".next-premium");
  const nextAccessories = document.querySelector(".next-accessories");

  nextbasic.addEventListener('click', function(){
    accessoriesSection.style.display = "block";
    insuranceSection.style.display = "none"; 

    insurance.textContent = "0€"

    steper.textContent = "2.Step-accessories";  
  
    //inizijalizacija bez premiuma
    basePrice.textContent = `${pickedCar.carPrice}€/day`;
    accessoryPrice.textContent = `0€/day`;
    totalPrice.textContent = `${pickedCar.carPrice * daysDif}€`;
  
    // Set default price in cardPriceInput
    cardPriceInput.value = `€${pickedCar.carPrice * daysDif}`;
  
    accessoriesList.addEventListener('change', function(event) {
      const accessory = event.target.value;
      const isChecked = event.target.checked;
      const accessoryPricePerDay = accessoryPrices[accessory] || 0;
  
      if (isChecked) {
        rentalPrice += accessoryPricePerDay;
      } else {
        rentalPrice -= accessoryPricePerDay;
      }
  
        const accessoryPriceTotal = rentalPrice - pickedCar.carPrice;
        const accessoryPriceText = `${accessoryPriceTotal}€/day`;
  
        basePrice.textContent = `${pickedCar.carPrice}€/day`;
        accessoryPrice.textContent = accessoryPriceText;
        
        //nakon dodataka ažurira addons te služi za prikaz cijene na kraju u 4 stepu
        addons.textContent = accessoryPriceText;

        const newTotalPrice = rentalPrice * daysDif;
        let finalPrice = newTotalPrice;
        totalPrice.textContent = `${finalPrice}€`;
  
        cardPrice.textContent = `${finalPrice}€`;
        cardPriceInput.value = cardPrice.textContent;
      
    });
    //stavkjamo van accessorys u slucaju da covjek ne odabere dodakes
    const newTotalPrice = rentalPrice * daysDif;
    let finalPrice = newTotalPrice;
    totalPrice.textContent = `${finalPrice}€`;

    cardPrice.textContent = `${finalPrice}€`;
    cardPriceInput.value = cardPrice.textContent;
  });

  
  
  nextPremium.addEventListener('click', function() {
    accessoriesSection.style.display = "block";
    insuranceSection.style.display = "none"; 
    //setting the last insrance price
    insurance.textContent = pickedCar.carInsurance
 
    //steper-addson
    steper.textContent = "2.Step-accessories";  
  
    //new small info price
    smallPremiumInsurancePrice.textContent = `€${pickedCar.carPrice} x ${daysDif} days + ${pickedCar.carInsurance}€ = ${carPriceDays + pickedCar.carInsurance}€`
  
    //inicijalizacija sa premiumom 
    basePrice.textContent = `${pickedCar.carPrice}€/day`;
    accessoryPrice.textContent = `0€/day`;
    totalPrice.textContent = `${(pickedCar.carPrice * daysDif) + pickedCar.carInsurance}€`;
  
    // Set default price in cardPriceInput
    cardPriceInput.value = `${(pickedCar.carPrice * daysDif) + pickedCar.carInsurance}€`;
  
    accessoriesList.addEventListener('change', function(event) {
      const accessory = event.target.value;
      const isChecked = event.target.checked;
      const accessoryPricePerDay = accessoryPrices[accessory] || 0;
  
      if (isChecked) {
        rentalPrice += accessoryPricePerDay;
      } else {
        rentalPrice -= accessoryPricePerDay;
      }
  
      const accessoryPriceTotal = rentalPrice - pickedCar.carPrice;
      const accessoryPriceText = `${accessoryPriceTotal}€/day`;
  
      basePrice.textContent = `${pickedCar.carPrice}€/day`;
      accessoryPrice.textContent = accessoryPriceText;

      //prikaz finalne cijene na zadnjem stepu
      addons.textContent = accessoryPriceText;
      
      //kalkulira novu konačnu cijenu
  
        const newTotalPrice = rentalPrice * daysDif ;
        let finalPrice = newTotalPrice + pickedCar.carInsurance; //stavljan plus pickedCar.carInsurance da bi se i kad se doda neki add on da bi  se cijena promjenila  skupa za tih  pickedCar.carInsurance
        totalPrice.textContent = `${finalPrice}€`;
      
        cardPrice.textContent = finalPrice + `€`;
        cardPriceInput.value = cardPrice.textContent;
      
    });
    //isti kod definiramo van accesoria u slucaju da ljudi ne uzmu nikakve dodatke
    const newTotalPrice = rentalPrice * daysDif ;
    let finalPrice = newTotalPrice + pickedCar.carInsurance; //stavljan plus pickedCar.carInsurance da bi se i kad se doda neki add on da bi  se cijena promjenila  skupa za tih pickedCar.carInsurance
    totalPrice.textContent = `${finalPrice}€`;
  
    cardPrice.textContent = finalPrice + `€`;
    cardPriceInput.value = cardPrice.textContent;
  });
  
  nextAccessories.addEventListener('click', function(){
    accessoriesSection.style.display = "none";
    carDateInfo.style.display = "none";
    futuredCardRender.style.display = "block";
    //steper-final
    steper.textContent = "Final. Send Request";  
  })

  const buttonSendMail = document.querySelector('#send-mail-btn');
  buttonSendMail.addEventListener('click', handleSubmit);

// slanje podataka js file koji ih prosljeđuje bazi
  function handleSubmit(event) {
    // preventa uobičajeno ponašanje submita
    event.preventDefault();

    // Get all the input fields
    const driverNameInput = document.querySelector('#driver-name');
    const emailInput = document.querySelector('#email');
    const countryInput = document.querySelector('#country');
    const dobInput = document.querySelector('#dob');
    const codeInput = document.querySelector('#code');
    const phoneInput = document.querySelector('#phone');
    const addressInput = document.querySelector('#address');

    // provjerava jsu svi inputi popunjeni
    if (driverNameInput.value.trim() === '' || emailInput.value.trim() === '' || countryInput.value.trim() === '' || dobInput.value.trim() === '' || codeInput.value.trim() === '' || phoneInput.value.trim() === '' || addressInput.value.trim() === '') {
      // If any field is empty, show an error message and return
      alert('Please fill out all fields.');
      return;
    }

    // If all fields are filled, proceed with form submission
    futuredCardRender.style.display = "none";
    textAfterSubmition.style.display = "block";
  }

    
  });

  //tabs

  function openTab(event, tabName) {
    // dohvaća sve elemente sa clasom tabcontent i skriva ih
    var tabcontent = document.getElementsByClassName("tabcontent");
    for (var i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // dohvača sve elemente s classom tablinks i remova clasu active s njih 
    var tablinks = document.getElementsByClassName("tablinks");
    for (var i = 0; i < tablinks.length; i++) {
      tablinks[i].classList.remove("active");
    }
  
    // pokazuje tab koji je trenutno otvoren
    document.getElementById(tabName).style.display = "block";
    event.currentTarget.classList.add("active");
  }
  
  // otvara basic tab prvo po defaultu
  document.getElementById("basic").style.display = "block";
  document.getElementsByClassName("tablinks")[0].classList.add("active");

  