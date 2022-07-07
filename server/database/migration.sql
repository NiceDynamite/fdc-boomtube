DROP DATABASE IF EXISTS boomtube_db;
CREATE DATABASE boomtube_db;
\c

DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS likes;
DROP TABLE IF EXISTS history;
DROP TABLE IF EXISTS favorites;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS videos;

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
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

CREATE TABLE comments (
    comment_id SERIAL,
    user_id INTEGER REFERENCES users ON DELETE CASCADE,
    video_id INTEGER REFERENCES videos ON DELETE CASCADE,
    comment_text TEXT
);

CREATE TABLE likes(
    user_id INTEGER REFERENCES users ON DELETE CASCADE,
    video_id INTEGER REFERENCES videos ON DELETE CASCADE
);

CREATE TABLE history(
    user_id INTEGER REFERENCES users ON DELETE CASCADE,
    video_id INTEGER REFERENCES videos ON DELETE CASCADE
);

CREATE TABLE favorites(
    user_id INTEGER REFERENCES users ON DELETE CASCADE,
    video_id INTEGER REFERENCES videos ON DELETE CASCADE
);