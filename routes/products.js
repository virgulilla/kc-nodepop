import express from 'express'
const router = express.Router()
import Product from '../models/Product.js'
import isAuthenticated from '../middlewares/auth.js'

router.get('/', async (req, res, next) => {
  if (!req.session.userId) {
    return res.redirect('/login')
  }
  try {
    const filter = {}
    filter.owner = req.session.userId
    const { tag, price, name, page = 1, limit = 10, sort = 'name' } = req.query

    if (tag) { 
      filter.tags = tag
    }

    if (price) {
      const [min, max] = price.split('-')
      if (min && max) filter.price = { $gte: min, $lte: max }
      else if (min) filter.price = { $gte: min }
      else if (max) filter.price = { $lte: max }
      else filter.price = price
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
      session: req.session 
    })

  } catch (err) {
    next(err)
  }
})

router.get('/add', (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/login')
  }

  res.render('product-form', {
    session: req.session,
    error: null
  })
})

router.post('/', isAuthenticated, async (req, res, next) => {
  try {
    const { name, price, tags, image } = req.body;
    const allowedTags = ['work', 'lifestyle', 'motor', 'mobile']
    const filteredTags = tags.filter(tag => allowedTags.includes(tag))
    const product = new Product({
      name,
      price,
      tags: filteredTags,
      image,
      owner: req.session.userId
    });
    await product.save()
    res.redirect('/products')
  } catch (err) {
    next(err)
  }
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
});



export default router
