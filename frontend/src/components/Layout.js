// src/components/Layout.js
import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import '../styles/Layout.css'; // Import your CSS file
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <Sidebar />
      <div className="main-container">
        <Header />
        <main className="main-content">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
