require("dotenv").config();
const PORT = process.env.PORT || 5000

const express = require('express')
const app = express()

// config
const config = require("./config/config")
config(app)
const conn = require("./config/connect_db")

// routes
const authRoutes = require("./resources/routes/auth")
app.use('/', authRoutes)

app.get('/', (req, res) => {
    conn.query('SELECT * FROM comics',(err,comic)=>{
    
        res.render('home',{comic:comic,data:authRoutes.data})
    })
}) 


app.listen(PORT, () => console.log(`Example app listening on port http://localhost:${PORT}`))

