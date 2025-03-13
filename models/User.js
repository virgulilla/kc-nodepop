import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true } // TODO: a futuro hashear pasword
})

const User = mongoose.model('User', userSchema)

export default User
