// src/components/AboutPage.js
import React from 'react';
import './overview.css';
// import myPhoto from '../assets/my-photo.png';

const Overview = () => {
  return (
    <div className="about-page">
      <div className="about-content">
        <img src="" alt="My Photo" className="about-photo" />
        <h1>About Me</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod urna sed
          elementum tristique. Ut tincidunt enim vitae neque convallis, sit amet fringilla lorem
          faucibus. Donec aliquam elit at sapien ultrices consequat.
        </p>
        <p>
          Fusce ac ante sit amet lorem consequat vehicula. Mauris eleifend leo eget leo
          consequat, sit amet lacinia tellus tempus.
        </p>
      </div>
    </div>
  );
};

export default Overview;
