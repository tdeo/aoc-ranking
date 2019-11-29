'use strict';

const Sqlz = require('sequelize');
const sequelize = new Sqlz(...require('./db_config'));

const Users = sequelize.import(__dirname + '/models/users');
const Solutions = sequelize.import(__dirname + '/models/solutions');

const args = process.argv.slice(2);

const name = args[0];

if (!name) {
  console.error('Need username arg');
  process.exit(0);
}

Users.findOrCreate({ where: { name } })
  .then(async ([user]) => {
    for (let day = 1; day <= 25; day++) {
      await Solutions.findOrCreate({ where: { day, userId: user.id }});
    }
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
