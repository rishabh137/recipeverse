import { useOutletContext, useParams } from "react-router-dom"
import { Box, Typography, styled } from "@mui/material"
import { useState, useEffect } from "react"

const RecipeOverviewContainer = styled(Box)({
    padding: "4rem",

    "& > .username": {
        fontWeight: "400"
    },

    '& > div': {
        display: "flex",

        '& > img': {
            width: "45%",
            height: "650px",
            marginRight: "4rem"
        },

        '& > div .recipe-heading': {
            color: "#eb6b16",
            fontWeight: 400
        },

        '&> div ul li': {
            fontFamily: "sans-serif",
            fontSize: "20px",
            margin: "10px 0"
        },

        '& > div > .food-item': {
            marginTop: 0
        }
    },
})

const RecipeOverview = () => {
    const { openDrawer } = useOutletContext();
    const { id } = useParams();
    const [recipe, setRecipe] = useState({});
    const [user, setUser] = useState({})
    const val = recipe.user

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/recipes/${id}`);
                const data = await response.json()
                if (response.status === 200) {
                    setRecipe(data)
                    return data
                } else {
                    throw new Error(data.error || "Unknown server error");
                }
            } catch (error) {
                throw new Error(error)
            }
        };
        fetchRecipe();
    }, [id]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/users/${val}`, {
                    credentials: 'include',
                });
                const data = await response.json()
                if (response.ok) {
                    setUser(data)
                } else {
                    throw new Error(data.error || "Unknown server error");
                }
            } catch (error) {

            }
        };

        fetchUser();
    }, [val]);
    return (
        <>
            <RecipeOverviewContainer style={openDrawer ? { marginLeft: 280 } : { marginLeft: 0 }}>
                <h1 className="username">Posted by:<span style={{ color: "#eb6b16" }}> {user.username}</span></h1>
                <Box>
                    <img src={recipe.image} alt={recipe.name} />
                    <Box>
                        <h1 className="recipe-heading food-item">{recipe.name}</h1>
                        <Box>
                            <h2 className="recipe-heading">Description:</h2>
                            <Typography> {recipe.description}</Typography>
                        </Box>
                        <Box>
                            <h2 className="recipe-heading">Ingredients used:</h2>
                            <ul>
                                {recipe.ingredients && recipe.ingredients.map((ing, index) => (
                                    <li key={index}>{Array.isArray(ing) ? ing.join(', ') : ing}</li>
                                ))}
                            </ul>
                        </Box>
                        <Box>
                            <h2 className="recipe-heading">Steps to make dish:</h2>
                            <ol>
                                {recipe.steps && recipe.steps.map((step, index) => (
                                    <li key={index}>{Array.isArray(step) ? step.join(', ') : step}</li>
                                ))}
                            </ol>
                        </Box>
                    </Box>
                </Box>
            </RecipeOverviewContainer>
        </>
    )
}

export default RecipeOverview