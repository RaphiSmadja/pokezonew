var express = require('express');
const bcrypt = require('bcrypt')
var router = express.Router();
const models = require("../models");
const Sequelize = require("sequelize");
const { route } = require('.');
var path = require('path');
const url = require('url');
const Op = Sequelize.Op;
const User = models.Users;
const Pokemon = models.Pokemons;

router.post('/signup', function (req, res, next) {
  console.log(req.body)
  User.findOne({
    where: {
      [Op.or]: [
        { email: req.body.email },
        { pseudo: req.body.pseudo }
      ]
    }
  }).then(userfound => {
    if (userfound) {
      res.json({ msg: "NOK", resultCode: 0, result: "User Already Existed" });
    } else {
      User.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        pseudo: req.body.pseudo,
        gender: req.body.gender,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        avatar: null
      }).then(() =>
        res.redirect("/"))
        .catch(error => res.status(400).json({ error }));
    }
  }).catch(err => {
    res.json({ msg: "NOK", resultCode: 0, err: err });
  })
})

router.post('/signin', function (req, res, next) {
  // Capture the input fields
  let username = req.body.username;
  let password = req.body.password;
  if (username && password) {
    User.findOne({
      where: {
        [Op.or]: [
          {
            email: username
          },
          {
            pseudo: username
          }
        ]
      }
    }).then(userfound => {
      if (userfound) {
        bcrypt.compare(password, userfound.password, function (err, cryption) {
          if (cryption === true) {
            let sess = req.session;
            sess.status = userfound.status;
            sess.userid = userfound.id;
            sess.firstname = userfound.firstname;
            sess.lastname = userfound.lastname;
            sess.pseudo = userfound.pseudo;
            sess.email = userfound.email;
            res.setHeader("pseudo", sess.pseudo)
            Pokemon.findOne({
              where: {
                id_user: userfound.id
              }
            }).then(pokeForUser => {
              if (pokeForUser) {
                res.redirect("/pokemon")
              } else {
                res.redirect("/choosePokemon")
              }
            })
          } else {
            res.redirect('/')
          }
        });
      }
    }).catch(err => {
      console.log(err)
      res.redirect('/')
    })
  }
})


module.exports = router;
