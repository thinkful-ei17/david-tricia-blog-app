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

const authors = {
  create: function(username, email) {
    console.log('enter blog::create');
    return knex
      .insert([{ username: username, email: email }]).into('authors');
  },
  get: function(id = null) {
    console.log('enter blog::get');
    //return blog based on id
    if (id !== null) {
      console.log('enter get with id');
      return knex.select('id', 'username', 'email')
        .from('authors')
        .where('authors.id', id)
        .orderBy('id', 'asc');
    }
    //return all blogs 
    else {
      console.log('enter get with no id');
      return knex.select('id', 'username', 'email')
        .from('authors')
        .orderBy('id', 'asc');
    }
    // return 'hello';
  },
  delete: function(id) {
    return knex('authors')
      .where('id', id)
      .del();
  },
  update: function(id, username, email) {
    return knex.select('username', 'email')
      .from('authors')
      .where('authors.id', id)
      .returning('id', 'usrname', 'email')
      .update({
        username: username,
        email: email
      });
  }
}; //end authors

module.exports = { blog, authors };