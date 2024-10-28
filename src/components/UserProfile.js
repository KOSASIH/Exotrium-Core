// src/components/UserProfile.js

import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth'; // Custom hook for authentication
import './User Profile.css'; // Import CSS for styling

const UserProfile = () => {
    const { user, updateUser , changePassword } = useAuth(); // Get user info and update functions from context
    const [formData, setFormData] = useState({
        name: user.name || '',
        email: user.email || '',
        profilePicture: user.profilePicture || '',
    });
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name,
                email: user.email,
                profilePicture: user.profilePicture,
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        try {
            await updateUser (formData);
            setMessage('Profile updated successfully!');
            setError('');
        } catch (err) {
            setError('Failed to update profile. Please try again.');
            setMessage('');
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        try {
            await changePassword(password);
            setMessage('Password changed successfully!');
            setError('');
            setPassword('');
        } catch (err) {
            setError('Failed to change password. Please try again.');
            setMessage('');
        }
    };

    return (
        <div className="user-profile">
            <h2>User Profile</h2>
            <form onSubmit={handleProfileUpdate} className="profile-form">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="profilePicture">Profile Picture URL</label>
                    <input
                        type="text"
                        id="profilePicture"
                        name="profilePicture"
                        value={formData.profilePicture}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Update Profile</button>
            </form>

            <form onSubmit={handlePasswordChange} className="password-form">
                <h3>Change Password</h3>
                <div className="form-group">
                    <label htmlFor="password">New Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Change Password</button>
            </form>

            {message && <p className="success-message">{message}</p>}
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default UserProfile;
