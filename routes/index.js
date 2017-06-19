'use strict';

const express = require('express');
const router = module.exports = express.Router();
const models = require('../models');
const wikiRouter = require('./wiki');
const userRouter = require('./user');


router.get('/', function(req, res, next){

  res.redirect('wiki');

});


router.use('/wiki', wikiRouter);
router.use('/users', userRouter);



