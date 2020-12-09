const path = require('path');
const dotenv = require('dotenv').config({ path: path.resolve(__dirname + '/configs.env') })
const express = require('express');


const app = express();



// middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

console.log(process.env.NODE_ENV)
console.log(process.env.DB_NAME)
console.log(process.env.DB_USERNAME)



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is currently running on port ${PORT}`))