const getuser = (req,res,next) => {
    
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
                      next()
                      
                    })
                        
        }
        
               
    
module.exports = getuser