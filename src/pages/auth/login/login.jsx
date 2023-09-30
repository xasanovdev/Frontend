import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, setPassword, setUsername } from '../../../redux/slices/authSlice';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const state = useSelector((state) => state.auth);
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleLogin = () => {
    try {
      dispatch(setPassword(credentials.password))
      dispatch(setUsername(credentials.username))
      dispatch(loginUser(credentials));
      // Handle successful login, e.g., navigate to a different page
    } catch (error) {
      // Handle login error
      console.log(error);
    }
  };
  useEffect(
    () => {
      state.status === 'succeeded' &&
        setTimeout(() => {
          navigate('/');
        }, 1000);
    },
  );

  return (
    <div className="h-[calc(100vh-140px)] flex items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        <h2 className="text-3xl font-extrabold text-center text-gray-900">
          Login
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

        <div className="mt-8">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-black rounded-t-md focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                placeholder="Username"
                value={credentials.username}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-black rounded-b-md focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                placeholder="Password"
                value={credentials.password}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <center className="py-4">
            Are you do not have an account?{' '}
            <Link
              to="/register"
              className="text-black font underline hover:no-underline"
            >
              Register
            </Link>
          </center>
          <div>
            <button
              onClick={handleLogin}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
