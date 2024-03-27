const mongoose = require('mongoose')
require('dotenv').config()

exports.dbConnnect = async () => {
        mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => {
            console.log('Database Successfully connected...');
        })
        .catch((error) => {
            console.log('Database connection failed...');
            console.error(error);
            process.exit(1)
        })
}