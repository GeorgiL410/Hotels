const { Router } = require('express');
const app = Router();
app.get('/', (req, res) => {
  res.render('home');
})
app.get('/create', (req, res) => {
  res.render('create');
})
app.get('/login', (req, res) => {
  res.render('login');
})
app.get('/register', (req, res) => {
  res.render('register');
})

module.exports = app;