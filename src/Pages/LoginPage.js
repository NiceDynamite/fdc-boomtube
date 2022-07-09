import LoginForm from "../Components/LoginForm";
import logo from "./boomtubelogo.png"
import './LoginPage.css'

export default function LoginPage() {
    return (
        <div className="login">
            <img className="login-logo" alt="BoomTube Logo" src={logo} height="300px" width="275px" />
            <div className="login-container">
                <div className="login-title">
                    <h1 className="welcome-title">Welcome Back</h1>
                    <p className="welcome-message">Sign back in to continue</p>
                </div>
                <div className="form-container">
                    <LoginForm />
                </div>
            </div>
        </div>
    )
}