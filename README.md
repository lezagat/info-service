# Restaurant Info Module

> Recreating the restaurant info module from the item page on Zagat.com.

## Related Projects

  - https://github.com/the-notorious-f-e-c/zagat-photos-service
  - https://github.com/the-notorious-f-e-c/zagat-google-reviews
  - https://github.com/the-notorious-f-e-c/zagat-reviews

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

> With MongoDB installed, run: 'npm run seed' to seed database with random data.

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- MongoDB
- Express
- Webpack
- Redux
- React
- React Styled Components
- Google Map React
- Jest
- Puppeteer

## CRUD API

This is the example of the response of 'GET' request.

```js
{
    "address": "8452 Union Street Folsom, CA 95630",
    "coords": "37.77621299217993° N, 122.39941299217992° W"
    "Monday_open": 8,
    "Monday_close": 8
    "Tuesday_open": 8,
    "close": 10
    "open": 7,
    "close": 7
    "open": 7,
    "close": 9
    "open": 8,
    "close": 9
    "open": 6,
    "close": 7
    "open": 8,
    "close": 9
    "id": 1,
    "phone": "(834) 394-6382",
    "website": "http://www.thetable.com",
}
```

> Create: 'POST'
Create new restaurant in database

**Success Response:**
Inserts new restaurant

Code: 201
Content: None

**Error Response:**
Code: 500
Content: 'error'

```js
app.post('/api/restaurants', (req, res) => {
  createRestaurant(req.body)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});
```
> Read: 'GET'
Read specific restaurant information with id

**Success Response:**
Restaurant info with id = id in object format
Code: 200

**Error Response:**
Code: 500
Content: 'error'

```js
app.get('/api/restaurants/:id/info/', (req, res) => {
  const { id } = req.params;

  getRestaurantById(id)
    .then(([data]) => {
      res.send(data);
      res.sendStatus(200);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});
```

> Update: 'PUT'
Update specific restaurant's information with id

**Success Response:**
 Updates the restaurant infromation with id = id
Code: 204
Content: None

**Error Response:**
Code: 500

```js
app.put('/api/restaurants/:id/info/', (req, res) => {
  const { id } = req.params;

  updateRestaurantById(id, req.body)
    .then(() => {
      res.send(data);
      res.sendStatus(204);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});

```

> Delete: 'DELETE'
Delete specific estaurant's information with id

**Success Response:** 
Deletes the restaurant with id = id

Code: 204
Content: None

**Error Response:**
Code: 500
Content: 'error'

```js
app.delete('/api/restaurants/:id/info/', (req, res) => {
  const { id } = req.params;

  deleteRestaurantById(id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});
```


### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

