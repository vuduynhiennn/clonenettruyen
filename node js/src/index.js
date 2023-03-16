require("dotenv").config();

const PORT = process.env.PORT || 5000

const express = require('express')
const app = express()

const path = require('path')
const handlebars = require('express-handlebars')

app.use('/public', express.static(path.join(__dirname, '/public')))

var handlbars = require('express-handlebars').create({ defaultLayout: 'main' });

app.engine('handlebars', handlbars.engine);
app.set('view engine', 'handlebars');
app.set('views',path.join(__dirname, 'resources/views'))

//connect to my sql
const conn = require("./connect_db")

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/login', (req, res) => {
  res.render('login')
})

app.get('/register', (req, res) => {
  res.render('register')
})

app.get('/test',(req, res) =>{
  
  res.render('test')
})


app.listen(PORT, () => {
  console.log(`Example app listening on port http://localhost:${PORT}`)
})

