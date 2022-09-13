//importing
import express from 'express';
import mongoose from 'mongoose';
import Messages from './dbMessages.js';

//app config
const app = express();
const port = process.env.PORT || 9000;

//middleware
app.use(express.json());

//DB config
const connection_url = 'mongodb+srv://admin:aVOsH24eazHjKApg@cluster0.duwpils.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(connection_url ,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

//????

//api routes
app.get('/',(req,res)=>res.status(200).send('hello world'));

app.post("/messages/new", (req, res) => {
    const dbMessage = req.body;
    console.log(dbMessage)

    Messages.create(dbMessage, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else{
            res.status(201).send(data)
        }
    })
})

// listener
app.listen(port, ()=> console.log(`Listening on localhost:${port}`));

