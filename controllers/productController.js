const Product = require("../models/productModel")

//get all
const getProducts = async(req, res)=>{
    try {
        const products = await Product.find({})
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

//get by id
const getProduct = async(req, res)=>{
    try {
        const {id}= req.params
        const product = await Product.findById(id)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

//post product
const createProduct = async(req, res)=>{
    try{
        const product = await Product.create(req.body)
        res.status(200).json(product)
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

//update product
const updateProduct = async(req,res)=>{
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
}

//delete product
const deleteProduct = async(req,res)=>{
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
}

module.exports = {
    getProducts, 
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}