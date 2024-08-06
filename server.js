const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://root:pass@127.0.0.1:27017/Students', {
  useNewUrlParser: true,
  authSource: "admin",
  useUnifiedTopology: true
}) // When using natively
// mongoose.connect('mongodb://mongoDb:27017/Students', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }) // When using with Docker
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error(`Error connecting to MongoDB: ${err}`));

const app = express();

// Define a schema and model for animals
const animalSchema = new mongoose.Schema({
  name: String,
  species: String
});

const Animal = mongoose.model('Animal', animalSchema);

app.get('/', (req, res) => {
  res.send('Welcome to the world of animals.');
});

app.get('/animals', async (req, res) => {
  try {
    const animals = await Animal.find();
    res.json({ animals });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

app.listen(5000, () => {
  console.log('Server started on port 5000');
});
