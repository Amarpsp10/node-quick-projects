require('dotenv').config();
require('express-async-error');

const express = require('express');
const tasksRouter = require('./routes/tasks')
const errorHandlingMiddleware = require('./middlewares/error-handling');
const notFound = require('./middlewares/not-found');
const {connectRedis} = require('./redis/redis-server');
const port = process.env.PORT | 3000;

const app = express();

app.use(express.json());

app.use('/api/task',tasksRouter);

app.get('/',async(req,res)=>{
    res.send(`<h1>server is up!</h1>`);
})

app.use(errorHandlingMiddleware);
app.use(notFound);

const start = async() =>{
    await connectRedis();
    app.listen(port,() =>{
        console.log(`App is listening on port : ${port}`);
    })
}

start().catch((err)=>{
    console.log(err);
}).finally(()=>{
    console.log('started')
})