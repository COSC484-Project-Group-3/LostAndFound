import "./ProfileForm.css";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";


const ProfileForm = () => {
   // get the profile picture from the user using the api
    // get the name from the user
    // get the username from the user
    // get the email from the user

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [profilePicture, setProfilePicture] = useState('');

    useEffect(() => {
        async function fetchData() {
            const res = await fetch('http://localhost:5000/api/users/profile');
                // method: 'GET',
                // headers: {
                //     'Content-Type': 'application/json', 
                // }
            const data = await res.json();
            setName(data.name);
        }
        fetchData();

    }, []);
    
    // call api to get the user's profile
    // if success,  
    // if error, show error message
    return (
        <div className="profile-form-container">


        </div>

    )
    
};