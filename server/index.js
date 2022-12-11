const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

// set up express app
const app = express();

//allow requests from any origin
app.use(cors());

//connect to mongoDB
const url = 'mongodb+srv://curly2101:Alice1234@employees.u1qdf7u.mongodb.net/test';


mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', err => {
    console.log('Error occurred while connecting to MongoDB: ', err);
});

db.once('open', () => {
    console.log('Successfully connected to MongoDB.');

  // You can now make your HTTP requests to the database here
});



app.use(express.static('public'));

app.use(bodyParser.json());

//initialize routes
app.use('/api',require('./routes/api'));

//error handling middleware
app.use(function(err, req, res, next) {
    // console.log(err);
    res.status(422).send({error:err.message});
})

// listen for requests
app.listen(process.env.port || 3000, function(){
    console.log('now listening for requests');
});