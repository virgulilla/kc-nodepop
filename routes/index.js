import express from 'express'
export const indexRouter = express.Router()

/* GET home page. */
indexRouter.get('/', function(req, res, next) {
  console.log("asdf")
  res.render('index')
})
