require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const routes = require('./controller');
const { authenticate } = require('./controller/auth');

mongoose.connect(process.env.DATABASE_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection

db.on('error', err => console.log(err));
db.once('open', () => console.log('Connected to Database'));

app.use(express.json())
app.use('/login', routes.login);
app.use(authenticate);
app.use('/users', routes.user);



const PORT = 3000;
app.listen(PORT, () => console.log('Server Started'))