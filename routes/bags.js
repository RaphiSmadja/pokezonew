var express = require('express');
const bcrypt = require('bcrypt')
var router = express.Router();
const models = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const User = models.Users;
const Bags = models.Bags;