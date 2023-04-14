import './SettingsForm.css';
import React from "react";
import { AuthService } from "../../services/auth.service";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SettingsForm = () => {
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        checkUserIsLoggedIn();
    }, []);

    const checkUserIsLoggedIn = () => {
        const token = AuthService.isLoggedIn("id");
        if (!token) {
            navigate('/login');
        }
        getUserInfo();
    }

    const getUserInfo = async () => {
        const token = AuthService.isLoggedIn("id");
        if (token) {
            try {
                const user = await AuthService.getUser(token);
                setUser(user.data);
            } catch (err) {
                console.log(err);
            }
        }
    };

  return (
    <div className="settings-form">
        <h1>Settings</h1>
    </div>
  )
};

export default SettingsForm;
