const express = require('express');
const app = express() ;

const mongoose = require('mongoose');
const debug = require('debug')("app:main");
const config = require('config');

const router = require('./src/routes');

app.use(express.json());
app.use(express.urlencoded({ extended:true }));

mongoose
  .connect(config.get('db.address'))
  .then(() => debug('connected'))
  .catch(() => debug('not connected'));

app.use('/api' , router);

const port = process.env.PORT || 3000 ;
app.listen(port , () => console.log(`listening on port ${port}`));


