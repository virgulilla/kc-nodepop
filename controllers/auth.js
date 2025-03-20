import UserModel from '../models/UserModel.js'

export class UserController {
  static show  (req, res)  {
    if (req.session.userId) {
      return res.redirect('/products')
    }
  
    res.render('login', {
      session: req.session
    })
  }

  static async login (req, res, next)  {
    const { email, password } = req.body
  
    try {
      const user = await UserModel.validateCredentials({ email, password })
  
      if (!user) {
        req.flash('error', 'Credenciales incorrectas')
  
        const flashMessages = {
          error: req.flash('error'),
          success: req.flash('success')
        }
  
        return res.status(401).render('login', { flashMessages, session: req.session })
      }
  
      req.session.userId = user._id
  
      res.redirect('/products')
    } catch (err) {
      next(err)
    }
  }

  static registerShow (req, res) {
    if (req.session.userId) {
      return res.redirect('/products')
    }
  
    res.render('signup', { session: req.session })
  }

  static async register (req, res, next)  {
      const { email, password } = req.body
    
      try {
        const existingUser = await UserModel.findByEmail(email)
    
        if (existingUser) {
          req.flash('error', 'El email ya está registrado')
          const flashMessages = {
            error: req.flash('error'),
            success: req.flash('success')
          }
    
          return res.status(400).render('signup', { flashMessages, session: req.session })
        }
    
        await UserModel.createUser({ email, password })
    
        req.flash('success', 'Usuario registrado correctamente. Inicia sesión.')
        res.redirect('/login')
      } catch (err) {
        next(err)
      }
    }

    static logout (req, res)  {
      req.session.destroy(() => {
        res.redirect('/')
      })
    }
}
