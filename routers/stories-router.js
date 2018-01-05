'use strict';
const bodyParser = require('body-parser');
const json = bodyParser.json();
const express = require('express');
const router = express.Router();
const { blog } = require('../models/blog_models');


/* ========== GET/READ ALL ITEMS ========== */
router.get('/stories', (req, res) => {
  blog.get()
    .then(results => {
      res.json(results);
    });
});

/* ========== GET/READ SINGLE ITEMS ========== */
router.get('/stories/:id', (req, res) => {
  blog.get(req.param.id)
    .then(results => {
      res.json(results);
    });
});

/* ========== POST/CREATE ITEM ========== */
router.post('/stories', (req, res) => {
  console.log('enter router.post = ' + req.body.title, req.body.content);

  const title = req.body.title;
  const content = req.body.content;
  blog.create(title, content)
    .then(results => {
      res.json(results);
    });
});

/* ========== PUT/UPDATE A SINGLE ITEM ========== */
router.put('/stories/:id', (req, res) => {
  const { title, content } = req.body;
  const { id } = req.params;
  blog.update(id, title, content)
    .then(results => {
      res.json(results);
    });
  // res.status(204).end();
});

/* ========== DELETE/REMOVE A SINGLE ITEM ========== */
router.delete('/stories/:id', (req, res) => {
  blog.delete(req.params.id)
    .then(results => {
      res.json(results);
    });
  // res.status(204).end();
});

module.exports = router;

