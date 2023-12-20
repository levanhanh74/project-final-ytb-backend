const mongoose = require('mongoose');

//  Connect Db bang mongoodb on the cloud mongoogb. We have used 
async function connectDB() {
    try {
        await mongoose.connect(`mongodb+srv://levanhanh74:qXgGJbvSM6gDoxcm@cluster0.limhzfu.mongodb.net/?retryWrites=true&w=majority`);
        console.log("Connect Successfully");
    } catch (error) {
        console.log("Connect unSuccessfully", error);
    }
}
module.exports = { connectDB };