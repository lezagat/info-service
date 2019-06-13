/* eslint-disable no-console */
const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
require('newrelic');
const {
  getRestaurantById, createRestaurant, deleteRestaurantById, updateRestaurantById,
} = require('../db_yerin/index.js');

const PORT = 3002;

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '/../public')));
app.get('/restaurants/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '/../public/index.html'));
});

app.get('/api/restaurants/:id/info/', getRestaurantById);

app.post('/api/restaurants', (req, res) => {
  createRestaurant(req.body, (err) => {
    if (err) {
      res.sendStatus(500);
      return;
    }
    res.send('POSTED').status(201);
  });
});

app.delete('/api/restaurants/:id', (req, res) => {
  const { id } = req.params;
  deleteRestaurantById(id, (err) => {
    if (err) {
      res.sendStatus(500);
      return;
    }
    res.send('Deleted').status(204);
  });
});

app.put('/api/restaurants/:id', (req, res) => {
  const { id } = req.params;
  console.log('update: ', id, req.body);
  updateRestaurantById(id, req.body, (err) => {
    if (err) {
      res.sendStatus(500);
      return;
    }
    res.send('Updated').status(204);
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`);
});
