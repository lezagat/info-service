/* eslint-disable no-loop-func */
const faker = require('faker');
const fs = require('fs');
const JSONToCSV = require('json2csv').parse;
const data = require('../db/data.js');


// psql -f file_with_sql.sql
const restaurantAppendix = ['Kitchen', 'Place', 'Palace', 'Shop', 'Restaurant', '', '', '', 'Cafeteria', 'Bar', 'Club', 'House', 'Lodge', 'Table'];

const names = [];
const urls = [];
const coords = [];
const phoneNumbers = [];
const addresses = [];
const opens = [];
const closes = [];


// name
const generateRandomName = (num) => {
  for (let i = 1; i <= num; i += 1) {
    const restaurant = data.name[Math.floor(Math.random() * (data.name.length - 1))];
    names.push(`${restaurant} ${restaurantAppendix[Math.floor(Math.random() * (restaurantAppendix.length - 1))]}`);
  }
};

// urls
const generateRandomUrls = (num) => {
  for (let i = 1; i <= num; i += 1) {
    const url = faker.internet.url();
    urls.push(url);
  }
};

// coords
const generateRandomCoords = (num) => {
  for (let i = 1; i <= num; i += 1) {
    const longitude = faker.address.longitude();
    const latitude = faker.address.latitude();
    const coord = `${latitude} ${longitude}`;
    coords.push(coord);
  }
};

// addresses
const generateAddresses = (num) => {
  for (let i = 1; i <= num; i += 1) {
    const street = faker.address.streetAddress();
    const city = faker.address.city();
    const zip = faker.address.zipCode();
    const state = faker.address.stateAbbr();
    const address = `${street} ${city} ${state} ${zip}`;
    addresses.push(address);
  }
};

// create phoneNumbers
const generateRandomPhoneNumbers = (num) => {
  for (let i = 1; i <= num; i += 1) {
    const number = faker.phone.phoneNumberFormat();
    const phoneNumber = `(${number.slice(0, 3)}) ${number.slice(4)}`;
    phoneNumbers.push(phoneNumber);
  }
};


// min and max included
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// hours

const generateRandomOpeningHours = () => {
  for (let i = 1; i <= 100; i += 1) {
    const open = randomIntFromInterval(6, 11);
    const close = randomIntFromInterval(5, 12);
    opens.push(open);
    closes.push(close);
  }
};

generateAddresses(1000);
generateRandomCoords(1000);
generateRandomName(1000);
generateRandomOpeningHours(1000);
generateRandomPhoneNumbers(1000);
generateRandomUrls(1000);

const generateRestaurant = () => {
  for (let j = 1; j <= 100; j += 1) {
    const restaurants = [];
    for (let i = 1; i <= 10000; i += 1) {
      const restaurant = {
        name: names[randomIntFromInterval(0, 1000)],
        website: urls[randomIntFromInterval(0, 1000)],
        coords: coords[randomIntFromInterval(0, 1000)],
        address: addresses[randomIntFromInterval(0, 1000)],
        phone: phoneNumbers[randomIntFromInterval(0, 1000)],
      };
      restaurants.push(restaurant);
    }
    const csv = JSONToCSV(restaurants, { fields: ['name', 'website', 'coords', 'address', 'phone'] });
    fs.writeFileSync(`${__dirname}/data_sql/restaurant${j}.csv`, csv);
    console.log(`Success to save restaurant file ${j}`);
  }
};

const generateHours = () => {
  let counter = 1;
  for (let j = 1; j <= 100; j += 1) {
    const hours = [];
    for (let i = 1; i <= 10000; i += 1) {
      generateRandomOpeningHours();
      const hour = {
        Monday_open: opens[Math.floor(Math.random() * 100)],
        Monday_close: closes[Math.floor(Math.random() * 100)],
        Tuesday_open: opens[Math.floor(Math.random() * 100)],
        Tuesday_close: closes[Math.floor(Math.random() * 100)],
        Wednesday_open: opens[Math.floor(Math.random() * 100)],
        Wednesday_close: closes[Math.floor(Math.random() * 100)],
        Thursday_open: opens[Math.floor(Math.random() * 100)],
        Thursday_close: closes[Math.floor(Math.random() * 100)],
        Friday_open: opens[Math.floor(Math.random() * 100)],
        Friday_close: closes[Math.floor(Math.random() * 100)],
        Saturday_open: opens[Math.floor(Math.random() * 100)],
        Saturday_close: closes[Math.floor(Math.random() * 100)],
        Sunday_open: opens[Math.floor(Math.random() * 100)],
        Sunday_close: closes[Math.floor(Math.random() * 100)],
        restaurant_id: counter,
      };
      hours.push(hour);
      counter += 1;
    }
    const csv = JSONToCSV(hours, { fields: ['Monday_open', 'Monday_close', 'Tuesday_open', 'Tuesday_close', 'Wednesday_open', 'Wednesday_close', 'Thursday_open', 'Thursday_close', 'Friday_open', 'Friday_close', 'Saturday_open', 'Saturday_close', 'Sunday_open', 'Sunday_open', 'restaurant_id'] });
    fs.writeFileSync(`${__dirname}/data_sql/hours${j}.csv`, csv);
    console.log(`Success to save hour file ${j}`);
  }
};
generateHours();
generateRestaurant();
