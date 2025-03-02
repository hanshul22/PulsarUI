import axios from 'axios';

const API_URL = 'https://pulsarui-szzd.onrender.com/api/users/getAllUsersn';

export const getJWTUser = async (token) => {
  try {
    const response = await axios.get(`${API_URL}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

