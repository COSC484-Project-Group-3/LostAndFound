import Header from "../components/header/Header";
import LoginForm from "../components/forms/LoginForm";
import { AuthService } from '../services/auth.service';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Login = () => {
    const navigate = useNavigate();
    // if user is logged in, redirect to home page
    useEffect(() => {
        if (AuthService.isLoggedIn()) {
            navigate('/');
        }
    }, []);

    return (
        <div className="login">
            <Header />
            <LoginForm />
        </div>
    );
};

export default Login;
