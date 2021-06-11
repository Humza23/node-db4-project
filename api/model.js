const db = require('../data/db-config')
async function getRecipeById(recipe_id) {
    const data = await db('recipes as rp')
        .select('rp.*', 'st.step_id', 'st.step_number', 'st.step_instructions', 'ing.*', 'si.ingredient_quantity')
        .join('steps as st', 'rp.recipe_id', 'st.recipe_id')
        .join('steps_ingredients as si', 'st.step_id', 'si.step_id')
        .join('ingredients as ing', 'si.ingredient_id', 'ing.ingredient_id')
        .where('rp.recipe_id', recipe_id)

    const steps = data.map(x => {
        return {
          step_id: x.step_id,
          step_number: x.step_number,
          step_instructions: x.step_instructions,
          ingredients: x.ingredient_name,
          quantity: x.ingredient_quantity
        }
      })
      const transformedData = {
        recipe_id: data[0].recipe_id,
        recipe_name: data[0].recipe_name,
        created_at: data[0].created_at,
        steps: steps[0].step_id == null ? [] : steps
      }
      return transformedData
}
module.exports = {
    getRecipeById
}