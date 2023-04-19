import "./LoginForm.css";
import { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../../services/auth.service";

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const navigate = useNavigate();

    const onSuccess = (credentialResponse) => {
        setGoogleLoading(true);
        const token = credentialResponse.credential;
        const decoded = jwt_decode(token);
        const user = {
            email: decoded.email,
            username: decoded.email,
            password: decoded.sub,
        };

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
            }
        );
    }

      const onError = () => {
        setErrorMessage('Google login failed');
        setError(true);
        setLoading(false);
        setGoogleLoading(false);
      }

    const login = user => async event => {
        event.preventDefault();
        setLoading(true);
        // check if all fields are filled
        if (email === '' || password === '') {
            setErrorMessage('Please fill in all fields');
            setError(true);
            setLoading(false);
            return;
        }
        // check if email is valid
        if (!validateEmail(email)) {
            setErrorMessage('Please enter a valid email');
            setError(true);
            setLoading(false);
            return;
        }
        // login
        AuthService.login(user)
            .then((res) => {
                AuthService.setToken('id', res.data._id);
                navigate('/');
            })
            .catch((err) => {
                if (err.response.status === 400) {
                    setErrorMessage('Invalid email or password');
                    setError(true);
                    setLoading(false);
                }
                else {
                    setErrorMessage('Internal server error');
                    setError(true);
                    setLoading(false);
                }
            });
    }

    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }


  return (
    <div className="login-form-container">
      <form className="login-form" onSubmit={login({"email": email, "password": password})}>
        <p className="login-form-header">Welcome Back</p>
        <label className="email-label" htmlFor="email">Email</label>
        <input
          className="email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => {setEmail(e.target.value)
            setError(false)
          }}
        />
        <label className="password-label" htmlFor="password">Password</label>
        <input
          className="password"
          type="password"
          name="password"
          value={password}
          onChange={(e) => {setPassword(e.target.value)
            setError(false)
          }}
        />
        <p className="forgot-password" onClick={()=> navigate('/changePassword')}>Forgot password?</p>
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
            <div className="login-loading"></div>
        ) : (
            <input className="native-signin" type="submit" value="Login"/>
        )}
      </form>
      <p className="signup-link-container">Don't have an account? <a className="signup-link" onClick={()=> navigate('/signup')}>Signup</a></p>
      <hr className="login-break"/>
        <GoogleLogin onSuccess={onSuccess} onError={onError}/>
    </div>
  );
};

export default LoginForm;
