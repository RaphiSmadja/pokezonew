module.exports = function (sequelize, DataTypes) {
    const Bags = sequelize.define("Bags", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        pokeballs: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        potions: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    }, {
        tableName: "bags",
        paranoid: true,
        freezeTableName: true
    });
    Bags.associate = (models) => {
        Bags.belongsTo(models.Users, {
            foreignKey: 'id_bag',
            as: 'bags'
        });
    };
    return Bags;
};
