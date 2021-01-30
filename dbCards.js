import mongoose from "mongoose";

const cardSchema = mongoose.Schema({
    name: String,
    imgurl: String
})

export default mongoose.model('Cards' , cardSchema);