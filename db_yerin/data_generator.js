const faker = require('faker');

const data = require('../db/data.js');

const restaurantAppendix = ['Kitchen', 'Place', 'Palace', 'Shop', 'Restaurant', '', '', '', 'Cafeteria', 'Bar', 'Club', 'House', 'Lodge', 'Table'];

const names = [];
const urls = [];
const coords = [];
const phoneNumbers = [];
const addresses = [];
const hours = [];

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
    const opening = {
      Monday: { open: randomIntFromInterval(6, 11), close: randomIntFromInterval(5, 12) },
      Tuesday: { open: randomIntFromInterval(6, 11), close: randomIntFromInterval(5, 12) },
      Wednesday: { open: randomIntFromInterval(6, 11), close: randomIntFromInterval(5, 12) },
      Thursday: { open: randomIntFromInterval(6, 11), close: randomIntFromInterval(5, 12) },
      Friday: { open: randomIntFromInterval(6, 11), close: randomIntFromInterval(5, 12) },
      Saturday: { open: randomIntFromInterval(6, 11), close: randomIntFromInterval(5, 12) },
      Sunday: { open: randomIntFromInterval(6, 11), close: randomIntFromInterval(5, 12) },
    };
    hours.push(opening);
  }
};
