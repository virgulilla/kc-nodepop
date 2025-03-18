import express from 'express'
import {ProductController} from '../controllers/products.js'
import {isAuthenticated} from '../middlewares/auth.js'
import validateProductFilters from '../middlewares/validateProductFilters.js'
export const productsRouter = express.Router()

productsRouter.get('/', isAuthenticated, validateProductFilters, ProductController.getAll)

productsRouter.get('/add', isAuthenticated, ProductController.add)

productsRouter.post('/add', isAuthenticated, ProductController.create)

productsRouter.post('/:id/delete', isAuthenticated, ProductController.delete)
