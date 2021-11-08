const express = require('express')
const authenticate = require('../middlewares/authenticate')
const authorise = require('../middlewares/authorise')
const Lecture = require('../models/lecture.model')
const router = express.Router()



router.get("",async(req,res) => {
      try{
        
        const lectures = await Lecture.find().lean().exec()

        return res.status(200).send(lectures)

      }catch(err){

          return res.status(500).send("please try again later")

      }
       

})



router.get("/:id",async(req,res) => {

    try{
        console.log(req.params.id)
        const lecture = await Lecture.findById(req.params.id).lean().exec()

        return res.status(200).send(lecture)

      }catch(err){

          return res.status(500).send("please try again later")

      }

})



router.post("",authenticate,authorise(["admin","instructor"]), async (req,res) => {
 try{   
    const {user} = req.user

    const lecture = await Lecture.create({
       title:req.body.title,
       instructor: user._id,
       batch:req.body.batch
       
    })

    return res.status(201).send({lecture})

}catch(err){

    return res.status(500).send("please try again later")

}
})



router.patch("/:id",authenticate,authorise(["admin","instructor"]), async (req,res) => {
try{
    const lecture = await Lecture.findById(req.params.id).updateOne(req.body).lean().exec()

    return res.status(201).send({lecture})
}catch(err){
    return res.status(500).send("please try again later")
}
})

router.delete("/:id",authenticate,authorise(["admin","instructor"]), async (req,res) => {
    try{
        
        const lecture = await Lecture.findByIdAndRemove(req.params.id)

        return res.status(205).send("lecture deleted")
    
    }catch(err){

        return res.status(500).send("please try again later")

    }
})

module.exports = router