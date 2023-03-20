require("dotenv").config()
const express = require("express");
const passport = require("passport");
const router = express.Router();

const userServices = require("../services/user")
const authMiddleware = require("../middlewares/auth");
const getComics = require("./getComics");
const user = require("../services/getuser");


  // views
    router.get("/login", (req, res) => {
        res.render("login")
    })
    
    router.get("/register", (req, res) => {
        res.render("register")
    })

  // routing  
    router.post("/register", userServices.register)
    router.post("/login", userServices.login,(req, res) => {
      
      const { HOST, USER, PASSWORD, DATABASE } = require("dotenv").config()["parsed"]
      const mysql = require("mysql");

      const conToDb = mysql.createConnection({
      host: HOST || "localhost",
      user: USER || "sa",
      password: PASSWORD || "123123",
      database: DATABASE || "QUANLYNHANSU"
      })

      conToDb.connect((err) => {
      if (err) throw err;
      console.log("Connected to mysql")
      })         // connected to mysql successfully

      const { password, username} = req.body
      const sql = `SELECT * FROM users WHERE username="${username}"`
        conToDb.query(sql, (err, result) => {         
          var user = {
            username: "",
             gmail: ""
          }
          user.username = result[0].username
          user.gmail    = result[0].gmail
          router.data = user
          conToDb.end()
          res.redirect('/')
        })     
      
    })

    router.get("/exit", (req, res) => {
      router.data = false
      res.redirect('/')
    })
    router.get('/user', (req, res) => res.render('User_Detail',{data:router.data}))
  
    router.get('/account', (req, res) => res.render('Account_Detail'))
      
    router.get('/followcomic', (req, res) => res.render('followcomic_Detail'))
      
    router.get('/changepassword', (req, res) => res.render('changepassword'))

    router.get("/comic", authMiddleware, getComics) // demo



module.exports = router