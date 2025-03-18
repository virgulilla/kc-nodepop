import ProductModel from '../models/ProductModel.js'

export class ProductController {
    static async getAll (req, res) {
          try {
            const userId = req.session.userId
        
            const result = await ProductModel.getFilteredProducts({
              userId,
              ...req.query
            })
        
            res.render('products', {
              products: result.products,
              currentPage: result.currentPage,
              totalPages: result.totalPages,
              totalProducts: result.totalProducts,
              limit: result.limit,
              session: req.session,
              req
            })
        
          } catch (err) {
            next(err)
          }
    }

    static add (req, res) {
      res.render('product-form', {
        session: req.session,
        error: null
      })
    }

    static async create (req, res, next) {
      try {
        const { name, price, tags, image } = req.body
    
        await ProductModel.createProduct({
          name,
          price,
          tags,
          image,
          owner: req.session.userId
        })
    
        req.flash('success', "Producto creado correctamente")
        res.redirect('/products')
      } catch (err) {
        next(err)
      }
    }

    static async delete (req, res, next) {
      try {
        const deletedProduct = await ProductModel.deleteProductById({
          productId: req.params.id,
          userId: req.session.userId
        })
    
        if (!deletedProduct) {
          return res.status(404).send('Producto no encontrado o no autorizado')
        }
    
        res.redirect('/products')
      } catch (err) {
        next(err)
      }
    }
}