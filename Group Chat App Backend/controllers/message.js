const path = require('path');

const express = require('express');


const router = express.Router();

const jwt = require('jsonwebtoken')
const { Op } = require("sequelize");
const userAuth=require('../middleware/auth');
const bodyParser = require('body-parser');
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }));
const Message = require('../models/message');
const User = require('../models/user');

exports.sendMessage=async (req, res, next) => {
    const groupId=req.params.groupId;
    const user = req.user;
    const uid = req.user.id;
    const message = req.body.message;
    const username = req.user.name;
    console.log("user name in send msg", username);
    if(!groupId){
      const data=await user.createMessage({ message: message, Username: username })
        res.status(201).json({newUserDetail:data})
  
    }
    else{
      const data= await user.createMessage({ message: message, Username: username,groupId:groupId })
        res.status(201).json({newUserDetail:data})
    }
    
  }

exports.getMessages=async (req, res) => {
    const id=req.user.id
    console.log("hvvgjvghvjgchcghgcvhjh",id)
    const messages= await Message.findAll({where:{groupId:null}});
    
    res.status(200).json({allMessages:messages})
    
  }

exports.getUsers=async(req,res)=>{
    const users = await User.findAll();
    
    res.status(200).json({allUsers:users})
  }

exports.getGroupMessages=async(req,res)=>{
    try {
      const groupId = req.params.groupId
      
      const message = await Message.findAll({
        where: {
          groupId: groupId
        }
    })
    res.status(201).json({ message: message })
    } 
    catch (err) {
        res.status(401).json(err)
    }
  }