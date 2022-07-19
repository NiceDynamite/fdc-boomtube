import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { Box, TextField, Button, InputAdornment, ThemeProvider, createTheme, Alert } from '@mui/material'
import { Email, Key, ArrowForward, AccountCircle } from '@mui/icons-material'
import { Link } from 'react-router-dom';


export default function SignupForm(props) {

    const nav = useNavigate()

    let theme = createTheme({
        palette: {
            primary: {
                main: '#FF6600'
            }
        }
    })

    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
    })

    const [status, setStatus] = useState({
        error: false,
        msg: '',
        registered: false,
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

        axios.post("http://localhost:5001/register", { username: user.username, email: user.email, password: user.password })
            .then((response) => {

                setStatus({
                    ...status,
                    error: false,
                    msg: response.data.msg,
                    registered: true
                })

                setUser({
                    ...user,
                    username: '',
                    email: '',
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
                        localStorage.setItem("userData", JSON.stringify(response.data))
                    })
                    .then(nav('/home'))
                    .then((response) => {
                        localStorage.setItem("userData", JSON.stringify(response.data));
                        props.setUserData(response.data)
                    })
                    .then(setTimeout(2000))


                localStorage.setItem("token", `Bearer ${response.data.token}`)

            }).catch((error) => {
                console.log(error)
                setStatus({
                    ...status,
                    error: true,
                    msg: error.response.data.msg || error.response.data.errors[0].msg,
                    registered: false
                })

            })
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
                {status.registered &&
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
                        severity='error'
                        variant='outlined'
                        sx={{
                            width: 'fit-content'
                        }}
                    >{status.msg}</Alert>}
                <TextField
                    id="signup-username"
                    type="text"
                    autoComplete='off'
                    label="Username"
                    variant='standard'
                    name="username"
                    value={user.username}
                    onChange={handleFieldChange}
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
                    name="email"
                    value={user.email}
                    onChange={handleFieldChange}
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
                    name="password"
                    value={user.password}
                    onChange={handleFieldChange}
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