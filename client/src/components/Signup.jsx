import { TextField, inputLabelClasses, Button, styled, Box } from "@mui/material"
import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom";

const StyledForm = styled(Box)({
    background: "#fff",
    width: "50%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    margin: "4rem auto",
    padding: "4rem",
    borderRadius: "10px",

    '& > h1': {
        color: "#111",
        fontWeight: "400",

    }
})


const Signup = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState('');

    const submitRegistration = async (e) => {
        setError("")
        e.preventDefault()
        try {
            const response = await fetch('http://localhost:5000/api/users/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json()

            if (response.status === 201) {
                navigate("/login")
                return data
            } else {
                setError('Failed to register');
            }
        } catch (error) {
            setError('Failed to register');
        }
    }

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <>
            <StyledForm>
                <h1>Create an Account</h1>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form onSubmit={submitRegistration}>
                    <TextField
                        required
                        value={formData.username}
                        name="username"
                        onChange={handleInputChange}
                        autoComplete="off"
                        label="Your name"
                        variant="outlined"
                        fullWidth
                        color=""
                        margin="normal"
                        InputLabelProps={{
                            sx: {
                                color: "#111",
                                [`&.${inputLabelClasses.shrink}`]: {
                                    color: "#111",
                                    fontSize: "22px"
                                }
                            }
                        }}
                    />
                    <TextField
                        required
                        value={formData.email}
                        name="email"
                        onChange={handleInputChange}
                        autoComplete="off"
                        label="Email"
                        variant="outlined"
                        fullWidth
                        color=""
                        margin="normal"
                        InputLabelProps={{
                            sx: {
                                color: "#111",
                                [`&.${inputLabelClasses.shrink}`]: {
                                    color: "#111",
                                    fontSize: "22px"
                                }
                            }
                        }}
                    />
                    <TextField
                        required
                        value={formData.password}
                        name="password"
                        onChange={handleInputChange}
                        autoComplete="off"
                        label="Password"
                        variant="outlined"
                        fullWidth
                        color=""
                        margin="normal"
                        InputLabelProps={{
                            sx: {
                                color: "#111",
                                [`&.${inputLabelClasses.shrink}`]: {
                                    color: "#111",
                                    fontSize: "22px"
                                }
                            }
                        }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                    >
                        Sign Up
                    </Button>
                </form >
                <NavLink to="/login" style={{ marginTop: "20px" }}>Already have an account?</NavLink>
            </StyledForm>
        </>
    )
}

export default Signup