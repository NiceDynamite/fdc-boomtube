import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, InputAdornment, createTheme, ThemeProvider, Alert } from "@mui/material";
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

    const nav = useNavigate()

    const [user, setUser] = useState({
        username: '',
        password: ''
    })

    const [status, setStatus] = useState({
        error: false,
        msg: '',
        loggedIn: false,
    })

    const handleFieldChange = (e) => {
        e.preventDefault()
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        axios.post('http://localhost:5001/login', { username: user.username, password: user.password })
            .then((response) => {
                setStatus({
                    ...status,
                    error: false,
                    msg: response.data.msg,
                    loggedIn: true
                })

                setUser({
                    ...user,
                    username: '',
                    password: ''
                })

                axios.post('http://localhost:5001/users', {
                    user_id: response.data.id
                },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'authorization': ` Bearer ${response.data.token}`
                        },

                    }).then((response) => {
                        console.log(response)
                    })

                setTimeout(() => {
                    nav('/')
                }, 2000)

                localStorage.setItem("token", `Bearer ${response.data.token}`)
            }
            ).catch((error) => {
                setStatus({
                    ...status,
                    error: true,
                    msg: error.response.data.msg,
                    loggedIn: false
                })
            })
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
                    {status.loggedIn &&
                        <Alert
                            severity='success'
                            variant='outlined'
                            sx={{
                                width: 'fit-content'
                            }}
                        >
                            {status.msg}
                        </Alert>}
                    {status.error &&
                        <Alert
                            variant="outlined"
                            severity="error"
                            sx={{
                                width: 'fit-content'
                            }}
                        >
                            {status.msg}
                        </Alert>}
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
                        value={user.username}
                        onChange={handleFieldChange}
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
                        value={user.password}
                        onChange={handleFieldChange}
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