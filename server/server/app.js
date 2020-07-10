const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('../schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 3005;

mongoose.connect('mongodb+srv://admin_db:RmQ0BTg2FgGMDhlp@cluster0-qaupv.mongodb.net/graphql_db?retryWrites=true&w=majority', {useNewUrlParser: true});

app.use(cors());

app.use('/api', graphqlHTTP({
    schema: schema,
    graphiql: true,
}));

const dbConnection = mongoose.connection;
dbConnection.on('error', err => console.log('Connection error: ${err}'));
dbConnection.once('open', () => console.log('Connected to DB'));


app.listen(port, err => {
    err ? console.log(err) : console.log('Server started!');
});