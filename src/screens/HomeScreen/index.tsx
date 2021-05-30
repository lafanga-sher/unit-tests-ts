import React from 'react';
import { Link } from 'react-router-dom';

import './styles.scss';

const HomeScreen: React.FC = () => {
  return (
    <div className="home-screen">
      <h1>Home</h1>
      <Link to="/login" className="btn text-link">
        Logout
      </Link>
    </div>
  );
};

export default HomeScreen;
