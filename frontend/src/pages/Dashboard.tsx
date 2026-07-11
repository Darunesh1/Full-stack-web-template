import React, { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "../components/layout/Navbar";

const Dashboard = () => {
  const { user, fetchUserProfile, accessToken } = useAuth();

  useEffect(() => {
    if (accessToken && !user) {
      fetchUserProfile();
    }
  }, [accessToken, user, fetchUserProfile]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 sm:p-6 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-6">
              Dashboard
            </h1>
            {user ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Full Name</p>
                  <p className="text-lg font-medium text-gray-800 dark:text-white">{user.full_name}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Email</p>
                  <p className="text-lg font-medium text-gray-800 dark:text-white">{user.email}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</p>
                  <p className="text-lg font-medium text-gray-800 dark:text-white">
                    {user.is_verified ? "✅ Verified" : "⚠️ Not Verified"}
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Member Since</p>
                  <p className="text-lg font-medium text-gray-800 dark:text-white">
                    {new Date(user.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
                <p className="text-gray-500 dark:text-gray-400 mt-4">Loading your profile...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;