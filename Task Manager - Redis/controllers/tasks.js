const {createCustomError} = require('../errors/custom-error')
const asyncWrapper = require('../middlewares/async');
const {redisClient} = require('../redis/redis-server')

const getAllTasks = asyncWrapper(async(req,res,next) =>{
    res.status(200).json({msg:"can't get all tasks for redis"});
})

const getTask = asyncWrapper(async(req,res,next) =>{
    const {id} = req.params;
    console.log(`gettting task id : ${id}`);
    const data = await redisClient.get(String(id))
    res.status(200).json({task:JSON.parse(data)})
})

const createTask = asyncWrapper(async(req,res) =>{
    const {id} = req.body;
    if(!id){
        return createCustomError('Id is required',404);
    }
    await redisClient.set(String(id),JSON.stringify(req.body));
    res.status(200).json(req.body);
})

const updateTask = asyncWrapper(async(req, res, next) =>{
    const {id} = req.body;
    if(!id){
        return createCustomError('Id is required',404);
    }
    await redisClient.set(String(id),JSON.stringify(req.body));
    res.status(200).json(req.body);
})

const deleteTask = asyncWrapper(async(req,res) =>{
    const{id} = req.params;
    await redisClient.del(String(id));
    res.status(200).json({msg:"successfully deleted!"});
})

module.exports = {getAllTasks,getTask,createTask,updateTask,deleteTask}