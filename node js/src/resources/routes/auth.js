require("dotenv").config()
const express = require("express");
const passport = require("passport");
const router = express.Router();

const userServices = require("../services/user")

const authMiddleware = require("../middlewares/auth");
const getComics = require("./getComics")

const authRoutes = (app) => {
  // views
    router.get("/login", (req, res) => {
        res.render("login")
    })
    
    router.get("/register", (req, res) => {
        res.render("register")
    })

  // routing  
    router.post("/register", userServices.register)
    router.post("/login", userServices.login)



    router.get("/comic", authMiddleware, getComics) // demo



    return app.use("/", router)
}
module.exports = authRoutes