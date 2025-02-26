import axios from 'axios';

const BASE_URL = 'http://localhost:500';

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const getAdminCodes = async () => {
  try {
    const response = await api.get('/api/admin/codes');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserCodes = async () => {
  try {
    const response = await api.get('/api/user/codes');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getGoogleUser = async () => {
  try {
    const response = await api.get('/login/sucess');
    if (response.data && response.data.user.email) {
      return response.data;
    }
    throw new Error('Invalid Google user data');
  } catch (error) {
    throw new Error('Failed to fetch Google user data');
  }
};

export const getJWTUser = async (token) => {
  try {
    const response = await api.get('/api/users/loggedUser', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    localStorage.setItem('user', JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    throw error;
  }
};  