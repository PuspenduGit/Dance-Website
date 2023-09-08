import express from 'express';
import path from 'path';
import mongoose from 'mongoose';

const app = express();
const port = 8080;

mongoose.connect('mongodb://localhost:27017/DanceContact', {
  useNewUrlParser: true, 
  useUnifiedTopology: true
});

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  address: String,
  desc: String
});

var contactInfo  = mongoose.model('Contact', contactSchema);

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

  let contact = new contactInfo({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    desc: req.body.desc
  });

  contact.save().then(() => {
    res.status(200).send("Your form has been submitted successfully");
  }).catch(() => {
    res.status(400).send("Your form has not been submitted successfully");
  });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
    }
);
