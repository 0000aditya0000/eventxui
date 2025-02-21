import apiService from '../apiService';

export const login = async (email, password) => {
  try {
    const data = await apiService.post('/user/login', { email, password });
    return data;
  } catch (error) {
    console.error('Error logging in:', error.message);
    throw error;
  }
};

export const signup = async (name,age, email, phone, password) => {
  try {
    const data = await apiService.post('/user/signup', { name,age, email, phone, password, role:'user' });
    return data.data;
  } catch (error) {
    console.error('Error logging in:', error.message);
    throw error;
  }
};
