require("dotenv").config()
const express = require("express");
const passport = require("passport");
const router = express.Router();

const userServices = require("../services/user")

const authMiddleware = require("../middlewares/auth");
const getComics = require("./getComics")

const authRoutes = (app) => {
  // routes for render views
    router.get("/login", (req, res) => {
        res.render("login")
    })
    router.get("/register", (req, res) => {
        res.render("register")
    })
    router.get("/forgetPassword", (req, res) => res.render("forgetPass"))


  // routing  
    router.post("/register", userServices.register)
    router.post("/login", userServices.login)


    router.get("/comic", authMiddleware, getComics) // demo

    router.post("/forgetPassword", userServices.forgetPassword)
    router.post("/forgetPassword/code", userServices.forgetPasswordCode)

    return app.use("/", router)
}
module.exports = authRoutes