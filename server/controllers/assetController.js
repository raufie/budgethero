const User = require("../models/User")
const Asset = require('../models/Asset')
const { del } = require("express/lib/application")

const addAsset = async (req, res, next)=>{
    try{
        const asset = await Asset.create({...req.body,userId:req.verifiedUserId})
        res.status(200).json({
            message:"added an assset"
        })
    }catch(e){
        console.log(e)
        res.status(400).json({
            error: "error adding asset"
        })
    }
}

const editAsset = async (req, res, next)=>{
    try{
        const asset = await Asset.findByIdAndUpdate( req.params.id, req.body)
        res.status(200).json({
            message:"successfully updated an assset"
        })
    }catch(e){
        console.log(e)
        res.status(400).json({
            error: "error updating asset"
        })
    }
}
const deleteAsset =async (req, res, next) =>{
    try{
        await Asset.deleteOne({_id:req.params.id})
        res.status(200).json({
            message:"successfully deleted an assset"
        })
    }catch (e) {
        console.log(e)
        res.status(400).json({
            error: "error deleting asset"
        })
    }
}
const getAssets = async (req, res, next)=>{
    try{
    const assets = await Asset.find({ date: { $gte: req.body.from, $lte: req.body.to },userId:req.verifiedUserId })
    res.status(200).json(assets)
    }catch (e){
        res.status(400).json({
            message:"error getting assets"
        })
    }
}

exports.addAsset = addAsset
exports.editAsset = editAsset
exports.deleteAsset = deleteAsset
exports.getAssets = getAssets