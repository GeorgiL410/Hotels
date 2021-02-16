const app = require('express')();
const config = require('./config');

require('./config/express')(app);

const router = require('./routes');

app.use('/', router);

app.listen(config.port, console.log(`Now listening on port ${config.port}.`));
