import './Header.css';
import { AuthService } from '../../services/auth.service';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserService } from '../../services/user.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
    const [ profilePicture, setProfilePicture ] = useState('');
    const [ profileName, setProfileName ] = useState('');
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getProfile();
    }, []);

    const handleHeaderProfileClick = () => {
        const dropdownContent = document.getElementsByClassName('dropdown-content')[0];
        if (dropdownContent) {
            if (dropdownContent.style.display === 'block') {
                dropdownContent.style.display = 'none';
            } else {
                dropdownContent.style.display = 'block';
            }
        }
    }

    /**
     * Get the profile of the user
     */
    const getProfile = async () => {
        const token = AuthService.getToken("id");
        if (token) {
            try {
                const user = await AuthService.getUser(token);
                // check if the user.data.profilePicture is a svg or a url
                if (user.data.profilePicture.includes('<svg')) {
                    const svg = UserService.getProfilePicture(user.data.profilePicture)
                    setProfilePicture(svg);
                } else {
                    setProfilePicture(user.data.profilePicture);
                }
                setProfileName(user.data.fullName);
                setIsLoggedIn(true);
            } catch (err) {
                console.log(err);
            }
        }
    };

    /**
     * Logout the user
     * @param {*} e
     */
    const logout = async (e) => {
        e.preventDefault();
        try {
            AuthService.removeToken("id");
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="header-container">
            <div className="header">
                <div className="header-logo" onClick={()=> {navigate('/'); window.location.reload()}}>
                    <img className="header-logo-img" src="./assets/logo.png" alt="Logo" />
                </div>
                <div className="header-title">
                    <p onClick={()=> {navigate('/');}}>Lost And Found</p>
                </div>
                {isLoggedIn ? (
                <div className='header-profile' onClick={handleHeaderProfileClick}>
                    <img className='header-profile-img' src={profilePicture} referrerPolicy="no-referrer" />
                    <div className="dropdown-content">
                            <a onClick={()=> {navigate('/');}}>
                                <FontAwesomeIcon icon={faHouse} style={{color: "#444655",}} />
                                <span style={{marginLeft: '10px'}}>Home</span>
                            </a>
                            <a onClick={()=> {navigate('/profile');}}>
                                <FontAwesomeIcon icon={faUser} style={{color: "#444655",}} />
                                <span style={{marginLeft: '10px'}}>Profile</span>
                            </a>
                            <a onClick={()=> {navigate('/post');}}>
                                <FontAwesomeIcon icon={faPlus} style={{color: "#444655",}} />
                                <span style={{marginLeft: '10px'}}>Create Post</span>
                            </a>
                            <a onClick={()=> {navigate('/settings');}}>
                                <FontAwesomeIcon icon={faGear} style={{color: "#444655",}} />
                                <span style={{marginLeft: '10px'}}>Settings</span>
                            </a>
                            <a onClick={logout}>
                            <FontAwesomeIcon icon={faArrowRightFromBracket} style={{color: "#444655",}} />
                            <span style={{marginLeft: '10px'}}>Logout</span>
                            </a>
                    </div>
                </div>
                ) : (
                    <div className='header-join'>
                        <button className='header-join-btn' onClick={()=> navigate('/signup')}>Join</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;
