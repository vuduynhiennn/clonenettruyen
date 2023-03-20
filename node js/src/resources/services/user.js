const userServices = {
    register: (req, res) => {   
        const { username, password, confirmPassword } = req.body
        // check all fields are typed
        if (!password || !username || !confirmPassword) {
            return res.render("register", { message: "vui lòng nhập đầy đủ các trường"})
        }

        // check password and confirm password is not the same
        if (password !== confirmPassword) {
            return res.render("register", { message: "Các mật khẩu đã nhập không khớp. Hãy thử lại"})
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
            if (result.length == 1) {
                return res.render("register", { message: `${username} đã tồn tại, vui lòng chọn một user khác`})
            }

            const sql = `INSERT INTO users (username, pass) VALUES ("${username}", "${password}")`
            conToDb.query(sql, (err, result) => {
                if (err) console.log(err)
                conToDb.end()
                return res.render("register", { message: `${username} đã đăng kí thành công`})
            })
        })
    },
    login: (req, res,next) => {
        const { username, password } = req.body

        if (!username || !password) {
            return res.render("login", { message: "vui lòng không để trống các trường" })

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
                return res.render("login", { message: `${username} chưa được đăng kí` })

            }
            if (result[0].pass === password) {
                next()
            } else {
                return res.render("login", { message: "mật khẩu không đúng"})
            }
        })
    }
}

module.exports = userServices