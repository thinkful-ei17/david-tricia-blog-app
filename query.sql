DROP TABLE IF EXISTS stories;
DROP TABLE IF EXISTS authors;

CREATE TABLE stories(
  id serial PRIMARY KEY,
  title text NOT NULL,
  content text,
  author_id int REFERENCES authors ON DELETE RESTRICT,
);

CREATE TABLE authors(
  id serial PRIMARY KEY,
  email text NOT NULL,
  username text NOT NULL 
);

INSERT INTO stories(title, content,author_id) VALUES 
('Local Restaurant Reviews', 'Cafe Ole serves very good food','Maki'),('Music Reviews', 'Must listen to the new Cold Play CD','Coldplay'),('Movie Reviews', 'The new Star Wars movie is great','George Lucas'),('Government opinions', 'President Trump is a scary person','Trump');

SELECT * FROM stories;