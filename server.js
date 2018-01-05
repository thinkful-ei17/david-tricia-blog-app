'use strict';

const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const stories_router = require('./routers/stories-router');
const authors_router = require('./routers/authors-router');

const { PORT } = require('./config');
const app = express();
app.use(morgan('common'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use('/api/v1', stories_router);
app.use('/api/v2', authors_router);

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

if (require.main === module) {
  const server = app.listen(PORT, () => {
    console.info(`App listening on port ${server.address().port}`);
  })
    .on('error', err => {
      console.error(err);
    });
}

module.exports = { app };