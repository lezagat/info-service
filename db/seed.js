const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/restaurant_info', { useNewUrlParser: true });
const { Schema } = mongoose;
const {
  name,
  urls,
  coords,
  addresses,
  phoneNumbers,
  hours,
} = require('./data.js');

const restaurantSchema = new Schema({

  id: Number,
  name: String,
  location: {
    address: String,
    coords: String,
  },
  phone: String,
  website: String,
  hours: {
    Monday: { open: Number, close: Number },
    Tuesday: { open: Number, close: Number },
    Wednesday: { open: Number, close: Number },
    Thursday: { open: Number, close: Number },
    Friday: { open: Number, close: Number },
    Saturday: { open: Number, close: Number },
    Sunday: { open: Number, close: Number },
  },
});

const Restaurant = mongoose.model('restaurants', restaurantSchema);

// GENERATE RANDOM DATA USING IMPORTED DATA PIECES
// eslint-disable-next-line func-names
(function () {
  const data = [];

  for (let i = 0; i < 100; i += 1) {
    data.push({
      id: (i + 1),
      name: name[i],
      location: {
        address: addresses[i],
        coords: coords[i],
      },
      phone: phoneNumbers[i],
      website: urls[i],
      hours: hours[i],
    });
  }
  // END

  mongoose.connection.collections.restaurants.drop((err) => {
    if (err) { console.log(err); }
    console.log('\nRESTAURANTS COLLECTION DROPPED.');
  });

  // INSERT DATA INTO DB
  Restaurant.insertMany(data, (err) => {
    if (err) {
      console.log(err);
    }
    console.log('DB seeded!');
    mongoose.connection.close();
  });
}());

module.exports = Restaurant;
