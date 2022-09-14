//importing
import express from 'express';
import mongoose from 'mongoose';
import Messages from './dbMessages.js';
import Pusher from 'pusher';
import cors from 'cors';
import path from 'path'

//app config
const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
    appId: "1477209",
    key: "b00764d1313f16632e26",
    secret: "dd525ff6bb6e8a8ae962",
    cluster: "us2",
    useTLS: true
  });


//middleware
app.use(express.json());
app.use(cors());

//DB config
const connection_url = 'mongodb+srv://admin:aVOsH24eazHjKApg@cluster0.duwpils.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(connection_url ,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection

db.once('open',()=> {
    console.log("DB connected");

    const msgCollection = db.collection("messagecontents");
    const changeStream = msgCollection.watch();

    changeStream.on('change', (change) => {
        console.log("A change occured", change);

        if(change.operationType === 'insert') {
            const messageDetails = change.fullDocument;
            pusher.trigger('messages', 'inserted',{
                name: messageDetails.name,
                message: messageDetails.message,
                timestamp: messageDetails.timestamp,
                received: messageDetails.received
            });
        } else{
            console.log('Error triggering Pusher');
        }
    })
})

//api routes
app.get('/',(req,res)=>res.status(200).send('hello world'));

app.get('/messages/sync', (req, res) => {
    Messages.find((err,data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})

app.post("/messages/new", (req, res) => {
    const dbMessage = req.body;


    Messages.create(dbMessage, (err, data) => {
        if (err) {
            res.status(500).send(err)
            console.log(err)
        } else{
            res.status(201).send(data)
        }
    })
})

//Serve statis assets if in production
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('whatsapp/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'whatsapp', 'build', 'index.html'));
    });
}

// listener
app.listen(port, ()=> console.log(`Listening on localhost:${port}`));

