const firebaseConfig = {
    apiKey: "AIzaSyAu9zzmE6AcIcBudi22PLDYsLoMX2uZy_k",
    authDomain: "anadurentacar-423c3.firebaseapp.com",
    databaseURL: "https://anadurentacar-423c3-default-rtdb.firebaseio.com",
    projectId: "anadurentacar-423c3",
    storageBucket: "anadurentacar-423c3.appspot.com",
    messagingSenderId: "968924155468",
    appId: "1:968924155468:web:f98d50466e7092f04a2ee9"
  };
  
  //initialize firebase
  firebase.initializeApp(firebaseConfig);
  
  //reference 
  const contactFormDB = firebase.database().ref("AnaduRentacar");
  
  document.getElementById("contactForm").addEventListener("submit", submitForm);
  
  function submitForm() {
  
    var carName = getElementVal('carName-input');
    var pickUp = getElementVal('pickUp-input');
    var dropOff = getElementVal('dropOff-input');
    var from = getElementVal('dates-from-input');
    var to = getElementVal('dates-to-input');
    var carPrice = getElementVal('card-price-input');
    var driverName = getElementVal('driver-name');
    var email = getElementVal('email');
    var country = getElementVal('country');
    var dob = getElementVal('dob');
    var code = getElementVal('code');
    var phone = getElementVal('phone');
    var address = getElementVal('address');
    var note = getElementVal('note');
  
  
    saveMessages(carName,pickUp,dropOff,from,driverName,to,carPrice,email,country,dob,code,phone,address,note);
  
  }
  const saveMessages = (carName,pickUp,dropOff,from,driverName,to,carPrice,email,country,dob,code,phone,address,note) => {
    var newContactForm = contactFormDB.push();
  
    newContactForm.set({
      carName: carName,
      pickUp: pickUp,   
      dropOff: dropOff,
      from: from,
      driverName: driverName,
      to: to,
      carPrice: carPrice,
      email: email,
      country: country,
      dob: dob,
      code: code,
      phone: phone,
      address: address,
      note: note
  
    });
  };
  
  const getElementVal = (id) =>{
    return document.getElementById(id).value;
  }
  