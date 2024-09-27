//import dependencies
const express = require('express')
const app = express()
const mysql = require('mysql2');
const dotenv= require('dotenv');


//configer environment variables
dotenv.config();

//create a connection object
const db =mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})


//test the connection 
db.connect((err)=>{
    //connection is successful
if(err){
    return console.log("Error connecting to the database",err)

}


    //connection is not successful
    console.log("successfull connect to the Mysql Database",db.threadId)
})

//1.retrieve all patients
app.get('/patients',(req,res)=>{
    const getPatients= "SELECT * FROM patients"
    db.query(getPatients,(err,data)=>{
        if(err){
            return res.status(400).send("fail to get partients")
        }
        res.status(200).send(data)
    })
})

//2. Retrieve all providers
app.get('/providers', (req, res) => {
    const getProviders = 'SELECT * FROM providers';
  
    db.query(getProviders, (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.status(200).send(results);
    });
  });

  // 3. Filter patients by First Name
  app.get('/patients/filter', (req, res) => {
    const { first_name } = req.query;
    const query = 'SELECT * FROM patients WHERE first_name = ?';
  
    db.query(query, [first_name], (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.status(200).semd(results);
    });
  });
  
//4. Retrieve all providers by their specialty
  app.get('/providers/specialty', (req, res) => {
    const { specialty } = req.query;
    const query = 'SELECT * FROM providers WHERE provider_specialty = ?';
  
    db.query(query, [specialty], (err, results) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.status(200).send(results);
    });
  });
  
  

const PORT = 3000
   app.listen(PORT, () => {
     console.log(`server is runnig on http://localhost:${PORT}`)
   })

   //basic end point hellow world 
// app.get('',(req, res)=>{
//     res.send("Hellow World")
// })
