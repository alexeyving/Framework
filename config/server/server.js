const fallback          = require('express-history-api-fallback');
const express           = require('express');
const gzip              = require('compression');
const { CONFIG, PATHS } = require('../config');

const { APP_PORT } = CONFIG;
const { DIST }     = PATHS;

const app = express();

app.use(gzip());

app.use('/', express.static(DIST));
app.use(fallback('index.html', { root: DIST }));

app.listen(APP_PORT, (err) => {
	if (err) console.log(err);
});