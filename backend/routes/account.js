const express=require('express');
const { authmiddleware } = require('../middleware');
const { User, Account } = require('../db/schema');
const { default: mongoose } = require('mongoose');
const router=express.Router();
router.get('/balance',authmiddleware,async function(req,res){
  
    const account=await Account.findOne({
        userid:req.userid,
    })
    
    res.json({
    balance:account.balance
    })
})
router.post('/transfer',authmiddleware, async function(req,res){
    const session=await mongoose.startSession();
    session.startTransaction();
    const {amount,to}=req.body;
    const account=await Account.findOne({userid:req.userid}).session(session);
    
    if(!account || account.balance<amount){
    await session.abortTransaction();
   return res.status(400).json({
        msg:"insufficient balance"
    })
    }
    const toaccount=await Account.findOne({userid:to}).session(session);
    if(!toaccount){
        await session.abortTransaction();
   return res.status(400).json({
        msg:"invalid user"})
    }
    await Account.updateOne({userid:req.userid},{"$inc":{
        balance:-amount,
    }}).session(session);
    await Account.updateOne({userid:to},{"$inc":{
        balance:amount,
    }}).session(session);
    await session.commitTransaction();
   return res.json({
        msg:"transfer succesfull",
    })

})
module.exports=router;