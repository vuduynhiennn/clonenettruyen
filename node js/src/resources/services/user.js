const userServices = {
    register: (req, res, next) => {   
        const { username, password, confirmPassword } = req.body
        // check all fields are typed
        if (!password || !username || !confirmPassword) {
            return res.status(400).json("all fields are required")
        }

        // check password and confirm password is not the same
        if (password !== confirmPassword) {
            return res.status(400).json("Các mật khẩu đã nhập không khớp. Hãy thử lại")
        }

        // create connection to mysql
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
        })
         // connected to mysql successfully

        const sql = `SELECT * FROM users WHERE username="${username}"`
        conToDb.query(sql, (err, result) => {
            if (err) return console.log("line 22: ", err)
            // if result.length == 0, it means there isn't a record has value username in database
            console.log(result)
            if (result.length == 1) {
                return res.status(400).json(`${username} already exits`)
            }

            const sql = `INSERT INTO users (username, pass) VALUES ("${username}", "${password}")`
            conToDb.query(sql, (err, result) => {
                if (err) console.log(err)
                conToDb.end()
                return res.json(`${username} was added`)
            })
        })
    },
    login: (req, res) => {
        const { username, password } = req.body

        if (!username || !password) {
            return res.status(400).json("all fields are required")
        }

         // create connection to mysql
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


        const sql = `SELECT * FROM users WHERE username="${username}"`
        conToDb.query(sql, (err, result) => {
            if (err) console.log(err)
            if (!result.length) {
                return res.status(404).json(`${username} isn't register yet`)
            }
            return res.status(200).json("user logged in")
        })

    }
}

module.exports = userServices