const express = require('express')
const Recipe = require('./model')
const {checkRecipeId} = require('./middleware')

const router = express.Router()


router.get('/:recipe_id', checkRecipeId, (req, res, next) => {
    res.status(200).json(req.recipe)
})


router.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
      sageAdvice: 'Finding the real error is 90% of the bug fix',
      message: err.message,
      stack: err.stack,
    })
  })

module.exports = router
