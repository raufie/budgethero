const Asset = require('../models/Asset')
const Expense = require('../models/Expense')

const getCashEarned = async (req, res, next)=>{
    try{
        const sorted = await Asset.find({
            userId: req.verifiedUserId,
        }).sort({date:1}).select({amount:1, date:1})
        console.log(sorted)
        res.status(200).json(sorted)
    }catch(E){
        console.log(E)
        res.status(400).json({
            error:"error getting cash earned"
        })
    }
}
const getCashSpent = async (req, res, next)=>{
    try{
        const sorted = await Expense.find({
            userId: req.verifiedUserId,
        }).sort({date:1})
        res.status(200).json(sorted)
    }catch(E){
        console.log(E)
        res.status(400).json({
            error:"error getting cash spent"
        })
    }
}
exports.getCashEarned = getCashEarned
exports.getCashSpent = getCashSpent