const express = require('express')
const app = express()
const config = require('./config');
const router = require('./router');
const cors = require('cors');

console.log(config);

app.use(cors());

app.use(express.json());

app.use(router);

app.listen(config.port, () => console.log(`Server listening on port ${config.port}`));