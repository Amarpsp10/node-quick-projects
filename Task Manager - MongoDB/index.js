require('dotenv').config();
const express = require('express');
const connectDb = require('./db/connect');

const taskRoutes = require('./routes/tasks');
const notFound = require('./middleware/not-found');
const errorHandlingMiddleware = require('./middleware/error-handling');

const app = express();

const port = process.env.PORT | 5000;

//middlewares
app.use(express.json());


app.get('/test',(req,res)=>{
    res.send('Server is up!');
})

app.use('/api/task',taskRoutes)

app.use(errorHandlingMiddleware);
app.use(notFound);

const start = async () =>{
    try{
        await connectDb(process.env.MONGO_URI);
        app.listen(port,()=>{
            console.log(`Server is listening at Port : ${port}`)
        });
    }catch(err){
        console.log(err);
    }
}

start();
