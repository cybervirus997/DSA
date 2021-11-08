const mongoose = require('mongoose')
const User = require('./user.model')

const studentSchema = new mongoose.Schema({
    
    roll_number:{type:String, required:true},
    user:{ 
        type:mongoose.Schema.Types.ObjectId,
        ref:User,
        required:true
    },
    batch:{type:String, required:true}

})

const Student = mongoose.model("student",studentSchema)

module.exports = Student