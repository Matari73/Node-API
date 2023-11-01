require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const productRouter = require('./routes/productRoute')
const errorMiddleware = require('./middleware/errorMiddleware')

const app = express()

const PORT = process.env.PORT || 3001
const MONGO_URL = process.env.MONGO_URL

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/api/products', productRouter)

app.get('/', (req, res)=>{
    res.send('Hello world!')
})

app.use(errorMiddleware)

mongoose.connect(MONGO_URL)
.then(()=> {
    console.log("Conexão com MongoDB realizada")
    app.listen(PORT, ()=>{
        console.log(`API rodando na porta ${PORT}`)
    })
}).catch((error)=>{
    console.log(error)
})