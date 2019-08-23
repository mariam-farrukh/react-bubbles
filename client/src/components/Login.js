import React, { useState } from "react";
import {withRouter} from 'react-router-dom'
import axios from 'axios';

const Login = props => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [name, setName] = useState({
    username: '',
    password: ''
  });

  const handleChange = event => {
    event.preventDefault();
    setName({ ...name, [event.target.name]: event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();
  };

  const login = e => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/api/login', name)
      .then(res => {
        localStorage.setItem('token', res.data.payload);
        props.history.push('/colors');
      })
      .catch(err => console.log(err.response));
        props.history.push('/colors');
  };

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <div className="login">
        <form
          className="login-form"
          onSubmit={event => handleSubmit(event)}
          tabIndex="0"
        >
          <h1 className="loginTitle">Welcome Back</h1>
          <p className="loginInputs">
            <label>
              Username:
              <input
                className="input"
                type="text"
                name="username"
                onChange={handleChange}
                value={name.username}
              />
            </label>
          </p>

          <p className="loginInputs">
            <label>
              Password:
              <input
                className="input"
                type="password"
                name="password"
                onChange={handleChange}
                value={name.password}
              />
            </label>
          </p>

          <button className="login-button" onClick={login}>Login</button>
        </form>
      </div>
    </>
  );
};

export default withRouter(Login);
