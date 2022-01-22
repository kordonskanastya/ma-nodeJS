module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'Products', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.DataTypes.INTEGER
        },
        itemId: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'Items',
            key: 'itemId'
          },
        },
        typeId: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'Types',
            key: 'typeId'
          },
        },
        measure: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false
        },
        measurevalue: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false
        },
        pricetype: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false
        },
        pricevalue: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false
        },
        createdAt: {
          type: Sequelize.DataTypes.DATE,
          allowNull: true,
          defaultValue: null,
        },
        updatedAt: {
          type: Sequelize.DataTypes.DATE,
          allowNull: true,
          defaultValue: null,
        },
        deletedAt: {
          type: Sequelize.DataTypes.DATE,
          allowNull: true,
          defaultValue: null,
        },
      }
    );
  },

  // eslint-disable-next-line no-unused-vars
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Products');
  }
};
