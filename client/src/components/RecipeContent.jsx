import { Box, Typography } from "@mui/material";
import { NavLink } from "react-router-dom"
import { useState, useEffect } from "react"

const RecipeContent = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {

                const response = await fetch('http://localhost:5000/api/recipes');
                const data = await response.json()
                if (response.status === 200) {
                    setRecipes(data)
                } else {
                    throw new Error(data.error || "Unknown server error");
                }
            } catch (error) {
                throw new Error(error)
            }
        };
        fetchRecipes();
    }, []);

    return (
        <>
            {recipes.map((recipe) => (
                <Box>
                    <img src={recipe.image} alt={recipe.name} />
                    <Box>
                        <h1>{recipe.name}</h1>
                        <h2>Ingredients: </h2>
                        <Typography style={{ marginBottom: "1rem" }}>{recipe.ingredients.slice(0, 2)}...</Typography>
                        <Typography>{recipe.description.slice(0, 100)}...</Typography>
                    </Box>
                    <button><NavLink to={`/recipes/${recipe._id}`}>Read more</NavLink></button>
                </Box>
            ))}
        </>
    )
}

export default RecipeContent