DROP TABLE IF EXISTS stories;

CREATE TABLE stories(
  id serial PRIMARY KEY,
  title text NOT NULL,
  content text
);

INSERT INTO stories(title, content) VALUES ('Local Restaurant Reviews', 'Cafe Ole serves very good food'),('Music Reviews', 'Must listen to the new Cold Play CD'),('Movie Reviews', 'The new Star Wars movie is great'),('Government opinions', 'President Trump is a scary person');

SELECT * FROM stories;