const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 5555;


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://TechBarik:TechBarik@cluster0.waijmz7.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

/*
----- questions ------
1. todo: get all data from questions (_id, title, difficulty, practice_url, platform, type, category, category_id)
2. todo: get a specific question with id
3. todo: insert new question
4. todo; update existing question
5. todo: delete existing question
----- categories -------
1. todo: get all categories (_id, title)
2. todo: insert new category
3. todo: udpate category
4. delete category if no questions
*/

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });


    const questionCollection = client.db('TechBarik').collection('questions');
    app.get('/questions', async(req, res) => {
        const result = await questionCollection.find().toArray();
        res.send(result);
    })
    app.get('/questions/:id', async(req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await questionCollection.findOne(query);
      res.send(result);
    })
    // insert any questions (duplicate allowed)
    app.post('/questions', async(req, res) => {
      const question = req.body;
      console.log(question);
      const result = await questionCollection.insertOne(question);
      res.send(result);
    })
    // insert any questions (duplicate is not allowed)
    app.put('/questions', async(req, res) => {
      const question = req.body;
      const filter = { practice_url: question.practice_url };
      const options = { upsert: true};
      const newQuestion = {
        $set: {
          title: question.title,
          difficulty: question.difficulty,
          practice_url: question.practice_url,
          platform: question.platform,
          type: question.type,
          category: question.category,
          category_id: question.category_id
        }
      }
      const result = await questionCollection.updateOne(filter, newQuestion, options);
      res.send(result);
    })
    // delete api
    app.delete('/questions/:id', async(req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await questionCollection.deleteOne(query);
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