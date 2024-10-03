const express=require('express');
const bodyParser=require('body-parser');
const { MongoClient } = require('mongodb');
const db_url = 'mongodb://localhost:27017';

const app=express();


app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.listen(4506,()=>{
  console.log("server started")
})


app.get('/sign-in', async (request, response) => {
    let client;
  
    try {
      client = await MongoClient.connect(db_url);
      const dbo = client.db('grestn');
      const result = await dbo.collection('users').find().toArray();
      response.send(result);
    } catch (err) {
      console.error('Error connecting to MongoDB or retrieving data:', err);
      response.status(500).send('Internal Server Error');
    } finally {
      if (client) {
        client.close();
      }
    }
  });


  app.post('/sign-up', async (request, response) => {
    let client;
  
    try {
      client = await MongoClient.connect(db_url);
      const dbo = client.db('grestn');
      const payload={
        name:request.body.name,
        email:request.body.email,
        Ph:request.body.Ph
      }
      const result = await dbo.collection('users').insertOne(payload);
      response.send("user created sucessfully")
      
    } catch (err) {
      console.error('Error connecting to MongoDB or retrieving data:', err);
      response.status(500).send('Internal Server Error');
    } finally {
      if (client) {
        client.close();
      }
    }
  });

app.get('/dashboard/exam', async (request, response) => {
  let client;

  try {
    client = await MongoClient.connect(db_url);
    const dbo = client.db('grestn');
    const result = await dbo.collection('examQues').find().toArray();
    response.send(result);
  } catch (err) {
    console.error('Error connecting to MongoDB or retrieving data:', err);
    response.status(500).send('Internal Server Error');
  } finally {
    if (client) {
      client.close();
    }
  }
});






