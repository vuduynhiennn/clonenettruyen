
const { pool } = require('mssql/msnodesqlv8');
const sql = require('mssql/msnodesqlv8')


var con ={
    host: "localhost",
    user: "sa",
    password: "123123",
    database: "QUANLYNHANSU",
  };
  
  var conn = sql.ConnectionPool(con).connect().then(pool => {
    return pool;
  });
  
  module.exports = {
    conn:conn,
    sql:sql
  
  }

  sql.connect(con).then(pool =>{
    return pool.request()
        .input('input_parameter',sql.Int, value)
        .query('select * from tbNHANVIEN')
  }).then(result =>{
    console.dir(result)
  }).catch(err=>{
    console.log(err)
  })