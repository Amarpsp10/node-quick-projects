require('dotenv').config();
require('express-async-error');

const express = require('express');
const {PrismaClient} = require('@prisma/client');

const port = process.env.PORT | 3000;

const app = express();
const prisma = new PrismaClient();

const main = async() =>{
    const allUsers = await prisma.user.findMany()
    console.log(allUsers)
}

main().catch((e)=>{
    throw e
}).finally(async()=>{
    await prisma.$disconnect()
})

app.use(express.json());

// app.get('/',(req,res)=>{
//     res.send(`<h1>Hello world here is all products</h1>`);
// })

// app.listen(port,() =>{
//     console.log(`App is listening on port : ${port}`);
// })