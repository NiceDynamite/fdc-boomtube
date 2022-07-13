import React, { useState } from "react";
import { TextField, Button, Box, InputAdornment, createTheme, ThemeProvider } from "@mui/material";
import { Key, Login, AccountCircle } from '@mui/icons-material'
import { Link } from 'react-router-dom'


const theme = createTheme({
    palette: {
        primary: {
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
        <>
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
                    sx={{
                        width: '300px'
                    }}
                    autoComplete="off"
                    value={username}
                    onChange={handleUsernameChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <AccountCircle />
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
                    sx={{
                        width: '300px'
                    }}
                    value={password}
                    onChange={handlePasswordChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Key />
                            </InputAdornment>
                        )
                    }}
                />
                <Button
                    id="login-button"
                    variant="contained"
                    type="submit"
                    startIcon={<Login />}
                    sx={{
                        width: '300px'
                    }}
                >
                    Login
                </Button>
                <Link
                    to="/signup"
                    style={{ textDecoration: 'none' }}>
                    <Button
                        variant="text"
                    >
                        Create an Account
                    </Button>
                </Link>
            </ThemeProvider>
        </Box>
        </>
    )
}