export const addFlashMessages = (req, res, next) => {
    res.locals.flashMessages = {
      error: req.flash('error'),
      success: req.flash('success')
    }
    next()
  }