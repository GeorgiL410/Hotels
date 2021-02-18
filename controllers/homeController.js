const router = require('express').Router();
const isAuth = require('../middlewares/isAuth');

router.get('/', (req, res) => {
  res.render('home');
  })

  router.get('/hotels/create', (req, res) => {
    res.render('create');
    })

  
module.exports = router;