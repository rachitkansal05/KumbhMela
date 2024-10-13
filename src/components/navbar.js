import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../UserContext';

export default function Navbar() {
  const { user } = useUser(); 
  console.log(user); 

  return (
    <nav className="navbar" id="nav">
      <ul>
        <div className="logo">
          <Link to="/">TPW</Link>
        </div>
        <div className="nav-items">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/lost-found">Lost And Found</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </div>
        <div className="sign-up">
          <i className="fa-solid fa-user"></i>
          {user ? <span>{user.name}</span> : <Link to="/signup">Sign-up</Link>}
        </div>
      </ul>
    </nav>
  );
}
