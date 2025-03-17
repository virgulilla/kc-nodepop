import express from 'express'
const router = express.Router()
import Product from '../models/Product.js'
import {isAuthenticated} from '../middlewares/auth.js'
import validateProductFilters from '../middlewares/validateProductFilters.js'

router.get('/', isAuthenticated, validateProductFilters, async (req, res, next) => {
  try {
    const filter = {}
    filter.owner = req.session.userId
    const { tag, min, max, name, page = 1, limit = 10, sort = 'name' } = req.query

    if (tag) { 
      filter.tags = tag
    }

    if (min !== undefined || max !== undefined) {
      filter.price = {}

      if (min !== undefined) filter.price.$gte = Number(min)
      if (max !== undefined) filter.price.$lte = Number(max)

      if (Object.keys(filter.price).length === 0) {
        delete filter.price
      }
    }

    if (name) {
      filter.name = new RegExp('^' + name, 'i')
    }

    const skip = (parseInt(page) - 1) * parseInt(limit)
    const totalProducts = await Product.countDocuments(filter)

    const products = await Product.find(filter)
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .sort(sort)
      .exec()

    const totalPages = Math.ceil(totalProducts / limit)  
    res.render('products', { 
      products,
      currentPage: parseInt(page),
      totalPages,
      totalProducts,
      limit: parseInt(limit),
      session: req.session,
      req
    })

  } catch (err) {
    next(err)
  }
})

router.get('/add', isAuthenticated, (req, res) => {

  res.render('product-form', {
    session: req.session,
    error: null
  })
})

router.post('/add', isAuthenticated, async (req, res, next) => {
  const { name, price, tags, image } = req.body;
    const allowedTags = ['work', 'lifestyle', 'motor', 'mobile']
    const normalizedTags = Array.isArray(tags) ? tags : [tags] 
    const filteredTags = normalizedTags.filter(tag => allowedTags.includes(tag))
    const product = new Product({
      name,
      price,
      tags: filteredTags,
      image,
      owner: req.session.userId
    });
    await product.save()
    req.flash('success', "Producto creado correctamente");
    res.redirect('/products')
})


router.post('/:id/delete', isAuthenticated, async (req, res, next) => {
  if (!req.session.userId) {
    return res.redirect('/login')
  }
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      owner: req.session.userId
    })

    if (!product) {
      return res.status(404).send('Producto no encontrado o no autorizado')
    }
    
    await product.deleteOne()
    res.redirect('/products')
  } catch (err) {
    next(err);
  }
})



export default router
