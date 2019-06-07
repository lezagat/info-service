/* eslint-disable no-loop-func */
const fs = require('fs');

// psql -f file_with_sql.sql

const opens = [];
const closes = [];

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

generateRandomOpeningHours();

const restaurantStream = fs.createWriteStream(`${__dirname}/data_sql/hours_sql.csv`, { flag: 'a' });


function writeManyTimes(stream, cb) {
  const start = new Date();
  console.log('start hours');
  let i = 10000000;
  let header = ['Monday_open',
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
    'restaurant_id'];

  header = `${header.join(',')}\n`;
  stream.write(header);
  
  function write() {
    let ok = true;

    do {
      let restaurant = [
        opens[Math.floor(Math.random() * 99)], closes[Math.floor(Math.random() * 99)],
        opens[Math.floor(Math.random() * 99)], closes[Math.floor(Math.random() * 99)],
        opens[Math.floor(Math.random() * 99)], closes[Math.floor(Math.random() * 99)],
        opens[Math.floor(Math.random() * 99)], closes[Math.floor(Math.random() * 99)],
        opens[Math.floor(Math.random() * 99)], closes[Math.floor(Math.random() * 99)],
        opens[Math.floor(Math.random() * 99)], closes[Math.floor(Math.random() * 99)],
        opens[Math.floor(Math.random() * 99)], closes[Math.floor(Math.random() * 99)],
        i,
      ];
      restaurant = `${restaurant.join(',')}\n`;
      i -= 1;
      if (i === 0) {
        // last time!
        stream.write(restaurant, 'utf8', cb);
        const end = new Date();
        console.log('end hours', ' time: ', end - start, 'ms');
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
}

writeManyTimes(restaurantStream, () => {
  restaurantStream.end();
});

// COPY hours(Monday_open, Monday_close, Tuesday_open, Tuesday_close, Wednesday_open, Wednesday_close, Thursday_open, Thursday_close, Friday_open, Friday_close, Saturday_open, Saturday_close, Sunday_open, Sunday_close, restaurant_id) FROM '/Users/yerincha/Desktop/HackReactor/SDC_zagat/zagat-restaurant-info/db_yerin/data_sql/hours_sql.csv' DELIMITER ',' CSV HEADER;

// \ timing on
