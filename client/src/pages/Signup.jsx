import Header from '../components/header/Header';
import SignupForm from '../components/forms/SignupForm';
import { AuthService } from '../services/auth.service';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Footer from "../components/footer/Footer";

const Signup = () => {
    const navigate = useNavigate();

    // if user is logged in, redirect to home page
    useEffect(() => {
        if (AuthService.isLoggedIn()) {
            navigate('/');
            console.log("redirected")
        } else {
            const headerJoinButton = document.getElementsByClassName('header-join-btn')[0];
            if (headerJoinButton) {
                headerJoinButton.innerHTML = 'Login';
                headerJoinButton.addEventListener('click', () => {
                    navigate('/login');
                });
            }
        }
    }, []);

    return (
        <div className="signup">
            <Header />
            <SignupForm  />
            <Footer/>
        </div>
    );
};

export default Signup;
