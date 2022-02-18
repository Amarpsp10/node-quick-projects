require('dotenv').config();
require('express-async-error');

const express = require('express');
const {PrismaClient} = require('@prisma/client');
const tasksRouter = require('./routes/tasks')
const errorHandlingMiddleware = require('./middlewares/error-handling');
const notFound = require('./middlewares/not-found');

const port = process.env.PORT | 3000;

const app = express();
// const prisma = new PrismaClient();


app.use(express.json());

app.use('/api/task',tasksRouter);
app.get('/',(req,res)=>{
    res.send(`<h1>server is up!</h1>`);
})

app.use(errorHandlingMiddleware);
app.use(notFound);

app.listen(port,() =>{
    console.log(`App is listening on port : ${port}`);
})