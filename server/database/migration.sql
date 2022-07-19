DROP DATABASE IF EXISTS boomtube_db;
CREATE DATABASE boomtube_db;
\c boomtube_db

DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS likes;
DROP TABLE IF EXISTS history;
DROP TABLE IF EXISTS favorites;
DROP TABLE IF EXISTS videos;
DROP TABLE IF EXISTS users;

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(25),
    password VARCHAR(255),
    avatar_url TEXT,
    about TEXT,
    email VARCHAR(25),
    darkmode BOOLEAN DEFAULT false
);

CREATE TABLE videos(
    video_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users ON DELETE CASCADE,
    title VARCHAR(64),
    video_url TEXT,
    thumbnail_url TEXT,
    description TEXT
);

CREATE TABLE comments (
    comment_id SERIAL,
    user_id INTEGER REFERENCES users ON DELETE CASCADE,
    video_id INTEGER REFERENCES videos ON DELETE CASCADE,
    comment_text TEXT
);

CREATE TABLE likes(
    like_id SERIAL,
    user_id INTEGER REFERENCES users ON DELETE CASCADE,
    video_id INTEGER REFERENCES videos ON DELETE CASCADE
);

CREATE TABLE history(
    history_id SERIAL,
    user_id INTEGER REFERENCES users ON DELETE CASCADE,
    video_id INTEGER REFERENCES videos ON DELETE CASCADE
);

CREATE TABLE favorites(
    favorite_id SERIAL,
    user_id INTEGER REFERENCES users ON DELETE CASCADE,
    video_id INTEGER REFERENCES videos ON DELETE CASCADE
);
