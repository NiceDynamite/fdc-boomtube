import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login'
import KeyIcon from '@mui/icons-material/Key';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom'
import { InputAdornment } from "@mui/material";

const theme = createTheme({
    palette: {
        neutral: {
            main: '#FF6600'
        }
    }
})

export default function LoginForm() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleUsernameChange = (e) => {
        e.preventDefault()
        setUsername(e.target.value);
    }

    const handlePasswordChange = (e) => {
        e.preventDefault()
        setPassword(e.target.value);
    }

    let person = []

    const handleSubmit = (e) => {
        e.preventDefault()

        let obj = {
            username,
            password
        }

        setPassword('')
        setUsername('')

        person.push(obj)

    }

    return (
        <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '20px'
            }}>
            <ThemeProvider theme={theme}>
                <TextField
                    id="username-input"
                    label="Username"
                    variant="standard"
                    name="username"
                    type="text"
                    color="neutral"
                    sx={{
                        width: '300px'
                    }}
                    autoComplete="off"
                    value={username}
                    onChange={handleUsernameChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AccountCircleIcon />
                            </InputAdornment>
                        )
                    }}
                />
                <TextField
                    id="password-input"
                    label="Password"
                    variant="standard"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    color="neutral"
                    sx={{
                        width: '300px'
                    }}
                    value={password}
                    onChange={handlePasswordChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <KeyIcon />
                            </InputAdornment>
                        )
                    }}
                />
                <Button
                    id="login-button"
                    variant="contained"
                    type="submit"
                    color="neutral">
                    <LoginIcon />
                    Login
                </Button>
                <Link
                    to="/signup"
                    style={{ textDecoration: 'none' }}>
                    <Button
                        variant="text"
                        color="neutral">
                        Create an Account
                    </Button>
                </Link>
            </ThemeProvider>
        </Box>
    )
}