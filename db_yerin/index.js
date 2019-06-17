/* eslint-disable prefer-template */
/* eslint-disable no-restricted-syntax */
const { Pool } = require('pg');

const connectionString = 'postgres://postgres:new_password@18.219.107.154/zagat';

const pool = new Pool({ connectionString });

pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res);
});

const getRestaurantById = (req, res) => {
  const q = 'SELECT * from zagatinfo WHERE id = ' + req.params.id + ';';
  pool.query(q, (err, results) => {
    const result = results.rows[0];
    if (err) {
      res.sendStatus(500);
    } else {
      let cor = result.coord;
      const corArr = cor.split(' ');
      cor = corArr[0] + ',' + corArr[1];
      const data = {};
      data.location = {
        address: result.address,
        coords: cor,
      };
      data.hours = {
        Monday: {
          open: result.monday_open,
          close: result.monday_close,
        },
        Tuesday: {
          open: result.tuesday_open,
          close: result.tuesday_close,
        },
        Wednesday: {
          open: result.wednesday_open,
          close: result.wednesday_close,
        },
        Thursday: {
          open: result.thursday_open,
          close: result.thursday_close,
        },
        Friday: {
          open: result.friday_open,
          close: result.friday_close,
        },
        Saturday: {
          open: result.saturday_open,
          close: result.saturday_close,
        },
        Sunday: {
          open: result.sunday_open,
          close: result.sunday_close,
        },
      };
      data.id = result.id;
      data.phone = result.phone;
      data.website = result.website;
      res.send(data);
      // res.send(result.rows[0]).status(200);
    }
  });
};

const createRestaurant = (data, cb) => {
  pool.query(`INSERT INTO zagatinfo (name, address, coord, phone, website, monday_open, monday_close, tuesday_open, tuesday_close, wednesday_open, wednesday_close, thursday_open,  thursday_close,  friday_open,  friday_close,  saturday_open,  saturday_close,  sunday_open,  sunday_close) VALUES (
  '${data.name}', '${data.address}', '${data.coord}', '${data.phone}', '${data.website}', ${data.monday_open}, ${data.monday_close}, ${data.tuesday_open}, ${data.tuesday_close}, ${data.wednesday_open}, ${data.wednesday_close}, ${data.thursday_open}, ${data.thursday_close}, ${data.friday_open}, ${data.friday_close}, ${data.saturday_open}, ${data.saturday_close}, ${data.sunday_open}, ${data.sunday_close});`, (err) => {
    if (err) {
      cb(err);
      return;
    }
    cb(null);
  });
};

const deleteRestaurantById = (id, cb) => {
  pool.query(`DELETE from zagatinfo WHERE id = ${id}`, (err, result) => {
    if (err) {
      cb(err);
      return;
    }
    console.log(`deleted ${result} rows`);
    cb(null);
  });
};

const updateRestaurantById = (id, data, cb) => {
  let str = '';
  if (typeof data === 'object') {
    for (const key in data) {
      if (str.length === 0) {
        str += `${key} = '${data[key]}'`;
      } else {
        str += `, ${key} = '${data[key]}'`;
      }
    }
  }

  pool.query(`UPDATE zagatinfo set ${str} WHERE id = ${id}`, (err) => {
    if (err) {
      cb(err);
      return;
    }
    cb(null);
  });
};

module.exports = {
  getRestaurantById, createRestaurant, deleteRestaurantById, updateRestaurantById,
};
