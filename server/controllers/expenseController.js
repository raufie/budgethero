const User = require("../models/User")
const Expense = require('../models/Expense')

const addExpense = async (req, res, next)=>{
    try{
        const expense = await Expense.create({...req.body,userId:req.verifiedUserId})
        res.status(200).json({
            message:"added an expense"
        })
    }catch (e){
        console.log(e)
        res.status(400).json({
            error: "error adding Expense"
        })
    }
}

const editExpense = async (req, res, next)=>{
    try{
        const expense = await Expense.findByIdAndUpdate( req.params.id, req.body)
        res.status(200).json({
            message:"successfully updated an expense"
        })
    }catch(e) {
        console.log(e)
        res.status(400).json({
            error: "error updating Expense"
        })
    }
}

const deleteExpense =async (req, res, next) =>{
    try{
        await Expense.deleteOne({_id:req.params.id})
        res.status(200).json({
            message:"successfully deleted an expense"
        })
    }catch(e){
        console.log(e)
        res.status(400).json({
            error: "error deleting Expense"
        })
    }
}

const getExpenses = async (req, res, next)=>{
    try{
    const expenses = await Expense.find({ date: { $gte: req.body.from, $lte: req.body.to } , userId:req.verifiedUserId})
    res.status(200).json(expenses)
    }catch (e){
        res.status(400).json({
            message:"error getting expenses"
        })
    }
}
exports.addExpense = addExpense
exports.editExpense = editExpense
exports.deleteExpense = deleteExpense
exports.getExpenses = getExpenses