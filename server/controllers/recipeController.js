import Recipe from '../models/Recipe.js';
import multer from 'multer';

const getRecipes = async (req, res) => {
    const recipes = await Recipe.find({});
    res.json(recipes);
};

const getRecipeById = async (req, res) => {
    const recipe = await Recipe.findById(req.params.id);

    if (recipe) {
        res.json(recipe);
    } else {
        res.status(404).json({ message: 'Recipe not found' });
    }
};


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });
const createRecipe = async (req, res) => {
    try {
        const newRecipe = new Recipe({
            name: req.body.name,
            description: req.body.description,
            ingredients: req.body.ingredients.split(','),
            image: req.file.path,
            steps: req.body.steps.split(','),
            user: req.user._id,
        });
        const createRecipe = await newRecipe.save();
        res.status(201).json(createRecipe);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const deleteRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        if (recipe.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized to delete this recipe' });
        }
        await recipe.deleteOne();
        res.json({ message: 'Recipe removed' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getMyRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find({ user: req.user._id });
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch recipes' });
    }
};

const searchRecipes = async (req, res) => {
    try {
        const query = req.query.q;
        const recipes = await Recipe.find({ name: new RegExp(query, 'i') });
        res.json(recipes);
    } catch (error) {
        res.status(500).send(error);
    }
};

export {
    getRecipes,
    getRecipeById,
    createRecipe,
    deleteRecipe,
    getMyRecipes,
    upload,
    searchRecipes
};
