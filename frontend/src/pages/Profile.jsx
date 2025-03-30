import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const Profile = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    address: { line1: '', line2: '' },
    gender: '',
    dob: '',
    image: '',
  });
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get(`${backendUrl}/api/user/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setUserData(data.user);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Error fetching profile');
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.put(`${backendUrl}/api/user/update`, userData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        toast.success('Profile updated successfully');
        setIsEdit(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Error updating profile');
    }
  };

  return (
    <div className="max-w-lg flex flex-col gap-2 text-sm">
      <img className="w-36 rounded mt-7" src={userData.image} alt="Profile" />
      {isEdit ? (
        <input
          className="bg-gray-60 text-3xl font-medium max-w-60 mt-4"
          type="text"
          value={userData.name}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
        />
      ) : (
        <p className="font-medium text-3xl text-neutral-800 mt-4">{userData.name}</p>
      )}

      <hr className="bg-zinc-400 h-[1px] border-none" />

      <div>
        <p className="text-neutral-500 underline mt-3">CONTACT INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral">
          <p className="font-medium">Email:</p>
          <p className="text-blue-600">{userData.email}</p>

          <p className="font-medium">Phone:</p>
          {isEdit ? (
            <input
              className="bg-gray-100 max-w-52"
              type="text"
              value={userData.phone}
              onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
            />
          ) : (
            <p className="text-blue-400">{userData.phone}</p>
          )}

          <p className="font-medium">Address:</p>
          {isEdit ? (
            <div>
              <input
                className="bg-gray-50"
                type="text"
                value={userData.address.line1}
                onChange={(e) => setUserData({ ...userData, address: { ...userData.address, line1: e.target.value } })}
              />
              <br />
              <input
                className="bg-gray-50"
                type="text"
                value={userData.address.line2}
                onChange={(e) => setUserData({ ...userData, address: { ...userData.address, line2: e.target.value } })}
              />
            </div>
          ) : (
            <p className="text-gray-500">{userData.address.line1}<br />{userData.address.line2}</p>
          )}
        </div>
      </div>

      <div className="mt-4">
        {isEdit ? (
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSave}>
            Save
          </button>
        ) : (
          <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => setIsEdit(true)}>
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
