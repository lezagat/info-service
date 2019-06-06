/* eslint-disable no-loop-func */
const faker = require('faker');
const fs = require('fs');
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
generateRandomPhoneNumbers(1000);
generateRandomUrls(1000);
generateRandomOpeningHours();


const restaurantStream = fs.createWriteStream(`${__dirname}/data_sql/restaurant.csv`, { flag: 'a' });


function writeOneMillionTimes(stream) {
  const start = new Date();
  console.log('start restaurants');
  let i = 100;
  let header = [
    'name',
    'website',
    'coord',
    'address',
    'phone',
    'Monday_open',
    'Monday_close',
    'Tuesday_open',
    'Tuesday_close',
    'Wednesday_open',
    'Wednesday_close',
    'Thursday_open',
    'Thursday_close',
    'Friday_open',
    'Friday_close',
    'Saturday_open',
    'Saturday_close',
    'Sunday_open',
    'Sunday_close',
  ];

  header = `${header.join(',')}\n`;
  stream.write(header);

  function write() {
    let ok = true;

    do {
      let restaurant = [
        names[randomIntFromInterval(0, 1000)],
        urls[randomIntFromInterval(0, 1000)],
        coords[randomIntFromInterval(0, 1000)],
        addresses[randomIntFromInterval(0, 1000)],
        phoneNumbers[randomIntFromInterval(0, 1000)],
        opens[Math.floor(Math.random() * 100)], closes[Math.floor(Math.random() * 100)],
        opens[Math.floor(Math.random() * 100)], closes[Math.floor(Math.random() * 100)],
        opens[Math.floor(Math.random() * 100)], closes[Math.floor(Math.random() * 100)],
        opens[Math.floor(Math.random() * 100)], closes[Math.floor(Math.random() * 100)],
        opens[Math.floor(Math.random() * 100)], closes[Math.floor(Math.random() * 100)],
        opens[Math.floor(Math.random() * 100)], closes[Math.floor(Math.random() * 100)],
        opens[Math.floor(Math.random() * 100)], closes[Math.floor(Math.random() * 100)],
      ];
      restaurant = `${restaurant.join(',')}\n`;
      i -= 1;
      if (i === 0) {
        // last time!
        stream.write(restaurant);
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        ok = stream.write(restaurant);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // had to stop early!
      // write some more once it drains
      stream.once('drain', write);
    }
  }
  write();
  const end = new Date();
  console.log('end restaurants', ' time: ', end - start);
}

writeOneMillionTimes(restaurantStream);

// restaurantStream.end();
