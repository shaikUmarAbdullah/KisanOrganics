import React, { useState, useEffect } from 'react';
import './Profile.css';
import axios from "axios";
import avatar from '../Assets/Avatars/download.png';
import { useParams, Link } from 'react-router-dom';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('personal'); // State to track active tab
  const { userId } = useParams();
  const [userDetails, setUserDetails] = useState(null);
  const [user, setUser] = useState({
    username: '',
    email: '',
    name: '',
    address: '',
    phone: ''
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/user/${userId}`);
        setUserDetails(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [userId]);

  if (!userDetails) {
    return <div>Loading...</div>;
  }

  const handleChange = e => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:4000/user/${userId}`, user);
      alert('Profile updated successfully');
      window.location.replace(`/profile/${userId}`);
    } catch (err) {
      console.error(err);
      alert('Error updating profile');
    }
  };


  const handleTabChange = (tab) => {
    setActiveTab(tab); // Update active tab when clicked
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src={avatar} alt="Avatar" className="avatar" />
        <h1 className="username">{userDetails.username}</h1>
        <p className="email">{userDetails.email}</p>
      </div>
      <div className="profile-menu">
        {/* Menu with clickable tabs */}
        <button
          className={`menu-item ${activeTab === 'personal' ? 'active' : ''}`}
          onClick={() => handleTabChange('personal')}
        >
          Personal Information
        </button>
        <button
          className={`menu-item ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => handleTabChange('settings')}
        >
          Settings
        </button>
        <button
          className={`menu-item ${activeTab === 'editProfile' ? 'active' : ''}`}
          onClick={() => handleTabChange('editProfile')}
        >
          Edit Profile
        </button>
        <Link to="/cart"><button
          className={`menu-item ${activeTab === 'cart' ? 'active' : ''}`}
          onClick={() => handleTabChange('cart')}
        >
          Cart
        </button>
        </Link>
      </div>
      <div className="profile-content">
        {/* Content based on active tab */}
        {activeTab === 'personal' && (
          <div className="info-section">
            <h2>Personal Information</h2>
            <h6>Name : {userDetails.name}</h6>
            <h6>Phone : {userDetails.phone}</h6>
            <h6>Address : {userDetails.address}</h6>
          </div>
        )}
        {activeTab === 'settings' && (
          <div className="info-section">
            <h2>Settings</h2>
            {/* Display settings options */}
          </div>
        )}
        {activeTab === 'editProfile' && (
          <div className="info-section">
            <div className="edit-profile-container">
              <h2>Edit Profile</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Username</label>
                  <input
                    type="text"
                    name="username"
                    value={user.username}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Address</label>
                  <input
                    type="text"
                    name="address"
                    value={user.address}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={user.phone}
                    onChange={handleChange}
                  />
                </div>
                <button className='edit-submit' type="submit">Save Changes</button>
              </form>
            </div>
          </div>
        )}
        {activeTab === 'cart' && (
          <div className="info-section">
            <h2>Cart</h2>
            {/* Display cart items */}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
