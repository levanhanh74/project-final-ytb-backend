const UserRouter = require('./userRouter');


const routes = (app) => {

    app.use("/api/user", UserRouter)
    // app.get("/", (req, res)=>{
    //     res.send("hanh")
    // })
}
module.exports = routes;