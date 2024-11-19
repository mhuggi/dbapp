// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/all-users">All Users</Link>
          </li>
          <li>
            <Link to="/add-user">Add User</Link>
          </li>
          <li>
            <Link to="/delete-user">Delete User</Link>
          </li>
          <li>
            <Link to="/modify-user">Modify User</Link>
          </li>


        </ul>
      </nav>
    </header>
  );
};

export default Header;
