const mongoose = require('mongoose');
const debug = require('debug')('SocialDeck-dbConnection');

// Connect to a cloud MongoDB instance.
const dbName = process.env.NODE_ENV==='test' ? process.env.MONGO_TEST_DB_NAME : process.env.MONGO_DB_NAME;
const connString = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@mongocluster-yevae.mongodb.net/${dbName}?retryWrites=true&w=majority`;
mongoose.connect(connString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(db => {
        const conn = db.connection;
        debug(
            `Connected to database ['${dbName}'] at ${conn.host}:${conn.port}`);
    })
    .catch(err => {
        throw new Error(err);
    });

module.exports = mongoose.connection;