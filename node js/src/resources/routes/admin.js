const express = require("express");

const router = express.Router();

const adminRoutes = (app) => {
    router.post("login", (req, res) => {
        res.json("login")
    })
    router.get("/logout", (req, res) => {
        
    })
    return app.use("/admin", router)
}

module.exports = adminRoutes