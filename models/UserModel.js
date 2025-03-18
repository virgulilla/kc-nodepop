import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
})

const User = mongoose.model('User', userSchema)

class UserModel {

  static async findByEmail(email) {
    return await User.findOne({ email })
  }

  static async validateCredentials({ email, password }) {
    const user = await this.findByEmail(email)
    if (!user) {
      return null
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return null
    }

    return user
  }

  static async createUser({ email, password }) {
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = new User({
      email,
      password: hashedPassword
    })

    return await user.save()
  }
}

export default UserModel
