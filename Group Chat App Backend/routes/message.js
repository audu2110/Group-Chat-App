const path = require('path');

const express = require('express');


const router = express.Router();


const { Op } = require("sequelize");
const userAuth=require('../middleware/auth');
const bodyParser = require('body-parser');
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }));
const Message = require('../models/message');
const User = require('../models/user');


router.post("/sendmsg",userAuth.authenticate,async (req, res, next) => {
    const user = req.user;
    const message = req.body.message;
    const username = req.user.name;
    const groupid=req.body.groupid;
    if(!groupid){
        const data= await user.createMessage({ message: message, Username: username })
        res.status(201).json({newUserDetail:data})
      }
      else{
        const data= await user.createMessage({ message: message, Username: username,GroupId:groupid })
        res.status(201).json({newUserDetail:data})
    
      }
    
  })

router.get("/getmessages",userAuth.authenticate,async (req, res) => {
    const id=req.user.id
    console.log("hvvgjvghvjgchcghgcvhjh",id)
    const messages= await Message.findAll();
    console.log("vggvsvhhvaghsvgvsvghsghsghsgs=>",messages);
    res.status(200).json({allMessages:messages})
    // { where : { userId: req.user.id}}
  })

router.get("/getusers",userAuth.authenticate,async(req,res)=>{
  const users = await User.findAll();
  console.log("All users =>",users)
  res.status(200).json({allUsers:users})
})




module.exports = router;