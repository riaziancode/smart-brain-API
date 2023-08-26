const express = require('express');
const port= 3001;
const bodyParser= require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs')
const register= require('./controllers/register')
const signin = require ('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const db = require('knex')({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'postgres',
      password : '',
      database : 'smart_brain'
    }
  });

const app= express();
app.use(bodyParser.json());
app.use(cors())

app.post('/register', (req, res)=> {register.handleRegister(req, res, db, bcrypt)})
app.post('/signin', (req, res)=>{signin.handleSignin(req, res, db, bcrypt)})
app.get('/profile/:id', (req, res)=>{profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res)=>{image.handleImagePut(req, res, db)})
app.post('/imageurl', (req, res)=>{image.handleAPICall(req, res)})    

app.listen(`${port}`, ()=>{
    console.log(`App is running on port ${port}`)
})
