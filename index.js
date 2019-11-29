'use strict';

const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')
const express = require("express");
const cors = require("cors");
const Sqlz = require('sequelize');

let app = express();
app.use(morgan("tiny"));
app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.set('view engine', 'ejs');

const sequelize = new Sqlz(...require('./db_config'));

const Users = sequelize.import(__dirname + '/models/users');
const Solutions = sequelize.import(__dirname + '/models/solutions');

app.get('/', async (req, res) => {
  let users = await Users.findAll();
  res.render('pages/index', { users });
});

app.get('/users/:id', async (req, res) => {
  let user = await Users.findByPk(req.params.id);
  let solutions = await Solutions.findAll({ where: { userId: req.params.id }})
  res.render('pages/user', { user, solutions });
});

app.post('/start/:userId/:day', async (req, res) => {
  let solution = await Solutions.findOne({ where: { userId: req.params.userId, day: req.params.day } });
  await solution.update({ startedAt: Date.now() });
  res.redirect(`/users/${req.params.userId}`);
});

app.post('/finish/:userId/:day', async (req, res) => {
  let solution = await Solutions.findOne({ where: { userId: req.params.userId, day: req.params.day } });
  await solution.update({ finishedAt: Date.now() });
  res.redirect(`/users/${req.params.userId}`);
});

app.listen(process.env.PORT || 3090);
