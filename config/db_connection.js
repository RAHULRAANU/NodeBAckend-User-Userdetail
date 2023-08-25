const mongoose = require("mongoose");

const Connection_db = async () => {
    try{
        const Connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log(
        "  DATABASE CONNECTED .........   at  ",
        Connect.connection.host,
        Connect.connection.user,
        Connect.connection.useDb
        );
    } catch(err){
        console.log(err);
        process.exit(1);
    }
};

module.exports = Connection_db;


