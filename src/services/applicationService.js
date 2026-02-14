// src/services/applicationService.js
import axiosInstance from '../utils/AxiosConfig';

const applicationService = {
  // Get all applications for logged-in user
  getApplications: async () => {
    try {
      console.log('🔵 Fetching applications...');
      const response = await axiosInstance.get('/api/applications/');
      console.log('✅ Applications fetched:', response.data);
      return response.data;
    } catch (error) {
      console.error('🔴 Error fetching applications:', error.response?.data || error);
      throw error.response?.data || { message: 'Failed to fetch applications' };
    }
  },

  // Get single application
  getApplication: async (id) => {
    try {
      const response = await axiosInstance.get(`/api/applications/${id}/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching application:', error);
      throw error.response?.data || { message: 'Failed to fetch application' };
    }
  },

  // Create new application
  createApplication: async (applicationData) => {
    try {
      console.log('🔵 Creating application:', applicationData);
      const response = await axiosInstance.post('/api/applications/', applicationData);
      console.log('✅ Application created:', response.data);
      return response.data;
    } catch (error) {
      console.error('🔴 Error creating application:', error.response?.data || error);
      throw error.response?.data || { message: 'Failed to create application' };
    }
  },

  // Update application
  updateApplication: async (id, applicationData) => {
    try {
      console.log('🔵 Updating application:', id, applicationData);
      const response = await axiosInstance.put(`/api/applications/${id}/`, applicationData);
      console.log('✅ Application updated:', response.data);
      return response.data;
    } catch (error) {
      console.error('🔴 Error updating application:', error.response?.data || error);
      throw error.response?.data || { message: 'Failed to update application' };
    }
  },

  // Delete application
  deleteApplication: async (id) => {
    try {
      console.log('🔵 Deleting application:', id);
      const response = await axiosInstance.delete(`/api/applications/${id}/`);
      console.log('✅ Application deleted:', response.data);
      return response.data;
    } catch (error) {
      console.error('🔴 Error deleting application:', error.response?.data || error);
      throw error.response?.data || { message: 'Failed to delete application' };
    }
  }
};

export default applicationService;