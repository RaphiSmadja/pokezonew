const { Moves } = require(".");

module.exports = function (sequelize, DataTypes) {
    const Pokemons = sequelize.define("Pokemons", {
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
        back_image: {
            type: DataTypes.STRING,
            allowNull: false
        },
        front_image: {
            type: DataTypes.STRING,
            allowNull: false
        },
        id_user: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        id_pokemon: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        level: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        attack: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        special_attack: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        defense: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        special_defense: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        speed: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        hp_remaining: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        hp: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        }

    }, {
        tableName: "pokemons",
        paranoid: true,
        freezeTableName: true
        // désactive la modification des noms de tableaux; Par défaut, la mise à jour automatiquement
        // transforme tous les noms de modèles passés (premier paramètre de définition) en pluriel.
        // si vous ne voulez pas cela, définissez le suivant
    });
    
    
    Pokemons.associate = (models) => {
        Pokemons.belongsTo(models.Users, {
            foreignKey: 'id_user',
        });
        Pokemons.hasMany(models.Moves, {
            foreignKey: 'id_pokemon',
            sourceKey: 'id',
            as: 'pokemons'
        });
    };
    return Pokemons;
};
