import React, { useState, useContext } from 'react';
import './Signin.css';
import { ShopContext } from '../Context/ShopContext';

const Signin = () => {
  const [state, setState] = useState("Sign Up");
  const { setUserIdAndUpdateCart } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    name: "",
    phone: ""
  });
  const [error, setError] = useState(null);
  const [isChecked, setIsChecked] = useState(false);

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const login = async () => {
    if (!validateEmail(formData.email)) {
      setError("Invalid email format");
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: formData.email, password: formData.password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.errors);
        return;
      }

      const responseData = await response.json();

      if (responseData && responseData.success) {
        localStorage.setItem('auth-token', responseData.token);
        const userId = responseData.userId;
        setUserIdAndUpdateCart(userId);
        localStorage.setItem('userid', userId);
        console.log(userId + " logged in!");
        window.location.replace('/');
      } else {
        setError(responseData.errors);
      }
    } catch (error) {
      console.error('An error occurred during login:', error);
      setError('Internal server error');
    }
  };

  const signup = async () => {
    if (!validateEmail(formData.email)) {
      setError("Invalid email format");
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/signup', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.errors);
        return;
      }

      const responseData = await response.json();

      if (responseData && responseData.success) {
        localStorage.setItem('auth-token', responseData.token);
        const userId = responseData.userId;
        setUserIdAndUpdateCart(userId);
        localStorage.setItem('userid', userId);
        console.log(`Logged in successfully! User ID is ${userId}`);
        window.location.replace('/');
      } else {
        setError(responseData.errors);
      }
    } catch (error) {
      console.error('An error occurred during signup:', error);
      setError('Internal server error');
    }
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  return (
    <div className='signin'>
      <div className="signin-container">
        <h1>{state}</h1>
        <div className="signin-fields">
          {state === "Sign Up" && <input name='name' value={formData.name} onChange={changeHandler} type='text' placeholder='Your Name' />}
          {state === "Sign Up" && <input name='username' value={formData.username} onChange={changeHandler} type='text' placeholder='Username' />}
          <input name='email' value={formData.email} onChange={changeHandler} type='email' placeholder='Email Address' />
          <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder='Password' />
          {state === "Sign Up" && <input name='phone' value={formData.phone} onChange={changeHandler} type='text' placeholder='Phone Number' />}
        </div>
        <button onClick={() => { state === "Log In" ? login() : signup() }} disabled={state === "Sign Up" && !isChecked}>Continue</button>
        {error && <p className="error-message">{error}</p>}
        {state === "Sign Up" && (
          <div className="signin-agree">
            <input type='checkbox' checked={isChecked} onChange={handleCheckboxChange} />
            <p>By continuing, I agree to terms of use & privacy policies</p>
          </div>
        )}
        <p className='signin-in'>
          {state === "Sign Up" ? 'Already have an account?' : 'Create an account?'}
          <span onClick={() => setState(state === "Sign Up" ? "Log In" : "Sign Up")}>
            {state === "Sign Up" ? 'Login here' : 'Click here'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signin;
