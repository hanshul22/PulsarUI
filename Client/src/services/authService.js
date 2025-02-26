import api from '../config/api';

export const loginService = async (credentials) => {
  try {
    const response = await api.post('/api/users/login', credentials);
    
    if (response.data.status === "success") {
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      return { token, user };
    }
    
    throw new Error(response.data.message || 'Login failed');
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'Login failed';
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    throw errorMessage;
  }
};

export const registerService = async (userData) => {
  try {
    const response = await api.post('/api/users/register', userData);
    
    if (response.data.status === "success") {
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      return { token, user };
    }
    
    throw new Error(response.data.message || 'Registration failed');
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'Registration failed';
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    throw errorMessage;
  }
};

export const logoutService = async () => {
  try {
    await api.post('/api/users/jwt/logout');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  } catch (error) {
    console.error('Logout error:', error);
    // Still remove local storage items even if API call fails
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    throw error;
  }
};