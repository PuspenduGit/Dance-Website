import { randomInt } from 'crypto';
import express from 'express';
import fs from 'fs';
import path from 'path';

const app = express();
const port = 8080;

app.use('/public', express.static('public'));
app.use(express.urlencoded({ extended: true }));

const __dirname = path.resolve();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  const params = { };
  res.status(200).render('home', params);
});

app.get("/about", (req, res) => {
  const params = { };
  res.status(200).render("about", params);
});

app.get("/contact", (req, res) => {
  const params = {};
  res.status(200).render("contact", params);
});

app.get("/service", (req, res) => {
  const params = {};
  res.status(200).render("service", params);
});

app.post("/contact", (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  let phone = req.body.phone;
  let address = req.body.address;
  let desc = req.body.description;

  let count = randomInt(1000000000);

  let outputToWrite = `The name of the client is ${name}, ${email}, ${phone}, ${address}, ${desc}`;

  fs.writeFileSync(`output${count}.txt`, outputToWrite);

  const params = {
    message: "Your form has been submitted successfully",
  };
  res.status(200).render("contact", params);
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
    }
);
