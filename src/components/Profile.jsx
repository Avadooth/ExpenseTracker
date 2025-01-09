import React, { useState, useEffect } from 'react';
import api from '../api';

const Profile = () => {
  const [userData, setUserData] = useState({
    email: '',
    name: '',
  });
  const [error, setError] = useState('');

  const fetchUserProfile = async () => {
    try {
      const response = await api.get('/user/profile');
      setUserData(response.data);
    } catch (error) {
      setError('Error fetching profile');
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleSave = async () => {
    try {
      await api.put('/user/profile', userData);
      setError('Profile updated successfully!');
    } catch (error) {
      setError('Error updating profile');
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-16">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div>
        <label className="block text-gray-700">Name</label>
        <input
          type="text"
          value={userData.name}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          className="w-full p-2 border rounded"
          disabled
        />
      </div>
      <button
        onClick={handleSave}
        className="bg-blue-600 text-white py-2 px-4 rounded mt-4"
      >
        Save Changes
      </button>
    </div>
  );
};

export default Profile;
