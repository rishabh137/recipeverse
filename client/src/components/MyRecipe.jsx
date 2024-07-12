import { useOutletContext, NavLink, useNavigate } from "react-router-dom"
import { Box, Typography } from "@mui/material";
import { RecipeContainer } from "./Recipe";
import { useState, useEffect } from "react";
import axios from "axios";

const MyRecipe = () => {
    const navigate = useNavigate()
    const { openDrawer } = useOutletContext();
    const [recipes, setRecipes] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMyRecipes = async () => {
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const { data } = await axios.get('http://localhost:5000/api/recipes/myrecipes', config);
                setRecipes(data);
            } catch (error) {
                console.error(error);
                setError('Failed to fetch recipes');
            }
        };
        fetchMyRecipes();
    }, []);

    const handleDelete = async (id) => {
        const token = localStorage.getItem('token');
        var con = window.confirm("Are you sure to delete your recipe?")
        if (con === false) {
            return
        }

        const response = await fetch(`http://localhost:5000/api/recipes/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.ok) {
            navigate('/recipes');
        }
    };

    return (
        <>
            <RecipeContainer style={openDrawer ? { marginLeft: 280 } : { marginLeft: 0 }}>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {recipes.length === 0 ? <h1 style={{ fontWeight: "400", color: "#eb6b16" }}>Create your first post</h1> :
                    <>
                        {recipes.map((recipe) => (
                            <Box>
                                <img src={`http://localhost:5000/${recipe.image}`} alt={recipe.name} />
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
                                }} onClick={() => handleDelete(recipe._id)}>Delete Recipe</button>
                            </Box>
                        ))}
                    </>
                }
            </RecipeContainer>
        </>
    )
}

export default MyRecipe