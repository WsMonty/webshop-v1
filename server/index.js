const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();

const cors = require('cors');

const corsOptions = {
  origin: '*',
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get('/', cors(corsOptions), (req, res) => {
  res.send('Hello World!');
});

app.post('/test', cors(corsOptions), (req, res) => {
  const { works } = req.body;
  const { userMail } = req.body;
  // console.log(works);
  res.send('Success!');

  const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const worksMarkup = works.map((work) => {
    return `
      <li>
        <h2>${work.title}</h2>
        <p>${work.price}€</p>
      </li>
      `;
  });
  const totalPrice = works.reduce((acc, work) => (acc += work.price), 0);

  transport.sendMail({
    from: process.env.MAIL_FROM,
    to: userMail,
    subject: 'test email :)',
    html: `<div>
              <h1>Thanks for your purchase! :)</h1>
              <ul style='list-style: none;'>
                 ${worksMarkup}
              </ul>
              <h3>Total Price: ${totalPrice}€</h3>
           </div>
    `,
  });
});

app.listen(port, () => {
  console.log(`Listens on port ${port}`);
});
