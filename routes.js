const { Router } = require('express');
const router = Router();
const controller = require('./controllers/controller');

router.use('/', controller);

module.exports = router;