const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const config = require('config')
const cors = require('cors')
const PORT = process.env.PORT || 5000

const userRoutes = require("./routes/userRoutes")
const assetRoutes = require("./routes/assetRoutes")
const expenseRoutes = require("./routes/expenseRoutes")
const statsRoutes = require("./routes/statsRoutes")



const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use('/users', userRoutes)
app.use('/assets', assetRoutes)
app.use('/expenses', expenseRoutes)
app.use('/stats', statsRoutes)


mongoose.connect(config.get('mongoURI')).then(res=>{
    app.listen(PORT, ()=>{
        console.log("connected to mongodb and listening for requests at ", PORT)
    })
})
.catch(e=>{
    console.log(e)
})



