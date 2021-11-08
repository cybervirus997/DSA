const mongoose = require('mongoose')
const User = require('./user.model')

const lectureSchema = new mongoose.Schema({
    
    title:{type:String, required:true},
    instructor:{ 
        type:mongoose.Schema.Types.ObjectId,
        ref:User,
        required:true
    },
    batch:{type:String, required:true}

})

const Lecture = mongoose.model("lecture",lectureSchema)

module.exports = Lecture