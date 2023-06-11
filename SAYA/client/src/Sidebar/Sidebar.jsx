import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css';
import saya from '../assets/saya.png';
import { useContext } from 'react';
import { AuthContext } from '../AuthContext';

const Sidebar = () => {
  const { setIsAuthenticated, setUserId } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserId(null);
    navigate.push('/');
  };

  return (
    <div className="sidebar">
      <img src={saya} alt="saya" className="saya" />
      <ul className="nav">
        <li className="sideBarListItem">
          <Link to="/Dashboard">Overview</Link>
        </li>
        <li className="sideBarListItem">
          <Link to="/Tenants">Tenants</Link>
        </li>
        <li className="sideBarListItem">
          <Link to="/Billing">Billing</Link>
        </li>
        <li className="sideBarListItem">
          <Link to="/Analytics">Analytics</Link>
        </li>
        <li className="sideBarListItem">
          <Link to="/Hardware">Hardware</Link>
        </li>
        <li className="sideBarListItem">
          <Link to="/Notifications">Notifications</Link>
        </li>
      </ul>
      <hr className="solid"></hr>
      <ul className='nav2'>
        <li className="sideBarListItem">
          <Link to="/Settings">Settings</Link>
        </li>
        <li className="sideBarListItem">
          <Link to="/" onClick={handleLogout}>Logout</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
