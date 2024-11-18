import React from 'react';

const Dashboard = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Latest Measurements</h2>
                <p>No measurements yet</p>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Validation Status</h2>
                <p>No pending validations</p>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">System Health</h2>
                <p>All systems operational</p>
            </div>
        </div>
    );
};

export default Dashboard;