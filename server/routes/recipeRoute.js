import express from 'express'
import {
    getRecipes,
    getRecipeById,
    createRecipe,
    deleteRecipe,
    getMyRecipes,
    upload,
    searchRecipes
} from '../controllers/recipeController.js';
import protect from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/', protect, upload.single('image'), createRecipe);
router.route('/').get(getRecipes);
router.route('/myrecipes').get(protect, getMyRecipes);
router.delete('/:id', protect, deleteRecipe);
router.get('/search', searchRecipes);
router
    .route('/:id')
    .get(getRecipeById)
    .delete(protect, deleteRecipe);

export default router;
