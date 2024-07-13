import { TextField, Box, inputLabelClasses, Button, styled } from "@mui/material"
import { useState, useContext } from "react";
import { UserContext } from "../App";
import { NavLink, useNavigate } from "react-router-dom"

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

const Login = () => {
    const navigate = useNavigate()
    const { setAuthUser } = useContext(UserContext)
    const [formData, setFormData] = useState({
        email: "test@gmail.com",
        password: "test",
    });
    const [error, setError] = useState('');

    const submitLogin = async (e) => {
        setError("")
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/users/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (response.ok) {
                setAuthUser(data.username)
                navigate('/recipes')
            } else {
                throw new Error(data.error || 'Unknown server error');
            }
        } catch (error) {
            setError('Invalid email or password');
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    return (
        <>
            <StyledForm>
                <h1>Login to continue</h1>

                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form onSubmit={submitLogin}>
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
                        Login
                    </Button>
                </form>
                <NavLink to="/signup" style={{ marginTop: "20px" }}>Don't have an account?</NavLink>
            </StyledForm>
        </>
    )
}

export default Login