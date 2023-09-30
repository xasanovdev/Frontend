import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../../redux/slices/authSlice';

export default function Header() {
  const state = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const logOut = () => {
    navigate('/login')
    dispatch(logoutUser());
  }

  return (
    <header className="w-full border-b-2 border-slate-200 relative py-4">
      <nav className="container m-auto flex items-center justify-between">
        <Link className="hover:text-slate-600 logo" to="/">
          BooklisT App
        </Link>
        <div className="flex gap-4">
          {state.status === 'succeeded' ? (
            <div className='flex items-center justify-center gap-x-4'>
              <Link className=' font-semibold text-lg' to={'reset-password'}>Change Password</Link>
              <p
                className="hover:text-slate-600 text-[1rem] md:text-[1.5rem] logo cursor-pointer"
                onClick={logOut}
              >
                Log Out
              </p>
            </div>
          ) : (
            <>
              <Link
                className="hover:text-slate-600 logo text-[1rem] md:text-[1.5rem]"
                to="/login"
              >
                Login
              </Link>

              <Link
                className="hover:text-slate-600 logo text-[1rem] md:text-[1.5rem]"
                to="/register"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}