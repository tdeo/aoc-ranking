'use strict';

const SequelizeAuto = require('sequelize-auto');
const auto = new SequelizeAuto(...require('./db_config.js'));

auto.run((err) => {
  if (err) throw err;
})
