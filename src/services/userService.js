// src/services/userService.js
import axiosInstance from '../utils/AxiosConfig';

const userService = {
  // Get user profile
  getProfile: async () => {
    try {
      const response = await axiosInstance.get('/profile/');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch profile' };
    }
  },

  // Get all interns (example)
  getInterns: async () => {
    try {
      const response = await axiosInstance.get('/interns/');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch interns' };
    }
  },

  // Get single intern
  getIntern: async (id) => {
    try {
      const response = await axiosInstance.get(`/interns/${id}/`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch intern' };
    }
  },

  // Create intern
  createIntern: async (internData) => {
    try {
      const response = await axiosInstance.post('/interns/', internData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create intern' };
    }
  },

  // Update intern
  updateIntern: async (id, internData) => {
    try {
      const response = await axiosInstance.put(`/interns/${id}/`, internData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update intern' };
    }
  },

  // Delete intern
  deleteIntern: async (id) => {
    try {
      const response = await axiosInstance.delete(`/interns/${id}/`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete intern' };
    }
  }
};

export default userService;