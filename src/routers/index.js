const UserRouter  = require('./userRouter');

const routes = (app) => {
    app.use("/", UserRouter)
}
module.exports = routes;