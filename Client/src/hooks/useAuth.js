import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  selectUser,
  selectIsAuthenticated,
  selectUserLoading,
  selectUserError,
  logoutUser
} from '../store/slices/userSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectUserLoading);
  const error = useSelector(selectUserError);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  return {
    user,
    isAuthenticated,
    loading,
    error,
    logout: handleLogout,
  };
};