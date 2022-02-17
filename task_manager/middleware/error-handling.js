const {CustomApiError} = require('../errors/custrom-error');

const errorHandlingMiddleware = (err,req,res,next) =>{
    if(err instanceof CustomApiError){
        return res.status(err.statusCode).json({msg: err.message});
    }
    return res.status(500).json({err:'Something went wrong, Please try again!'});
}

module.exports = errorHandlingMiddleware;