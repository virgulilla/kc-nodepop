import express from 'express'
import User from '../models/User.js'
import bcrypt from 'bcrypt'

const router = express.Router()

router.get('/login', (req, res) => {

  if (req.session.userId) {
    return res.redirect('/products')
  }

  res.render('login', {
    session: req.session,
    error: null
  })
})

router.post('/login', async (req, res, next) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    const isPasswordValid = user ? await bcrypt.compare(password, user.password) : false

    if (!user || !isPasswordValid) {
      return res.render('login', {
        session: req.session,
        error: 'Credenciales incorrectas'
      })
    }

    req.session.userId = user._id

    res.redirect('/products')
  } catch (err) {
    next(err)
  }
})

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login')
  })
})

export default router
