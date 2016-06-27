var Sequelize = require('sequelize');
var config = require('config');
var sequelize = new Sequelize(
        config.get('config.database'),
        config.get('config.user'),
        config.get('config.password'), {
          'host' : 'localhost',
          'dialect' : 'mysql' });

module.exports = sequelize;
