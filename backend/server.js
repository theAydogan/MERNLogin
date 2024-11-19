const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // This loads the .env file

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }); // Remove useCreateIndex
const connection = mongoose.connection;

connection.once('open', () => {
    console.log("MongoDB database connection established");
})

const userRouter = require('./routes/users');



app.use('/users', userRouter);

app.listen(PORT, () => {
    console.log(`Server is running off of port: ${PORT}`);
});