const express = require('express')
const path = require('path')
const app = express()
const handlebars = require('express-handlebars')
const port = 5000

app.use('/public', express.static(path.join(__dirname, '/public')))

var handlbars = require('express-handlebars').create({ defaultLayout: 'main' });

app.engine('handlebars', handlbars.engine);
app.set('view engine', 'handlebars');
app.set('views',path.join(__dirname, 'resources/views'))



app.get('/', (req, res) => {
    res.render('home')
})

app.get('/login', (req, res) => {
  res.render('login')
})

app.get('/register', (req, res) => {
  res.render('register')
})

app.get('/test',(req, res) =>{
  
  res.render('test')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


const sql = require('mssql/msnodesqlv8')

