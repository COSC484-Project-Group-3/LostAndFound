import Header from "../components/header/Header";
import ProfileInfo from "../components/profile/ProfileInfo";
import { AuthService } from '../services/auth.service';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Profile = () => {
    const navigate = useNavigate();

    // if user is  logged in, redirect to home page
    useEffect(() => {
        if (!AuthService.isLoggedIn()) {
            navigate('/');
        }
    }, []);

    return (
        <div className="profile">
            <Header />
            <ProfileInfo /> 
        </div>
    );
};

export default Profile;
