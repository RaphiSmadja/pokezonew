const { Pokemons } = require(".");
const {Pokemon } = require("../models/pokemons")


module.exports = function (sequelize, DataTypes) {
    const Moves = sequelize.define("Moves", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        accuracy: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        pp_remain: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        pp: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        id_pokemon: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        id_moves: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        priority: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        power: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }

    }, {
        tableName: "moves",
        paranoid: true,
        freezeTableName: true
        // désactive la modification des noms de tableaux; Par défaut, la mise à jour automatiquement
        // transforme tous les noms de modèles passés (premier paramètre de définition) en pluriel.
        // si vous ne voulez pas cela, définissez le suivant
    });
    
    Moves.associate = (models) => {
        Moves.belongsTo(models.Pokemons, {
            foreignKey: 'id_pokemon',
        });
    };

    return Moves;
};
