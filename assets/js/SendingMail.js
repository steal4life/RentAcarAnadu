/*const nodemailer = require("nodemailer");
const express = require('express');
const app = express();
const path = require('path');

// Serve static files from the public directory
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', function(req, response){
  response.sendFile(path.join(__dirname, "../../PickedCar.html#textConfrmation"))
})

app.post('/SendMail', (req, res) => {
  const driverName = req.body.driver_name;
  const email = req.body.email;
  const country = req.body.country;
  const dob = req.body.dob;
  const code = req.body.code;
  const phone = req.body.phone;
  const address = req.body.address;
  const note = req.body.note;

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // SMTP server address (usually mail.your-domain.com)
    port: 465, // Port for SMTP (usually 465)
    secure: true, // Usually true if connecting to port 465
    auth: {
      user: "josipvrtlar@gmail.com", // Your email address
      pass: "b b j u d v y n m j u r i w e t", // Password (for gmail, your app password)
      // ⚠️ For better security, use environment variables set on the server for these values when deploying
    },
  });

  let info = {
    from: '"Novi Najam <lovredzaja@gmail.com>',
    to: "dinovrtlar0607@gmail.com",
    subject: "Testing, testing, 123",
    html: `
    <h1>Hello there</h1>
    <p style="color:red;">
        Driver Name: ${driverName} </br>
        Email: ${email} </br>
        Country: ${country} </br>
        Date of Birth: ${dob} </br>
        Postal Code: ${code} </br>
        Phone Number: ${phone} </br>
        Address: ${address} </br>
        Note: ${note} </br>
    </p>
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeuLh5RyUR6FDYZi9MQeD7RoQfU90cY67quA&usqp=CAU" />
    <p>lovredzaja@gmail.com</p>
    `,
  };

  console.log(info.messageId);

  transporter.sendMail(info, (error, info) => {
    if (error) {
      console.log(error);
      res.send('Error');
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Success');
    }
  });
});

app.post('/reservation', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  const dateFrom = req.body.dateFrom;
  const dateTo = req.body.dateTo;
  const carType = req.body.carType;
  const price = req.body.price;

  console.log(name, email, phone, dateFrom, dateTo, carType, price);

  // Save reservation data to database or send it somewhere else
});

app.listen(8090, () => {
  console.log('http://localhost:8090/');
});*/
