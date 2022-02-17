const mongoos = require('mongoose');

const connectDb = async(url) =>{
    return mongoos.connect(url,{
        useNewUrlParser : true,
        useUnifiedTopology : true
    });
}

module.exports = connectDb;