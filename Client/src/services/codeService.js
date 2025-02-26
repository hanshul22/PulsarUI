import api from '../config/api';

export const fetchAdminCodesService = async () => {
  const response = await api.get('/api/admin/codes');
  return response.data;
};

export const fetchUserCodesService = async () => {
  const response = await api.get('/api/user/codes');
  return response.data;
};

export const createCodeService = async (formData) => {
  const response = await api.post('/api/user/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

export const deleteCodeService = async (codeId) => {
  await api.delete(`/api/user/delete/${codeId}`);
  return codeId;
};