import express from 'express'
import { getRecipes, getRecipeById, createRecipe, deleteRecipe, getMyRecipes, searchRecipes } from '../controllers/recipeController.js';
import protect from '../middleware/authMiddleware.js';
const router = express.Router();

router.get('/myrecipes', protect, getMyRecipes)
router.post('/', protect, createRecipe)
router.get('/', getRecipes)
router.get('/search', searchRecipes)
router.get('/:id', getRecipeById)
router.delete('/:id', protect, deleteRecipe)

export default router;
