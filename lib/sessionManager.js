import session from 'express-session'
import dotenv from 'dotenv'

dotenv.config()

const INACTIVITY_EXPIRATION_2_DAYS = 2 * 24 * 60 * 60 * 1000

export const sessionMiddleware = session({
    name: 'nodepop-session',
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: INACTIVITY_EXPIRATION_2_DAYS }
  })