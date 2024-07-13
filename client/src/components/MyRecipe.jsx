import { useOutletContext, NavLink, useNavigate } from "react-router-dom"
import { Box, Typography } from "@mui/material";
import { RecipeContainer } from "./Recipe";
import { useState, useEffect } from "react";

const MyRecipe = () => {
    const navigate = useNavigate()
    const { openDrawer } = useOutletContext();
    const [recipes, setRecipes] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchMyRecipes = async () => {
            setError("")
            try {
                const response = await fetch('http://localhost:5000/api/recipes/myrecipes', {
                    credentials: 'include'
                });
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || 'Unknown server error');
                }
                setRecipes(data)
            } catch (error) {
                setError('Create your first post');
            }
        };
        fetchMyRecipes();
    }, []);

    const handleDelete = async (id) => {
        var con = window.confirm("Are you sure to delete your recipe?")
        if (con === false) {
            return
        }

        try {
            setLoading(true)
            const response = await fetch(`http://localhost:5000/api/recipes/${id}`, {
                method: 'DELETE',
                credentials: 'include',
            });

            const data = response.json()

            if (response.ok) {
                navigate('/recipes');
            } else {
                throw new Error(data.error || "Unknown server error");
            }
        } catch (error) {
            throw new Error(error)
        } finally {
            setLoading(false)
        }
    };

    return (
        <>
            <RecipeContainer style={openDrawer ? { marginLeft: 280 } : { marginLeft: 0 }}>
                {error && <p style={{ color: '#eb6b16', fontSize: "2rem", fontWeight: "400" }}>{error}</p>}
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
                            <button style={{
                                color: "#fff",
                                textDecoration: "none",
                                fontSize: "18px",
                                background: "#eb6b16",
                                padding: "12px 12px",
                                cursor: "pointer"
                            }} onClick={() => handleDelete(recipe._id)}> {!loading ? "Delete Recipe" : "Deleting..."} </button>
                        </Box>
                    ))}
                </>
            </RecipeContainer>
        </>
    )
}

export default MyRecipe