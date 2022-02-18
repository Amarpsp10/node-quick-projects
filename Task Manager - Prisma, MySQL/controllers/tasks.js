const {PrismaClient} = require('@prisma/client')
const {createCustomError} = require('../errors/custom-error')
const asyncWrapper = require('../middlewares/async');

const prisma = new PrismaClient();

const getAllTasks = asyncWrapper(async(req,res,next) =>{
    const tasks = await prisma.task.findMany();
    if(!tasks){
        return next(createCustomError('No tasks found !',404));
    }
    res.status(200).json({tasks});
})

const getTask = asyncWrapper(async(req,res,next) =>{
    const {id} = req.params;
    const task = await prisma.task.findUnique({
        where:{
            id : Number(id)
        },
    })
    if(!task){
        return next(createCustomError((`No task found with id ${id}`,404)));
    }
    res.status(200).json({task})
})

const createTask = asyncWrapper(async(req,res) =>{
    const task = await prisma.task.create({
        data:req.body,
    })
    res.status(201).json({task});
})

const updateTask = asyncWrapper(async(req, res, next) =>{
    const {id} = req.params;
    const task = await prisma.task.update({
        where:{
            id: Number(id),
        },
        data:req.body,
    })
    console.log(task)
    if(!task){
        return next(createCustomError('Task not found',404));
    }
    res.status(200).json({task});
})

const deleteTask = asyncWrapper(async(req,res) =>{
    const {id} = req.params;
    const task = await prisma.task.delete({
        where:{
            id: Number(id),
        }
    })
    res.status(200).json({task});
})

module.exports = {getAllTasks,getTask,createTask,updateTask,deleteTask}