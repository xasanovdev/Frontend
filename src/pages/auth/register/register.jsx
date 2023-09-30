import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../../redux/slices/authSlice';
import { Link, useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const state = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    password: '',
    password1: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(registerUser(formData));
  };

  useEffect(() => {
    state.status === 'succeeded' &&
      setTimeout(() => {
        navigate('/');
      }, 1000);
  });

  return (
    <div className="h-[calc(100vh-140px)] flex items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">
          User Registration
        </h2>
        {state.status === 'succeeded' && (
          <center className="py-4 bg-green-100 rounded-md">
            {state?.user?.detail}
          </center>
        )}
        {state.status === 'failed' && (
          <center className="py-4 bg-red-100 text-red-600 rounded-md">
            Incorrect username or password.
          </center>
        )}
        <form onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="rounded-md shadow-sm -space-y-px">
              <input
                type="text"
                name="first_name"
                placeholder="First Name"
                value={formData.first_name}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
              />
            </div>
            <div className="">
              <input
                type="text"
                name="last_name"
                placeholder="Last Name"
                value={formData.last_name}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
              />
            </div>
            <div className="">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
              />
            </div>
            <div className="">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
              />
            </div>
            <div className="">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
              />
            </div>
            <div className="">
              <input
                type="password"
                name="password1"
                placeholder="Confirm Password"
                value={formData.password1}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
              />
            </div>
            <center className="py-4">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-black font underline hover:no-underline"
              >
                Login
              </Link>
            </center>

            <div className="mb-4">
              <button
                type="submit"
                className="w-full py-2 bg-black text-white rounded-md hover:bg-gray-800"
              >
                Register
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
