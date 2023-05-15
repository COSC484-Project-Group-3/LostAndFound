import Header from '../components/header/Header';
import UpdatePostForm from '../components/forms/UpdatePostForm';
import { AuthService } from '../services/auth.service';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Footer from "../components/footer/Footer";

const UpdatePost = () => {
    const navigate = useNavigate();

    // if user is not logged in, redirect to home page
    useEffect(() => {
        if (!AuthService.isLoggedIn()) {
            navigate('/');
        }
    }, []);

    return (
        <div className="update-post">
            <Header />
            <UpdatePostForm  />
            <Footer/>
        </div>
    );
};

export default UpdatePost;
