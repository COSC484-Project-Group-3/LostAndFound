import "./ProfileInfo.css";
import React from "react";
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { useEffect, useState } from 'react';

const ProfileInfo = () => {
    const [ profilePicture, setProfilePicture ] = useState('');
    const [ profileName, setProfileName ] = useState('');
    const [ userName, setUserName ] = useState('');

    useEffect(() => {
        getProfile();
    }, []);

    const getProfile = async () => {
        const token = AuthService.getToken("id");
        if (token) {
            try {
                const user = await AuthService.getUser(token);
                if (user.data.profilePicture.includes('<svg')) {
                    const svg = UserService.getProfilePicture(user.data.profilePicture)
                    setProfilePicture(svg);
                } else {
                    setProfilePicture(user.data.profilePicture);
                }
                setProfileName(user.data.fullName);
                setUserName(user.data.username);
            } catch (err) {
                console.log(err);
            }
        }
    };
  return <div className="profile-info-container">
    <div className="profile-info-header">
        <div className='profile-img-container'>
            <img className='profile-img' src={profilePicture} referrerPolicy="no-referrer"/>
        </div>
        <div className='profile-info-name'>
            <p >{profileName}</p>
        </div>
        <div className='profile-info-username'>
            <p >{userName}</p>
        </div>
    </div>
    <div className="profile-info-body">
    </div>
  </div>;
}

export default ProfileInfo;
