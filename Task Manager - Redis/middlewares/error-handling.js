const {CustomError} = require('../errors/custom-error')
    
const errorHandlingMiddleware = (err,req,res,next) =>{
    if(err instanceof CustomError){
        return res.status(err.statusCode).json({msg:err.message});
    }
    return res.status(500).json({msg:'something went wrong !'});
}

module.exports = errorHandlingMiddleware;