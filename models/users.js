module.exports = function (sequelize, DataTypes) {
    const Users = sequelize.define("Users", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        pseudo: {
            type: DataTypes.STRING,
            allowNull: true
        },
        gender: {
            type: DataTypes.STRING(1),
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        avatar: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        tableName: "users",
        paranoid: true,
        freezeTableName: true
        // désactive la modification des noms de tableaux; Par défaut, la mise à jour automatiquement
        // transforme tous les noms de modèles passés (premier paramètre de définition) en pluriel.
        // si vous ne voulez pas cela, définissez le suivant
    });
    Users.associate = (models) => {
        Users.hasMany(models.Pokemons, {
            foreignKey: 'id_user',
            sourceKey: 'id',
            as: 'pokemons'
        });
        Users.hasOne(models.Bags, {
            foreignKey: 'id_bag',
			as: "bags"
        });
    };
    return Users;
};
