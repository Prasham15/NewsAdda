const mongoose = require('mongoose')
const mongoConn = async () => {
    try {
        const connect = await mongoose.connect("mongodb+srv://shahprasham15:TxqN8-TJyfJqHJ4@cluster0.aopixi8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        console.log("Monogo Db Connected");
        console.log(connect.connection.host);
    } catch (error) {
        console.log("Monogo Db Not Connected");
        console.log(error);
    }
}
    // check whether database is connected properly or no}

// create a Schema
const LoginSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    following:{
        type: [String]
    },
    saved:{
        type: [Object]
    }

})

// collection creation
const collection = new mongoose.model("users", LoginSchema);

module.exports = {collection, mongoConn}