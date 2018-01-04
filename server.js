'use strict';

const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const storiesRouter = require('./routers/stories-router');

const { PORT } = require('./config');
const { DATABASE } = require('./config');
const app = express();
const knex = require('knex')(DATABASE);

app.use(morgan('common'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

app.use('/api/v1', storiesRouter);
app.use('/api/v2', storiesRouter);


app.get('/api/v0', (req, res) => {
  console.log('enter app.get');
  knex.select('id', 'title', 'content')
    .from('stories')
    .orderBy('id', 'asc')
    .then(results => {
      res.status(200).json(results);
    });
});

app.get('/api/v0/:id', (req, res) => {
  knex.select('id', 'title', 'content')
    .from('stories')
    .where('stories.id', req.params.id)
    .orderBy('id', 'asc')
    .then(results => {
      res.status(200).json(results);
    });
});

app.post('/api/v0', jsonParser, (req, res) => {
  knex
    .insert([{ title: req.body.title, content: req.body.content }]).into('stories')
    .then(results => {
      res.status(201).json(results);
    });
});

app.put('/api/v0/:id', (req, res) => {
  knex.select('title', 'content')
    .from('stories')
    .where('stories.id', req.params.id)
    .returning('id', 'title', 'content')
    .update({
      title: req.body.title,
      content: req.body.content
    })
    .then(results => {
      res.status(201).json(results);
    });
});

app.delete('/api/v0/:id', (req, res) => {
  knex('stories')
    .where('id', req.params.id)
    .del()
    .then(results => {
      res.status(204).json(results);
    });
});


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