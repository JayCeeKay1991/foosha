const express = require('express')
const app = express()
const config = require('./config');
const router = require('./router');
const cors = require('cors');


app.use(cors({
  origin: '*'
}));


// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header(
//     'Access-Control-Allow-Methods',
//     'GET, POST, PUT, DELETE'
//   );
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept, Authorization'
//   );
//   next();
// })

app.use(express.json());

app.use(router);

app.listen(config.port, () => console.log(`Server listening on port ${config.port}`));