require("dotenv").config()
const express = require("express");
const passport = require("passport");
const router = express.Router();

const userServices = require("../services/user")

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

    return app.use("/", router)
}
module.exports = authRoutes