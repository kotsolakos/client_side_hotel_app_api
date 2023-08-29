const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const rooms = require('./controllers/rooms');



const db = knex({
  client: 'pg',
  connection: {
    host : "localhost",
    user : "postgres",
    password : "110298",
    database : "hotel_database",
  }
});

const app = express();

app.use(cors())
app.use(express.json());

app.post('/siqnin', signin.handleSignin(db, bcrypt))
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.put('/profile', (req, res) => { profile.handleProfilePut(req, res, db)})
app.get('/rooms', (req, res) => { rooms.handleRoomsGet(req, res, db)})
app.put('/roomsInsert', (req, res) => { rooms.handleRoomsPut(req, res, db)})



app.listen( 3000, ()=> {
  console.log(`app is running on port 3000`);
})