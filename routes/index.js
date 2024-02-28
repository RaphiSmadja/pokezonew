var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render("authentication/login.html");
});

router.get('/choosePokemon', function(req, res, next) {
  res.render("choose/choosePokemon.html");
});

/* GET home page. */
router.get('/signin', function(req, res, next) {
  res.render("authentication/registration.html");
});

router.get('/pokemon', function(req, res, next) {
  console.log(req.session)
  console.log(req.session.firstname)
  res.render('pokemon/game.html', {sess: req.session})
});

module.exports = router;