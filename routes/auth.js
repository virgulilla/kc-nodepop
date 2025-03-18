import express from 'express'
import User from '../models/User.js'
import bcrypt from 'bcrypt'
import {validateUserFields} from '../middlewares/auth.js'

export const authRouter = express.Router()

authRouter.get('/login', (req, res) => {

  if (req.session.userId) {
    return res.redirect('/products')
  }

  res.render('login', {
    session: req.session
  })
})

authRouter.post('/login', validateUserFields,  async (req, res, next) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    const isPasswordValid = user ? await bcrypt.compare(password, user.password) : false

    if (!user || !isPasswordValid) {
      req.flash('error', 'Credenciales incorrectas')

      const flashMessages = {
        error: req.flash('error'),
        success: req.flash('success'),
      };
      
      return res.status(401).render('login', { flashMessages,  session: req.session })
    }

    req.session.userId = user._id

    res.redirect('/products')
  } catch (err) {
    next(err)
  }
})

authRouter.get('/signup', (req, res) => {

  if (req.session.userId) {
    return res.redirect('/products')
  }

  res.render('signup', { session: req.session})
})

authRouter.post('/signup', async (req, res) => {
  req.flash('error', 'Pendiente implementación de registro')
  const flashMessages = {
    error: req.flash('error'),
    success: req.flash('success'),
  };
  return res.status(500).render('signup', { flashMessages,  session: req.session })
})

authRouter.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/')
  })
})
