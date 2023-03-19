const express = require("express")
const path = require('path')
const handlbars = require('express-handlebars').create({ defaultLayout: 'main' });

const config = (app) => {
    app.use(express.urlencoded({
        extended: true
      }))
      
    app.use(express.json())  

    app.engine('handlebars', handlbars.engine);
    app.set('view engine', 'handlebars');

    app.set('views', path.join(__dirname, '../resources/views'))

    app.use('/public', express.static(path.join(__dirname, '../public')))

    const passport = require("passport")

    const session = require("express-session")
    app.use(session({
      secret: process.env.SECRET || 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 60000, secure: false }
    }));
    
    app.use(passport.authenticate('session'));
}

module.exports = config