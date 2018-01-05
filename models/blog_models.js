'use strict';

const express = require('express');
const { DATABASE } = require('../config');
const knex = require('knex')(DATABASE);


const blog = {
  create: function(title, content) {
    console.log('enter blog::create');
    return knex
      .insert([{ title: title, content: content }]).into('stories');
  },
  get: function(id = null) {
    console.log('enter blog::get');
    //return blog based on id
    if (id !== null) {
      console.log('enter get with id');
      return knex.select('id', 'title', 'content')
        .from('stories')
        .where('stories.id', id)
        .orderBy('id', 'asc');
    }
    //return all blogs 
    else {
      console.log('enter get with no id');
      return knex.select('id', 'title', 'content')
        .from('stories')
        .orderBy('id', 'asc');
    }
    // return 'hello';
  },
  delete: function(id) {
    return knex('stories')
      .where('id', id)
      .del();
  },
  update: function(id, title, content) {
    return knex.select('title', 'content')
      .from('stories')
      .where('stories.id', id)
      .returning('id', 'title', 'content')
      .update({
        title: title,
        content: content
      });
  }
}; //end blog



module.exports = { blog };