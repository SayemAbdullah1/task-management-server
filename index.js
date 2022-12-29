const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const port = process.env.PORT || 5000;

const app = express()

app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1q1hbsc.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const taskCollection = client.db('taskManager').collection('allTask')

        app.get('/allTask', async (req, res) => {
            const query = {}
            const allTask = await taskCollection.find(query).toArray()
            res.send(allTask)
        })

        app.post('/allTask', async (req, res) => {
            const tasks = req.body
            const result = await taskCollection.insertOne(tasks)
            res.send(result)
        })
        app.delete('/allTask/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) }
            const result = await taskCollection.deleteOne(filter)
            res.send(result)
        })
    }
    finally{

    }
}
run().catch(console.log)
app.get('/', async(req, res) =>{
    res.send('Task management server is running')
})

app.listen(port, ()=> console.log(`Task management server is running on ${port}`));