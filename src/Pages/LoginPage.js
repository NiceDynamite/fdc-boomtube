import LoginForm from "../Components/LoginForm";
import './LoginPage.css'

import Header from '../Components/header/HeaderMain.js';

export default function LoginPage() {
    return (
        <>
            <Header/>
            <div className="login">
                <img className="login-logo" alt="BoomTube Logo" src={logo} height="300px" width="275px" />
                <div className="login-container">
                    <div className="login-title">
                        <h1 className="welcome-title">Welcome Back</h1>
                        <p className="welcome-message">Sign back in to continue</p>

import Paper from "@mui/material/Paper";

export default function LoginPage() {
    return (
        <div className="login">
            <div className="login-container">
                <Paper
                    elevation={6}
                    sx={{
                        minWidth: '400px',
                        minHeight: '400px',
                        borderRadius: '10px'
                    }}
                >
                    <div className="login-title">
                        <h1 className="welcome-title">Welcome Back</h1>
                        <p className="welcome-message">Sign in to continue</p>

                    </div>
                    <div className="form-container">
                        <LoginForm />
                    </div>

                </div>

                </Paper>

            </div>
        </>
    )
}