import "./ProfileInfo.css";
import React from "react";
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { PostService } from '../../services/post.service';
import { useEffect, useState } from 'react';
import PostCard from '../posts/PostCard';

const ProfileInfo = () => {
    const [ profilePicture, setProfilePicture ] = useState('');
    const [ profileName, setProfileName ] = useState('');
    const [ userName, setUserName ] = useState('');
    const [ posts, setPosts] = useState('');
    const [ location, setLocation ] = useState('');
    //add user email
    //add how much posts the user has
    //add user posts

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
                
                //if (user.data.post.includes())
                const posts = await PostService.getPostsByUser(token);
                setPosts(posts.data);
                setLocation(user.data.location)
                setProfileName(user.data.fullName);
                setUserName(user.data.username);
            } catch (err) {
                console.log(err);
            }
        }
    };
  return <div className="profile-info-container">
    <div className="profile-info-header">
        <div className='profile-info-name'>
            <p >{profileName}</p>
            <p >{location}</p>
        </div>
    </div>
    <div className="profile-info-image">
        <div className='profile-img-container'>
                <img className='profile-img' src={profilePicture} referrerPolicy="no-referrer"/>
        </div>
    </div>
    <div className="lost-items-header">Lost Items</div>
    <div className="profile-info-posts">
            {posts && posts.map((post) => (
            <PostCard post={post} />
        ))} 
    </div>
  </div>;
}

export default ProfileInfo;
