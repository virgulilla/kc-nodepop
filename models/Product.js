import mongoose from 'mongoose'

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  price: { type: Number, required: true },
  image: String,
  tags: { type: [String], enum: ['work', 'lifestyle', 'motor', 'mobile'] }
})

const Product = mongoose.model('Product', productSchema)

export default Product
