import { useState } from 'react';
import { Box, TextField, Button, InputAdornment, ThemeProvider, createTheme } from '@mui/material'
import { Email, Key, ArrowForward, AccountCircle } from '@mui/icons-material'
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';


export default function SignupForm() {

    let theme = createTheme({
        palette: {
            primary: {
                main: '#FF6600'
            }
        }
    })

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { signup } = useAuth()

    const handleUsernameChange = (e) => {
        e.preventDefault()
        setUsername(e.target.value)
    }

    const handleEmailChange = (e) => {
        e.preventDefault()
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        e.preventDefault()
        setPassword(e.target.value)
    }

    let people = []

    const handleSubmit = (e) => {
        e.preventDefault()

        signup(email, password)

        let user = {
            username,
            email,
            password
        }

        setUsername('')
        setEmail('')
        setPassword('')

        people.push(user)

    }


    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            autoComplete="off"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '20px',
            }}
        >
            <ThemeProvider theme={theme}>
                <TextField
                    id="signup-username"
                    type="text"
                    autoComplete='off'
                    label="Username"
                    variant='standard'
                    value={username}
                    onChange={handleUsernameChange}
                    sx={{
                        width: '300px'
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>
                                <AccountCircle />
                            </InputAdornment>
                        )
                    }}
                />
                <TextField
                    id="signup-email"
                    type="email"
                    label="Email"
                    variant='standard'
                    value={email}
                    onChange={handleEmailChange}
                    sx={{
                        width: '300px'
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>
                                <Email />
                            </InputAdornment>
                        )
                    }}
                />
                <TextField
                    id="signup-password"
                    type="password"
                    label="Password"
                    autoComplete='new-password'
                    variant='standard'
                    value={password}
                    onChange={handlePasswordChange}
                    sx={{
                        width: '300px'
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>
                                <Key />
                            </InputAdornment>
                        )
                    }}
                />
                <Button
                    id='signup-button'
                    variant='contained'
                    type='submit'
                    color="primary"
                    sx={{
                        width: '300px'
                    }}
                    endIcon={<ArrowForward />}
                >
                    register
                </Button>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                    <h4>Already have an account?</h4>
                    <Link
                        to="/login"
                        style={{ textDecoration: 'none' }}
                    >
                        <Button
                            variant='text'
                            sx={{
                                transform: 'translateY(-1px)'
                            }}
                        >
                            Login
                        </Button>
                    </Link>
                </Box>
            </ThemeProvider>
        </Box>
    )
}