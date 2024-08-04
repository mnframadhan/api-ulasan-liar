-- PRAGMA defer_foreign_keys = on;

-- alter table review drop column verified;

-- alter table review add column agree INTEGER DEFAULT 0;
-- alter table review add column disagree INTEGER DEFAULT 0;

-- alter table review add column created_at;

-- UPDATE review SET created_at = '1721685585812';

-- alter table user add verified BOOLEAN DEFAULT false;


-- create table user (
--     id INTEGER PRIMARY KEY,
--     created_at TEXT NOT NULL,
--     name TEXT NOT NULL,
--     jenis TEXT NOT NULL,
--     description TEXT NOT NULL,
--     gambar1 TEXT NOT NULL,
--     gambar2 TEXT NOT NULL,
--     verified BOOLEAN DEFAULT FALSE
-- );


-- create table review (
--     id INTEGER PRIMARY KEY,
--     user_id INTEGER,
--     reviewer_name TEXT NOT NULL,
--     review TEXT NOT NULL,
--     score INTEGER NOT NULL,
--     verified BOOLEAN DEFAULT FALSE,
--     FOREIGN KEY(user_id) REFERENCES user (id)
-- );

-- alter table review add column created_at;
-- alter table review add column agree DEFAULT 0;
-- alter table review add column disagree DEFAULT 0;

-- alter table user add column nreview default 0;
-- create table admin (
--     username TEXT NOT NULL,
--     password TEXT NOT NULL,
--     token TEXT
-- )

alter table user add column gmaps_url;