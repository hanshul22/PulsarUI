import axios from 'axios';

export const getAdminCodes = async () => {
  try {
    const response = await axios.get('https://pulsarui-szzd.onrender.com/api/admin/codes', {});
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching codes:', error);
    throw error;
  }
};
