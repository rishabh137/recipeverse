import Recipe from '../models/Recipe.js'
import { v2 as cloudinary } from "cloudinary"

const getRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find().sort({ createdAt: -1 });

        if (recipes.length === 0) {
            return res.status(200).json([])
        }
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ error: "something went wrong" })
    }
};

const getRecipeById = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);

        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        res.status(200).json(recipe);

    } catch (error) {
        res.status(500).json({ error: "something went wrong" })
    }
};

const createRecipe = async (req, res) => {
    try {
        let { name, description, ingredients, image, steps } = req.body

        if (!name || !description || !ingredients || !image || !steps) {

            return res.status(400).json({ error: "Field can't be empty" })
        }

        let parsedIngredients = Array.isArray(ingredients)
            ? ingredients
            : ingredients.split(',').map(item => item.trim())

        let parsedSteps = Array.isArray(steps)
            ? steps
            : steps.split(',').map(item => item.trim())

        if (image) {
            const uploadedResponse = await cloudinary.uploader.upload(image)
            image = uploadedResponse.secure_url
        }

        const newRecipe = new Recipe({
            name,
            description,
            ingredients: parsedIngredients,
            image,
            steps: parsedSteps,
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
        if (recipe.image) {
            const imgId = recipe.image.split("/").pop().split(".")[0]
            await cloudinary.uploader.destroy(imgId)
        }

        await recipe.deleteOne();
        res.json({ message: 'Recipe deleted' });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getMyRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find({ user: req.user._id });
        if (!recipes || recipes.length === 0) {
            res.status(500).json({ error: "create your first post " })
        }
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch recipes' });
    }
};

const searchRecipes = async (req, res) => {
    try {
        const query = req.query.q;
        const recipes = await Recipe.find({ name: new RegExp(query, 'i') });
        if (!recipes) {
            res.status(500).json({ error: "No recipe" })
        }
        res.status(200).json(recipes);
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
    searchRecipes
};
