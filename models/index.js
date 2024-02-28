const fs = require("fs");
const path = require("path");
const { Sequelize, Model, DataTypes } = require("sequelize");
const basename = path.basename(__filename);
// const db = {};

const sequelize = new Sequelize('postgres://postgres:admin@localhost:5432/pokezone')

try {
	sequelize.authenticate();
	console.log('Connection has been established successfully.');
} catch (error) {
	console.error('Unable to connect to the database:', error);
}

const user = require(`${__dirname}/users`)(sequelize, DataTypes)
const pokemon = require(`${__dirname}/pokemons`)(sequelize, DataTypes)
const bag = require(`${__dirname}/bags`)(sequelize, DataTypes)
const moves = require(`${__dirname}/moves`)(sequelize, DataTypes)

var db = {
	Users: user,
	Bags: bag,
	Pokemons: pokemon,
	Moves: moves
}

Object.keys(db).forEach(modelName => {
	if ('associate' in db[modelName]) {
		console.log(db[modelName])
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;