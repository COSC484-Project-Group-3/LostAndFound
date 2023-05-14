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
        const token = AuthService.getToken("id")
        if (token) {
            try {
                const user = await AuthService.getUser(token);
                setUser(user.data);
            } catch (err) {
                console.log(err);
            }
        }
    };
    const handleUpdateProfile = (e) => {
      e.preventDefault();
    }
  return (
    <div>       
          <h1>Settings</h1>
          <h2> update your profile </h2>
          <form onSubmit={handleUpdateProfile}>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" defaultValue={user.username} />
            <br />
            <label htmlFor="profilename">Profilename</label>
            <input type="text" id="profilename" name="profilename" defaultValue={user.profilename} />
            <br />
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" defaultValue={user.email} />
            <br />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" defaultValue={user.password} />
            <br />
            <input type="submit" value="Save" />
          </form>
    </div>
  )
};

export default SettingsForm;
