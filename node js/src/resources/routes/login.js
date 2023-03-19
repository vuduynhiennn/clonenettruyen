const conToDb = require("../../connect_db") 
const express = require("express");
const router = express.Router();


let authlogin = (req,res) =>{
    console.log(req.body)
    conToDb.query('SELECT * FROM users WHERE username = "mavie1"',(err,res)=>{
        return console.log(res)
    })
}
   
    

    router.post("/login", (req, res) => {
        const { password, username} = req.body
        let sql = 'SELECT * FROM users WHERE username ="'+username+'"'
        let pass = "[ RowDataPacket { pass: '"+password+"' } ]"
        conToDb.query(sql,(err,data)=>{
            if(data[0].pass == password){
                res.redirect('/')
                
            }
        })
    })


    router.get('/login', (req, res) => {
        res.render('login')
    })
   
    

   router.get('/user', (req, res) => {
        res.render('User_Detail')
    })
    
   router.get('/account', (req, res) => {
        res.render('Account_Detail')
    })
    
   router.get('/followcomic', (req, res) => {
        res.render('followcomic_Detail')
    })
    
   router.get('/changepassword', (req, res) => {
        res.render('changepassword')
    })

module.exports = router