const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productModel')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

//routes
app.get('/', (req, res)=>{
    res.send('Hello world!')
})

app.get('/products', async(req, res)=>{
    try {
        const products = await Product.find({})
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get('/products/:id', async(req, res)=>{
    try {
        const {id}= req.params
        const product = await Product.findById(id)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.post('/product', async(req, res)=>{
    try{
        const product = await Product.create(req.body)
        res.status(200).json(product)
    }catch(error){
        res.status(500).json({message: error.message})
    }
})

//update
app.put('/products/:id', async(req,res)=>{
    try {
        const {id}= req.params
        const product = await Product.findByIdAndUpdate(id, req.body)
        //Se o produto não for encontrado no banco
        if (!product) {
            return req.status(404).json({message:'Produto não encontrado com o ID ${id}'})
        }
        const updatedProduct = await Product.findById(id)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//delete
app.delete('/products/:id', async(req,res)=>{
    try {
        const {id}= req.params
        const product = await Product.findByIdAndDelete(id)
        if (!product) {
            return req.status(404).json({message:'Produto não encontrado com o ID ${id}'})
        }
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

mongoose.
connect('mongodb+srv://admin:secret123@matariapi.3pidank.mongodb.net/Node-API?retryWrites=true&w=majority')
.then(()=> {
    console.log("Conexão com MongoDB realizada")
    app.listen(3001, ()=>{
        console.log('API rodando na porta 3001')
    })
}).catch((error)=>{
    console.log(error)
})