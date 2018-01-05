DROP TABLE IF EXISTS stories;
DROP TABLE IF EXISTS authors;

CREATE TABLE authors(
  id serial PRIMARY KEY,
  email text NOT NULL,
  username text NOT NULL 
);

CREATE TABLE stories(
  id serial PRIMARY KEY,
  title text NOT NULL,
  content text,
  author_id int REFERENCES authors ON DELETE RESTRICT
);

INSERT INTO authors(email, username) VALUES('johnDoe@reviewers.com', 'jDoe'), ('sallySmith@reviewers.com', 'SSmith'),('steveJones@reviewers.com', 'sJones'), ('bForrester@reviewers.com', 'bForrester');

INSERT INTO stories(title, content, author_id) VALUES 
('Local Restaurant Reviews', 'Cafe Ole serves very good food', 1),('Music Reviews', 'Must listen to the new Cold Play CD', 2),('Movie Reviews', 'The new Star Wars movie is great',3),('Government opinions', 'President Trump is a scary person', 4);



SELECT * FROM stories;
SELECT * FROM authors;