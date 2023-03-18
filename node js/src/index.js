require("dotenv").config();

const PORT = process.env.PORT || 5000

const express = require('express')
const app = express()

const path = require('path')
const handlebars = require('express-handlebars')

app.use('/public', express.static(path.join(__dirname, '/public')))

const session = require("express-session")
const SQLiteStore = require("connect-sqlite3")(session)

app.use(session({
  secret: process.env.SECRET || 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000, secure: false }
}));

app.use(express.urlencoded({
  extended: true
}))

const passport = require("passport")

app.use(passport.authenticate('session'));

var handlbars = require('express-handlebars').create({ defaultLayout: 'main' });

app.engine('handlebars', handlbars.engine);
app.set('view engine', 'handlebars');
app.set('views',path.join(__dirname, 'resources/views'))



//connect to my sql
// const conn = require("./connect_db")


const authRoutes = require("./resources/routes/auth")
authRoutes(app)


const adminRoutes = require("./resources/routes/admin")
adminRoutes(app)

app.get('/', (req, res) => {
    res.render('home')
})


app.listen(PORT, () => {
  console.log(`Example app listening on port http://localhost:${PORT}`)
})

