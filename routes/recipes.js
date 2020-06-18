const express = require("express");
const router = express.Router();

// Create delete
const { getRecipes, addRecipe, deleteRecipe, deleteRecipeIngredient, addRecipeIngredient, saveEditedRecipe } = require("../controlers/recipes");

// Preserve this order
router.route("/edit").post(saveEditedRecipe);
router.route("/").get(getRecipes).post(addRecipe);
router.route("/:id").delete(deleteRecipe);
router.route("/:recipe_id/:ingredient_id").post(addRecipeIngredient).delete(deleteRecipeIngredient);

module.exports = router;
