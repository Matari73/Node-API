const errorMiddleware = (err, req, res, next)=>{
    console.log('Here is an error middleware')
}

module.exports = errorMiddleware