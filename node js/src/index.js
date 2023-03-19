require("dotenv").config();
const PORT = process.env.PORT || 5000

const express = require('express')
const app = express()

// config
const config = require("./config/config")
config(app)

// routes
app.get('/', (req, res) => res.render('home')) 

const authRoutes = require("./resources/routes/auth")
authRoutes(app)

app.listen(PORT, () => console.log(`Example app listening on port http://localhost:${PORT}`))

