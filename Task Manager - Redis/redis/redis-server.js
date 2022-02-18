const redis = require('redis');
const url = process.env.REDIS_URL;
const redisClient = redis.createClient({
    url: url
})


const connectRedis = async() =>{
    redisClient.on('connect',()=>{
        console.log('connected with redis');
    })
    redisClient.on('error', (err) => console.log('Redis Client Error', err));
    await redisClient.connect()
}

module.exports = {connectRedis,redisClient};
