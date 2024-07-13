import { Box, Typography, styled, TextField, Button, inputLabelClasses } from "@mui/material";
import { useNavigate, useOutletContext } from "react-router-dom"
import { useState, useRef } from "react";

const AddRecipeForm = styled(Box)({
    padding: "4rem",

    '& > form': {
        display: "flex",

        '& > div > #image-field': {
            marginTop: "16px",
            height: "142px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",

            '& > p': {
                marginBottom: "2rem",
                fontSize: "18px"
            },

            '& > div > div > input': {
                color: "#fff",
            }
        },

        '& > .right-child': {
            marginLeft: "3rem",
            width: "50%",
        }
    },

    '& > form > div > div ': {
        background: "#383737",
        borderRadius: "4px",
        fontSize: "1rem",
        color: "#fff",

        '& > div > input': {
            color: "#fff"
        }
    },

    '& > div > input, textarea': {
        color: "#fff"
    }


})

const AddRecipe = () => {
    const navigate = useNavigate()
    const { openDrawer } = useOutletContext();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    let [ingredients, setIngredients] = useState('');
    const [image, setImage] = useState(null);
    let [steps, setSteps] = useState('');
    const [error, setError] = useState('');
    const imgRef = useRef(null);
    const [loading, setLoading] = useState(false);

    const addRecipeHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        const recipeData = {
            name,
            description,
            ingredients: Array.isArray(ingredients) ? ingredients : ingredients.split(',').map(item => item.trim()),
            image,
            steps: Array.isArray(steps) ? steps : steps.split(',').map(item => item.trim())
        };

        try {
            const response = await fetch('http://localhost:5000/api/recipes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(recipeData),
            });
            const data = await response.json();

            if (response.status === 201) {
                navigate('/recipes');
            } else {
                setError(data.error || 'Unknown server error');
            }
        } catch (error) {
        } finally {
            setLoading(false)
        }
    };

    const handleImgChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <AddRecipeForm style={openDrawer ? { marginLeft: 280 } : { marginLeft: 0 }}>
                <h1>Add a recipe</h1>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form onSubmit={addRecipeHandler}>
                    <Box style={{ width: "45%" }}>
                        <TextField
                            value={name}
                            name="name"
                            onChange={(e) => setName(e.target.value)}
                            label="Name"
                            variant="outlined"
                            fullWidth
                            color=""
                            margin="normal"
                            InputLabelProps={{
                                sx: {
                                    color: "#fff",
                                    [`&.${inputLabelClasses.shrink}`]: {
                                        color: "#fff",
                                        fontSize: "22px",
                                        borderColor: "#fff"
                                    }
                                }
                            }}
                        />

                        <TextField multiline rows={7}
                            value={description}
                            name="description"
                            onChange={(e) => setDescription(e.target.value)}
                            label="Recipe description"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                sx: {
                                    color: "#fff",
                                    [`&.${inputLabelClasses.shrink}`]: {
                                        color: "#fff",
                                        fontSize: "22px",
                                        borderColor: "#fff"
                                    }
                                }
                            }}
                        />
                        <TextField multiline rows={3}
                            value={ingredients}
                            name="ingredients"
                            onChange={(e) => setIngredients(e.target.value)}
                            label="Ingredients (seperated by comma)"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                sx: {
                                    color: "#fff",
                                    [`&.${inputLabelClasses.shrink}`]: {
                                        color: "#fff",
                                        fontSize: "22px",
                                        borderColor: "#fff"
                                    }
                                }
                            }}
                        />

                    </Box>
                    <Box className="right-child">
                        <Box id="image-field">
                            <Typography>Add an image</Typography>
                            <input type='file' accept="image/*" ref={imgRef} className="recipe-details" onChange={handleImgChange} name="image" />
                        </Box>

                        <TextField multiline rows={7}
                            value={steps}
                            name="steps"
                            onChange={(e) => setSteps(e.target.value)}
                            label="Steps  (seperated by comma)"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                sx: {
                                    color: "#fff",
                                    [`&.${inputLabelClasses.shrink}`]: {
                                        color: "#fff",
                                        fontSize: "22px",
                                        borderColor: "#fff"
                                    }
                                }
                            }}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            {!loading ? "PUBLISH RECIPE" : "PUBLISHING..."}
                        </Button>
                    </Box>
                </form>
            </AddRecipeForm>
        </>
    )
}

export default AddRecipe