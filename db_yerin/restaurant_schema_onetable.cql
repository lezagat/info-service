tracing on

DROP KEYSPACE IF EXISTS restaurant;

CREATE KEYSPACE restaurant WITH REPLICATION = { 
   'class' : 'SimpleStrategy', 
   'replication_factor' : 1 
  };

USE restaurant;

CREATE TABLE restaurants (
  id INT PRIMARY KEY,
  address text,
  coord text,
  phone text,
  website text,
  Monday_open int,
  Monday_close int,
  Tuesday_open int,
  Tuesday_close int,
  Wednesday_open int,
  Wednesday_close int,
  Thursday_open int,
  Thursday_close int,
  Friday_open int,
  Friday_close int,
  Saturday_open int,
  Saturday_close int,
  Sunday_open int,
  Sunday_close int,
  name text
);

CREATE INDEX names ON restaurants(name);


COPY restaurants(id, name,
  address,
  coord,
  phone,
  website,
  Monday_open,
  Monday_close,
  Tuesday_open,
  Tuesday_close,
  Wednesday_open,
  Wednesday_close,
  Thursday_open,
  Thursday_close,
  Friday_open,
  Friday_close,
  Saturday_open,
  Saturday_close,
  Sunday_open,
  Sunday_close) FROM '/Users/yerincha/Desktop/HackReactor/SDC_zagat/zagat-restaurant-info/db_yerin/data_sql/restaurant1.csv' WITH DELIMITER = ',' AND HEADER = TRUE;

  --source 'restaurant_schema_onetable.cql';
  --create index restaurants on name;