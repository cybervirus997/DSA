const mongoose = require('mongoose')

const connect = () => mongoose.connect("mongodb://localhost:27017/finalevaluation",{
    useCreateIndex:true,
    useFindAndModify:false,
    useNewUrlParser:true,
    useUnifiedTopology:true
})

module.exports = connect