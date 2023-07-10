const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
    username: 'postgres',
    password: '123',
    database: 'movies',
    host: 'localhost',
    dialect: 'postgres',
    logging: false,
    define: {
        timestamps: false,
        freezeTableName: true
    }
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.'); // eslint-disable-line no-console
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err); // eslint-disable-line no-console
  });


module.exports = sequelize;