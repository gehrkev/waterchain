import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="text-xl font-bold text-blue-600">
                            WaterChain
                        </Link>
                        <div className="ml-10 flex items-center space-x-4">
                            <Link to="/" className="text-gray-700 hover:text-gray-900">
                                Dashboard
                            </Link>
                            <Link to="/measurements" className="text-gray-700 hover:text-gray-900">
                                Measurements
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;