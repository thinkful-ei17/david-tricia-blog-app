'use strict';
const bodyParser = require('body-parser');
const json = bodyParser.json();
const express = require('express');
const router = express.Router();
const { authors } = require('../models/blog_models');


/* ========== GET/READ ALL ITEMS ========== */
router.get('/authors', (req, res) => {
  authors.get()
    .then(results => {
      res.json(results);
    });
});

/* ========== GET/READ SINGLE ITEMS ========== */
router.get('/authors/:id', (req, res) => {
  authors.get(req.param.id)
    .then(results => {
      res.json(results);
    });
});

/* ========== POST/CREATE ITEM ========== */
router.post('/authors', (req, res) => {
  console.log('enter router.post = ' + req.body.username, req.body.email);

  const username = req.body.username;
  const email = req.body.email;
  authors.create(username, email)
    .then(results => {
      res.json(results);
    });
});

/* ========== PUT/UPDATE A SINGLE ITEM ========== */
router.put('/authors/:id', (req, res) => {
  const { username, email } = req.body;
  const { id } = req.params;
  authors.update(id, username, email)
    .then(results => {
      res.json(results);
    });
  // res.status(204).end();
});

/* ========== DELETE/REMOVE A SINGLE ITEM ========== */
router.delete('/authors/:id', (req, res) => {
  authors.delete(req.params.id)
    .then(results => {
      res.json(results);
    });
  // res.status(204).end();
});

module.exports = router;