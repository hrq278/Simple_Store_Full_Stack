import mongoose, {Schema} from "mongoose";

const productSchema = new Schema({
    name:{
        type: String,
        required:true
    },
    price:{
        type: Number,
        required:true
    },
    image:{
        type: String,
        required:true
    }

},
{
    timestamps: true

})

export const Product = mongoose.model("product",productSchema)