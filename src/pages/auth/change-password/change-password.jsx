import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../../../redux/slices/passwordResetSlice';

const PasswordResetForm = () => {
  const dispatch = useDispatch();
  const passwordState = useSelector((state) => state.passwordReset);

  const [formData, setFormData] = useState({
    new_password: '',
    new_password1: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword(formData));
  };

  return (
    <div className="h-[calc(100vh-140px)] flex items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">
          Change Password
        </h2>
        {passwordState?.message?.detail && (
          <center className="py-4 bg-green-100 rounded-md">
            {passwordState?.message?.detail}
          </center>
        )}
        {passwordState?.error && (
          <center className="py-4 text-red-600 bg-red-100 rounded-md">
            {passwordState?.error}
            {passwordState?.error[0]}
          </center>
        )}
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="">
              <input
                type="password"
                name="new_password"
                id="new_password"
                value={formData.new_password}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                placeholder="New Password"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                name="new_password1"
                id="new_password1"
                value={formData.new_password1}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                placeholder="Confirm New Password"
                required
              />
            </div>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className={`w-full py-2 mt-4 bg-black text-white rounded-md hover:bg-gray-800 ${
                passwordState.isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={passwordState.isLoading}
            >
              {passwordState.isLoading ? 'Resetting...' : 'Reset Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordResetForm;
