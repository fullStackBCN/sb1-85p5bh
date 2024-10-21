import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <nav className="bg-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-white font-bold text-xl">Online Course Platform</Link>
          </div>
          <div className="flex">
            <Link to="/courses" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">Courses</Link>
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">Dashboard</Link>
                <button onClick={logout} className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">Login</Link>
                <Link to="/register" className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">Register</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;