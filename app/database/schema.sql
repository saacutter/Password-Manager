DROP TABLE IF EXISTS passwords;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id          INTEGER PRIMARY KEY NOT NULL,
    username    TEXT UNIQUE NOT NULL,
    password    TEXT NOT NULL,
    last_login  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE passwords (
    id              INTEGER PRIMARY KEY NOT NULL,
    user_id         INT NOT NULL,
    name            TEXT NOT NULL,
    username        TEXT,
    password        TEXT,
    website         TEXT,
    details         TEXT,
    creation_date   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_edited     DATETIME DEFAULT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);