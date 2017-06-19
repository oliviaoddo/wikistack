'use strict';

var express = require('express');
var router = express.Router();
var models = require('../models');

router.get('/', function(req, res, next){
  models.User.findAll().then(function(users){

    res.render('users',{
      users : users
    })

  }).catch(next);

})

router.get('/:id', function(req, res, next){

  var userPromise = models.User.findById(req.params.id);
  var pagesPromise = models.Page.findAll({
    where: {
      authorId: req.params.id
    }
  });

  Promise.all([
    userPromise,
    pagesPromise
  ])
  .then(function(values) {
    var user = values[0];
    var pages = values[1];
    res.render('user', { user: user, pages: pages });
  })
  .catch(next);

})




module.exports = router;
