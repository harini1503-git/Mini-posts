const mongoose= require("mongoose");

const chatschema= new mongoose.Schema({
    from: {
        type: String,
        required: true
    },
    message: {
        type: String,
    },
    created_at:{
        type: Date
    },
    image: {
        type: String,
    }
});

const chat= new mongoose.model("chat", chatschema);

module.exports= chat;