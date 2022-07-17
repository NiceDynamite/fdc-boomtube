import SignupForm from "../Components/SignupForm"
import { Paper } from '@mui/material'
import Header from "../Components/header/HeaderAutho"

export default function SignupPage() {
    return (
        <>
        <Header/>
        <div className="signup">
            
            <div className="signup-container">
                <Paper
                    elevation={6}
                    sx={{
                        minWidth: '400px',
                        minHeight: '400px',
                        borderRadius: '10px'
                    }}
                >
                    <div className="signup-title">
                        <h1 className="welcome-title">Welcome Friend!</h1>
                        <p className="welcome-message">Signup below to register</p>
                    </div>
                    <div className="form-container">
                        <SignupForm />
                    </div>
                </Paper>
            </div>
        </div>
        </>
    )
}

