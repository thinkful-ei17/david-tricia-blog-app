'use strict';
const bodyParser = require('body-parser');
const json = bodyParser.json();
const express = require('express');
const router = express.Router();
const { authors } = require('../models/authors_models');


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
  console.log('enter router.post = ' + req.body.title, req.body.content);

  const title = req.body.title;
  const content = req.body.content;
  authors.create(title, content)
    .then(results => {
      res.json(results);
    });
});

/* ========== PUT/UPDATE A SINGLE ITEM ========== */
router.put('/authors/:id', (req, res) => {
  const { title, content } = req.body;
  const { id } = req.params;
  authors.update(id, title, content)
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