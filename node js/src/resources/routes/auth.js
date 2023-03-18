require("dotenv").config()
const express = require("express");
const passport = require("passport");
const router = express.Router();

const crypto = require ("crypto")

var GoogleStrategy = require("passport-google-oidc");

const conn = require("../../connect_db")

passport.use(new GoogleStrategy({
    clientID: process.env['GOOGLE_CLIENT_ID'],
    clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
    callbackURL: '/oauth2/redirect/google',
    scope: [ 'profile' ]
  }, function verify(issuer, profile, cb) {

    console.log("isuser: ", issuer)
    console.log("profile: ", profile)
    console.log("cb: ", cb())

    db.get('SELECT * FROM federated_credentials WHERE provider = ? AND subject = ?', [
      issuer,
      profile.id
    ], function(err, row) {
      if (err) { return cb(err); }
      if (!row) {
        db.run('INSERT INTO users (name) VALUES (?)', [
          profile.displayName
        ], function(err) {
          if (err) { return cb(err); }
  
          var id = this.lastID;
          db.run('INSERT INTO federated_credentials (user_id, provider, subject) VALUES (?, ?, ?)', [
            id,
            issuer,
            profile.id
          ], function(err) {
            if (err) { return cb(err); }
            var user = {
              id: id,
              name: profile.displayName
            };
            return cb(null, user);
          });
        });
      } else {
        db.get('SELECT * FROM users WHERE id = ?', [ row.user_id ], function(err, row) {
          if (err) { return cb(err); }
          if (!row) { return cb(null, false); }
          return cb(null, row);
        });
      }
    });
  }));

passport.serializeUser(function(user, cb) {
process.nextTick(function() {
    cb(null, { id: user.id, username: user.username, name: user.name });
});
});

passport.deserializeUser(function(user, cb) {
process.nextTick(function() {
    return cb(null, user);
});
});

const authRoutes = (app) => {
    router.get("/login", (req, res) => {
        res.render("login")
    })

    router.get("/register", (req, res) => {
        res.render("register")
    })

    router.post("/register", (req, res, next) => {
        console.log(req.body) 
        
        const { password, username } = req.body
        const salt = crypto.randomBytes(16);
        crypto.pbkdf2(password, salt, 310000, 32, 'sha256', (err, hashedPassword) => {
            if (err) console.log(err);
            const sql = `INSERT INTO users (username, pass, salt) VALUES ("${username}", "${hashedPassword}", "${salt}")`
            conn.query(sql, (err, result) => {
                if (err) return res.json(err);
                const user = {
                    username: username,
                }
                req.login(user, (err) => {
                    if (err) return res.json(err);
                    res.redirect("/") 
                })
            })
        })
    })

    router.get("/login/federated/google", passport.authenticate('google'));
    router.get('/oauth2/redirect/google', passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/'
      }));  

    router.post("/logout", (req, res, next) => {
        req.logout((err) => {
            if (err) return next(err)
            res.redirect("/")
        })
    })
    return app.use("/", router)
}
module.exports = authRoutes