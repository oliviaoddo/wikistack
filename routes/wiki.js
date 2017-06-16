'use strict';

var express = require('express');
var router = express.Router();
var models = require('../models');

router.get('/', function(req, res, next){

  res.render('index');

});

router.post('/', function (req, res, next) {

    var page = models.Page.build({
        title:  req.body.title,
        content: req.body.content,
        status: req.body.status,
    });

    page.save()
    .then(function(newPage){
        res.redirect(newPage.get('route'));
});

});

router.get('/add', function (req, res, next) {

  res.render('addpage');

});


module.exports = router;
