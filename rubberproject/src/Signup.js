import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';


export default function Signup() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    geolocation: ""
  });

  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if password and confirm password match
    if (credentials.password !== credentials.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/createuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.geolocation
      })
    });

    const json = await response.json();
    console.log(json);

    if (json.success) {
      localStorage.setItem('token', json.authToken);
      navigate("/login");
    } else {
      alert("Enter Valid Credentials");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div 
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1528323273322-d81458248d40?q=80&w=1529&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
        height: '100vh',
        backgroundSize: 'cover',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div className='container'>
  <form className='w-50 m-auto mt-5 border bg-dark border-success rounded' onSubmit={handleSubmit}>
    <div className="m-3">
      <label htmlFor="name" className="form-label text-white">Name</label>
      <input 
        type="text" 
        className="form-control" 
        name='name' 
        value={credentials.name} 
        onChange={onChange} 
        required // Make this field mandatory
      />
    </div>
    <div className="m-3">
      <label htmlFor="email" className="form-label text-white">Email address</label>
      <input 
        type="email" 
        className="form-control" 
        name='email' 
        value={credentials.email} 
        onChange={onChange} 
        required // Make this field mandatory
      />
    </div>
    <div className="m-3">
      <label htmlFor="geolocation" className="form-label text-white">Location (optional)</label>
      <input 
        type="text" 
        className="form-control" 
        name='geolocation' 
        value={credentials.geolocation} 
        onChange={onChange} 
      />
    </div>
    
    {/* Password Field */}
    <div className="m-3">
      <label htmlFor="password" className="form-label text-white">Password</label>
      <div className="input-group">
        <input 
          type={showPassword ? "text" : "password"} 
          className="form-control" 
          name="password" 
          value={credentials.password} 
          onChange={onChange} 
          required // Make this field mandatory
        />
        <button 
          type="button" 
          className="btn btn-outline-secondary" 
          onClick={togglePasswordVisibility}
        >
          {showPassword ? "🙉" : "🙈"} {/* Monkey emojis for toggling */}
        </button>
      </div>
    </div>

    {/* Confirm Password Field */}
    <div className="m-3">
      <label htmlFor="confirmPassword" className="form-label text-white">Confirm Password</label>
      <div className="input-group">
        <input 
          type={showPassword ? "text" : "password"} 
          className="form-control" 
          name="confirmPassword" 
          value={credentials.confirmPassword} 
          onChange={onChange} 
          required // Make this field mandatory
        />
        <button 
          type="button" 
          className="btn btn-outline-secondary" 
          onClick={togglePasswordVisibility}
        >
          {showPassword ? "🙉" : "🙈"} {/* Monkey emojis for toggling */}
        </button>
      </div>
    </div>

    <button type="submit" className="m-3 btn btn-success">Submit</button>
    <Link to="/login" className="m-3 mx-1 btn btn-danger">Already a user</Link>
  </form>
</div>
      
    </div>
  );
}
