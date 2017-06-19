'use strict';

var express = require('express');
var router = express.Router();
var models = require('../models');

router.get('/', function(req, res, next){

  models.Page.findAll().then(function(pages){
    res.render("index", {
      pages : pages
    })

  }).catch(next);

});

router.post('/', function (req, res, next) {

    models.User.findOrCreate({
      where: {name: req.body.name,
              email: req.body.email
            }
    })
    .then (function (values) {
      var user = values[0];

      var page = models.Page.build({
        title: req.body.title,
        content: req.body.content,
        status: req.body.status
      });

      return page.save().then(function(page){
        return page.setAuthor(user);
      });
  })
  .then(function (page){
    res.redirect(page.route);
  })
  .catch(next);
});

router.get('/add', function (req, res, next) {

  res.render('addpage');

});

router.get('/:urlTitle', function (req, res, next) {
  // models.Page.findAll({
  //   where: {
  //     urlTitle: req.params.url_title
  //   }
  // }).then(function(page){

  //   res.json(page);
  // });
  models.Page.findOne({
    where: {
      urlTitle: req.params.urlTitle
    }
  })
  .then(function(page){
        res.render('wikipage', {
          page : page
        });
  })
  .catch(next);

});


module.exports = router;
