import {Schema, model} from 'mongoose'

const Product  = new Schema({
    name: { type: String, required: true },
    precio: { type: Number, required: true },
    image: { type: String },
    amzLink: { type: String },
    gncLink: { type: String },
    rating: {type: Number}
})

export default model('Product', Product)