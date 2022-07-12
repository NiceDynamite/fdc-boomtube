import { initializeApp } from 'firebase/app'
import "firebase/auth"
import { getAuth } from 'firebase/auth'


const firebaseConfig = {
    // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    // appId: process.env.REACT_APP_FIREBASE_APP_ID

    apiKey: "AIzaSyD-U3xhh1f0hDzu93Ek_NSEMkmF9Du-m2w",
    authDomain: "fdc-development-944d3.firebaseapp.com",
    projectId: "fdc-development-944d3",
    storageBucket: "fdc-development-944d3.appspot.com",
    messagingSenderId: "1043329357439",
    appId: "1:1043329357439:web:6890e272724bd8cae6114a"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export default app