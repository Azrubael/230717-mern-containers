import express from "express"
import mongoose from "mongoose"
import cors from "cors"

import Todo from "./models/todo.js"

const app = express()
const cfg = {
    "username": process.env.MONGODB_USERNAME,
    "password": process.env.MONGODB_PASSWORD,
    "node_port": 8000,
}

app.use(express.json())
app.use(cors())

app.get("/todos", async (req, res) => {
    const todos = await Todo.find()
    return res.status(200).json({
        todos,
    })
})

app.post("/todos", async (req, res) => {
    const name = req.body.name
    const todo = new Todo({
        name,
    })
    await todo.save()
    res.status(201).json({ message: "Goal saved", todo })
})

app.put("/todos/:id", async (req, res) => {
    const todo = await Todo.findById(req.params.id)
    todo.completed = !todo.completed
    await todo.save()
    return res.status(201).json({ message: "Todo saved", todo })
})

app.delete("/todos/:id", async (req, res) => {
    await Todo.deleteOne({
        id: req.params.id,
    })

    return res.status(201).json({ message: "Todo deleted" })
})

mongoose.set('strictQuery', false)

const connectString = `mongodb://${ cfg.username }:${ cfg.password }@mongodb:27017/todos-app?authSource=admin`
const connectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

await mongoose.connect(connectString, connectOptions)
.then( () => {
    console.log("Connected to MongoDB")
    app.listen(cfg.node_port, () => {
        console.log(`Now listening on PORT ${ cfg.node_port }`)
    })
})
.catch( (err) => {
    console.log("Unable to connect to MongoDB with a connectString:")
    console.log(connectString)
        console.log(err)
    }
)

mongoose.connection.on('error', err => {
    console.log("The connection to MongoDB lost!")
    logError(err);
  });
