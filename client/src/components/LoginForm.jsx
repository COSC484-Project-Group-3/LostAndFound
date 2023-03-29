import "./LoginForm.css";
import "../services/auth.service"

import { useState } from 'react';
import { AuthService } from "../services/auth.service";
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const checkValidUser = (e) => {
      e.preventDefault();
      const user = {
        "email": email,
        "password": password
      }
      AuthService.login(user).then((res, err) => {
        if (err) {
          console.log(err)
        }
        else if (res.status === 200) {
          AuthService.setToken('id', res.data._id)
          navigate('/');
        }
      })
    }
    const onSuccess = (credentialResponse) => {
        const token = credentialResponse.credential;
        const decoded = jwt_decode(token);
        console.log(decoded)

      }

    const onError = () => {
        console.log("error")
    }


  return (
    <div className="login-form-container">
      <form className="login-form" method="POST" onSubmit={checkValidUser}>
        <h2 className="login-form-header">Welcome back</h2>
        <label className="email-label" htmlFor="email">Email</label>
        <input
          className="email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="password-label" htmlFor="password">Password</label>
        <input
          className="password"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input className="native-signin" type="submit" value="Login"/>
      </form>
      <p className="signup-link-container">Don't have an account? <a href="https://lostandfound-aani.onrender.com/signup" className="signup-link">Signup</a></p>
      <hr className="login-break"/>
        <GoogleLogin onSuccess={onSuccess} onError={onError}/>
    </div>
  );
};

export default LoginForm;
