import axios from 'axios';
export const getUserCodes = async () => {
  try {
    const response = await axios.get('https://pulsarui-szzd.onrender.com/api/user/codes');
    console.log("UserCode", response.data);
    
    return response.data;
  } catch (error) {
    console.error('Error fetching codes:', error);
    throw error;
  }
};


