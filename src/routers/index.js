const UserRouter = require('./userRouter');
const ProductRouter = require('./productsRouter');


const routes = (app) => {

    app.use("/api/user", UserRouter)
    app.use("/api/product", ProductRouter)
    // app.get("/", (req, res)=>{
    //     res.send("hanh")
    // })
}
module.exports = routes;