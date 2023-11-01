const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5555;


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://TechBarik:TechBarik@cluster0.waijmz7.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });


    const blindCollection = client.db('TechBarik').collection('blind75');
    app.get('/blind-75', async(req, res) => {
        const result = await blindCollection.find().toArray();
        res.send(result);
    })
    app.get('/coding-interview-pattern', async(req, res) => {
        const result = await blindCollection.find().toArray();
        res.send(result);
    })



    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('TechBarik Server Running...');
})

app.listen(PORT, () => {
    console.log('our server is running on port :', PORT);
})