DROP DATABASE IF EXISTS boomtube_db;
CREATE DATABASE boomtube_db;
\c

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS videos;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS likes;
DROP TABLE IF EXISTS history;
DROP TABLE IF EXISTS favorites;

CREATE TABLE users(
    user_id SERIAL,
    username VARCHAR(25),
    password VARCHAR(25),
    avatar_url VARCHAR(64),
    about TEXT,
    email VARCHAR(25),
    darkmode BOOLEAN
);

CREATE TABLE videos(
    title VARCHAR(64),
    video_url VARCHAR(64),
    thumbnail_url VARCHAR(64),
    descrition TEXT
);
CREATE TABLE users();
CREATE TABLE users();
CREATE TABLE users();
CREATE TABLE users();