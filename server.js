'use strict';

const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const storiesRouter = require('./routers/stories-router');
const blog = require('./server');
const { PORT } = require('./config');
const { DATABASE } = require('./config');
const app = express();
const knex = require('knex')(DATABASE);

app.use(morgan('common'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

app.use('/api/v0', blog);
app.use('/api/v1', storiesRouter);
app.use('/api/v1', storiesRouter);

// Catch-all endpoint for requests to non-existent endpoint
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Catch-all endpoint for errors
// Prevent stacktrace from being leaked to user in production
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: (app.get('env') === 'development') ? err : {}
  });
});

const server = app.listen(PORT, () => {
  console.info(`App listening on port ${server.address().port}`);
})
  .on('error', err => {
    console.error(err);
  });


app.get('/api/v0', (req, res) => {
  knex.select('id', 'title', 'content')
    .from('stories')
    .then(results => {
      res.json(results);
      res.sendStatus(200);
    });
});

app.get('/api/v0/:id', (req, res) => {
  knex.select('id', 'title', 'content')
    .from('stories')
    .where('stories.id', req.params.id)
    .then(results => {
      res.json(results);
      res.sendStatus(200);
    });
});

app.post('/api/v0', jsonParser, (req, res) => {
  knex
    .insert([{ title: req.body.title, content: req.body.content }]).into('stories')
    .then(results => {
      res.json(results);
      res.sendStatus(201);
    });
});

app.put('/api/v0/:id', (req, res) => {
  knex.select('title', 'content')
    .from('stories')
    .where('stories.id', req.params.id)
    .returning('id', 'title', 'content')
  // .insert([{title: req.body.title}, {content: req.body.content}])
    .update({
      title: req.body.title,
      content: req.body.content
    })
    .then(results => {
      res.json(results);
      res.sendStatus(201);
    });
});

app.delete('/api/v0/:id', (req, res) => {
  knex('stories')
    .where('id', req.params.id)
    .del()
    .then(results => {
      res.json(results);
      res.sendStatus(204);
    });
});