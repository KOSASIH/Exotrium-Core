// src/components/Header.js

import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; // Custom hook for authentication
import './Header.css'; // Import CSS for styling

const Header = () => {
    const { user, logout } = useAuth(); // Get user info and logout function from context
    const history = useHistory();

    const handleLogout = () => {
        logout();
        history.push('/login'); // Redirect to login page after logout
    };

    return (
        <header className="header">
            <div className="container">
                <div className="logo">
                    <Link to="/">Marketplace</Link>
                </div>
                <nav className="nav">
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/products">Products</Link>
                        </li>
                        <li>
                            <Link to="/transactions">Transactions</Link>
                        </li>
                        {user ? (
                            <>
                                <li>
                                    <Link to="/profile">Profile</Link>
                                </li>
                                <li>
                                    <button onClick={handleLogout} className="logout-button">Logout</button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to="/login">Login</Link>
                                </li>
                                <li>
                                    <Link to="/register">Register</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
