
import './SignupForm.css';
import { useState } from 'react';
import { AuthService } from '../../services/auth.service';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";

const SignupForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);

    const onGoogleLoginSuccess = (credentialResponse) => {
        setGoogleLoading(true);
        const token = credentialResponse.credential;
        const decoded = jwt_decode(token);
        const user = {
            email: decoded.email,
            fullName: decoded.name,
            username: decoded.email,
            password: decoded.sub,
            profilePicture: decoded.picture,
        };

        AuthService.signup(user)
            .then((res) => {
                AuthService.setToken('id', res.data._id);
                navigate('/');
            })
            .catch((err) => {
                if (err.response.status === 400) {
                    AuthService.login(user)
                        .then((res) => {
                            AuthService.setToken('id', res.data._id);
                            navigate('/');
                        })
                        .catch((err) => {
                            setErrorMessage('Internal server error');
                            setError(true);
                            setLoading(false);
                            setGoogleLoading(false);
                        });
                }
                else {
                    setErrorMessage('Internal server error');
                    setError(true);
                    setLoading(false);
                    setGoogleLoading(false);
                }
            });


    }

    const onGoogleLoginError = () => {
    setErrorMessage('Google login failed');
    setError(true);
    setLoading(false);
    setGoogleLoading(false);
    }

    const signup = user => async event => {
        event.preventDefault();
        try {
            setLoading(true);
            if (!user.email || !user.fullName || !user.username || !user.password) {
                setErrorMessage('Please fill in all fields');
                setError(true);
                setLoading(false);
                return;
            }
            if (user.password.length < 6) {
                setErrorMessage('Password must be at least 6 characters');
                setError(true);
                setLoading(false);
                return;
            }
            if (user.username.length < 4) {
                setErrorMessage('Username must be at least 4 characters');
                setError(true);
                setLoading(false);
                return;
            }
            const res = await AuthService.signup(user);
            if (res.status === 201) {
                AuthService.setToken('id', res.data._id);
                navigate('/');
            } else if (res.status === 400) {
                setErrorMessage('Internal server error');
                setError(true);
                setLoading(false);
            }
        } catch (err) {
            if (err.response.status === 400) {
                setErrorMessage('Email or username already exists');
                setError(true);
                setLoading(false);
            }
        }
    };

    return (
        <div className="signup-form-container">
            <form className="signup-form" onSubmit={signup({"email": email, "fullName": name, "username": username, "password": password})}>
                <p className='signup-form-header'>Create Your Account</p>
                <label className="email-label" htmlFor="email">Email</label>
                <input
                    className="email"
                    type="email"
                    value={email}
                    onChange={(e) => {setEmail(e.target.value)
                        setError(false)
                    }}
                />
                <label className="name-label" htmlFor="name">Name</label>
                <input
                    className="name"
                    type="text"
                    value={name}
                    onChange={(e) => {setName(e.target.value)
                        setError(false)
                    }}
                />
                <label className="username-label" htmlFor="username">Username</label>
                <input
                    className="username"
                    type="text"
                    value={username}
                    onChange={(e) => {setUsername(e.target.value)
                        setError(false)
                    }}
                />
                <label className="password-label" htmlFor="password">Password</label>
                <input
                    className="password"
                    type="password"
                    value={password}
                    onChange={(e) => {setPassword(e.target.value)
                        setError(false)
                    }}
                />
                <div className="error-container">
                    <p
                    className="error"
                    style={{ display: error ? "block" : "none", 
                                color: "#fd6565", 
                                border: "1px solid  #fd6565",
                                borderRadius: "4px",
                            }}
                    >
                        {errorMessage}
                    </p>
                </div>
                {loading || googleLoading ? (
                    <div className="signup-loading"></div>
                ) : (
                <input className='native-signup' type="submit" value="Sign up" />
                )}
            </form>
            <p className="login-link-container">Already have an account? <a className="login-link" onClick={()=> navigate('/login')}>Login</a></p>
            <hr className="signup-break"/>
            <GoogleLogin onSuccess={onGoogleLoginSuccess} onError={onGoogleLoginError}/>
        </div>
    );
}

export default SignupForm;