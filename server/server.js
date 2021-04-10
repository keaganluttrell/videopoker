const express = require('express');
const morgan = require('morgan');

// constants
const PORT = process.env.PORT || 80;
const STATIC = 'public';

// app setup
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'));
app.use(express.static(STATIC));
app.listen(PORT, console.log('listening on', PORT));




