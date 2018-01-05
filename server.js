'use strict';

const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const stories_router = require('./routers/stories-router');

const { PORT } = require('./config');
const app = express();
app.use(morgan('common'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use('/api/v1', stories_router);

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

  describe('blog-app', function() {

    before(function() {
        return runServer();
    });
  
    after(function() {
        return closeServer();
    });
  
    it('should list items on GET', function() {
        return chai.request(app)
            .get('/api/v0')
            .then(function(res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.length.should.be.at.least(1);
                const expectedKeys = ['id', 'title', 'content'
                // , 'author', 
                ];
                res.body.forEach(function(item) {
                    item.should.be.a('object');
                    item.should.include.keys(expectedKeys);
                });
            });
    });
    it('should add an item on POST', function() {
        const newItem = { title: req.body.title , content: req.body.content
        // , author: 'Bill Forrester' 
      };
        return chai.request(app)
            .post('/api/v0')
            .send(newItem)
            .then(function(res) {
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.include.keys('id', 'title', 'content', 
                
                // 'author'
                );
                res.body.id.should.not.be.null;
                res.body.should.deep.equal(Object.assign(newItem, { id: res.body.id, title: res.body.title, content: res.body.content 
                  // author: res.body.author
                 }));
            });
    });
  
    it('should update items on PUT', function() {
        const updateData = {
            title: req.params.title,
            content: req.params.content
        };
  
        return chai.request(app)
            
            .get('/api/v0/:id')
            .then(function(res) {
                console.log('test - update data, first get', res.body[0].id);
                updateData.id = res.body[0].id;
                
                return chai.request(app)
                    .put(`/api/v0/:id${updateData.id}`)
                    .send(updateData);
            })
            // prove that the PUT request has right status code
            .then(function(res) {
                res.should.have.status(201);
            });
    });
  
    
    it('should delete items on DELETE', function() {
        return chai.request(app)
            
            .get('/api/v0/:id')
            .then(function(res) {
                return chai.request(app)
                    .delete(`/api/v0/:id ${res.body[0].id}`);
            })
            .then(function(res) {
                res.should.have.status(204);
            });
    });
  });