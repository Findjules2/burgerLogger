DROP DATABASE IF EXISTS burgerLoggerDB;

-- Create the database day_planner_db and specified it for use.
CREATE DATABASE burgerLoggerDB;

USE burgerLoggerDB;

-- Create the table movies.
CREATE TABLE burgers (
  id int NOT NULL AUTO_INCREMENT,
  burger varchar(255) NOT NULL,
  devoured BOOLEAN NOT NULL default 0,
  PRIMARY KEY (id)
);