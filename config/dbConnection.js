const mongoose = require("mongoose");

//function for connectdb and it is going to be async
const connectDB = async () => {
    try{
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("Database connected: ", 
        connect.connection.host,
        connect.connection.name
        );
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

module.exports = connectDB;