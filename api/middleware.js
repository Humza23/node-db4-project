const {getRecipeById} = require('./model')

const checkRecipeId = (req, res, next) =>{
    getRecipeById(req.params.recipe_id)
    .then(recipe => {
        if (!recipe) {
            next({ status: 404, message: 'no recipe by that id exists '})
        } else {
            req.recipe = recipe
            next()
        }
    })
    .catch(err => {
        next(err)
    })
}

module.exports = {
    checkRecipeId
}