DROP DATABASE IF EXISTS zagat;

CREATE DATABASE zagat;

\c zagat;

CREATE TABLE zagatinfo (
  id serial primary key unique,
  name varchar(150) NOT NULL,
  address varchar(100) NOT NULL,
  coord varchar(100) NOT NULL,
  phone varchar(40) NOT NULL,
  website varchar(40) NOT NULL,
  Monday_open integer NOT NULL,
  Monday_close integer NOT NULL,
  Tuesday_open integer NOT NULL,
  Tuesday_close integer NOT NULL,
  Wednesday_open integer NOT NULL,
  Wednesday_close integer NOT NULL,
  Thursday_open integer NOT NULL,
  Thursday_close integer NOT NULL,
  Friday_open integer NOT NULL,
  Friday_close integer NOT NULL,
  Saturday_open integer NOT NULL,
  Saturday_close integer NOT NULL,
  Sunday_open integer NOT NULL,
  Sunday_close integer NOT NULL
);

\timing

COPY zagatinfo(id, name,
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
  Sunday_close) FROM '/Users/yerincha/Desktop/HackReactor/SDC_zagat/zagat-restaurant-info/db_yerin/data_sql/restaurant1.csv' DELIMITER ',' CSV HEADER