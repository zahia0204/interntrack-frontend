// src/components/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiBriefcase, 
  FiCalendar, 
  FiPlus, 
  FiEdit2, 
  FiTrash2,
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiUser,
  FiX,
  FiRefreshCw
} from 'react-icons/fi';
import authService from '../services/authService';
import applicationService from '../services/applicationService';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingApp, setEditingApp] = useState(null);
  const [deletingApp, setDeletingApp] = useState(null);
  const [formData, setFormData] = useState({
    company_name: '',
    position: '',
    status: 'Applied',
    deadline: '',
    notes: ''
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (!user) {
      navigate('/signin');
      return;
    }
    setUser(user);
    fetchApplications();
  }, [navigate]);

  const fetchApplications = async () => {
    setLoading(true);
    setError('');
    try {
      console.log('Fetching applications...');
      const data = await applicationService.getApplications();
      console.log('Applications received:', data);
      setApplications(data || []);
    } catch (error) {
      console.error('Failed to fetch applications:', error);
      setError('Failed to load applications. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    
    try {
      console.log('Submitting form data:', formData);
      
      if (editingApp) {
        await applicationService.updateApplication(editingApp.id, formData);
      } else {
        await applicationService.createApplication(formData);
      }
      
      // Reset form and close modal
      setFormData({
        company_name: '',
        position: '',
        status: 'Applied',
        deadline: '',
        notes: ''
      });
      setShowModal(false);
      setEditingApp(null);
      
      // Refresh the applications list
      await fetchApplications();
      
    } catch (error) {
      console.error('Failed to save application:', error);
      setError(error.message || 'Failed to save application');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (app) => {
    setEditingApp(app);
    setFormData({
      company_name: app.company_name,
      position: app.position,
      status: app.status,
      deadline: app.deadline,
      notes: app.notes || ''
    });
    setShowModal(true);
  };

  const confirmDelete = (app) => {
    setDeletingApp(app);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!deletingApp) return;
    
    try {
      await applicationService.deleteApplication(deletingApp.id);
      await fetchApplications();
      setShowDeleteModal(false);
      setDeletingApp(null);
    } catch (error) {
      console.error('Failed to delete application:', error);
      setError('Failed to delete application');
    }
  };

  const handleLogout = () => {
    authService.signOut();
    navigate('/');
  };

  const openAddModal = () => {
    setEditingApp(null);
    setFormData({
      company_name: '',
      position: '',
      status: 'Applied',
      deadline: '',
      notes: ''
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingApp(null);
    setError('');
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Applied': return '#ff9800';
      case 'Interview': return '#2196f3';
      case 'Rejected': return '#f44336';
      case 'Accepted': return '#4caf50';
      default: return '#F0E7D5';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Applied': return <FiClock />;
      case 'Interview': return <FiUser />;
      case 'Rejected': return <FiXCircle />;
      case 'Accepted': return <FiCheckCircle />;
      default: return <FiBriefcase />;
    }
  };

  // Calculate stats
  const stats = {
    total: applications.length,
    applied: applications.filter(app => app.status === 'Applied').length,
    interview: applications.filter(app => app.status === 'Interview').length,
    accepted: applications.filter(app => app.status === 'Accepted').length,
    rejected: applications.filter(app => app.status === 'Rejected').length
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        Loading your applications...
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Dashboard Header */}
      <div className="dashboard-header">
        <div>
          <h1>
            Welcome back, {user?.username || 'User'}!
            <span>Track your internship journey</span>
          </h1>
        </div>
        <div className="header-actions">
          <button onClick={fetchApplications} className="refresh-btn" title="Refresh">
            <FiRefreshCw />
          </button>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="error-message" style={{ marginBottom: '1rem' }}>
          {error}
        </div>
      )}

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">
            <h3>Total Applications</h3>
            <FiBriefcase className="stat-icon" />
          </div>
          <div className="stat-number">{stats.total}</div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <h3>Applied</h3>
            <FiClock className="stat-icon" />
          </div>
          <div className="stat-number">{stats.applied}</div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <h3>Interview</h3>
            <FiUser className="stat-icon" />
          </div>
          <div className="stat-number">{stats.interview}</div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <h3>Accepted</h3>
            <FiCheckCircle className="stat-icon" />
          </div>
          <div className="stat-number">{stats.accepted}</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="dashboard-content">
        <div className="content-header">
          <h2>Your Applications ({applications.length})</h2>
          <button className="add-btn" onClick={openAddModal}>
            <FiPlus /> Add Application
          </button>
        </div>

        {/* Applications Grid */}
        {applications.length > 0 ? (
          <div className="applications-grid">
            {applications.map((app) => (
              <div key={app.id} className="application-card">
                <div className="card-header">
                  <div className="company-info">
                    <h3>{app.company_name}</h3>
                    <p className="position">{app.position}</p>
                  </div>
                  <span 
                    className="status-badge"
                    style={{ 
                      backgroundColor: `${getStatusColor(app.status)}20`,
                      color: getStatusColor(app.status),
                      borderColor: `${getStatusColor(app.status)}40`
                    }}
                  >
                    {getStatusIcon(app.status)} {app.status}
                  </span>
                </div>

                <div className="card-details">
                  <div className="detail-item">
                    <FiCalendar className="detail-icon" />
                    <span>Deadline: {new Date(app.deadline).toLocaleDateString()}</span>
                  </div>
                  {app.notes && (
                    <div className="notes">
                      <p>{app.notes}</p>
                    </div>
                  )}
                </div>

                <div className="card-actions">
                  <button 
                    className="edit-btn"
                    onClick={() => handleEdit(app)}
                  >
                    <FiEdit2 /> Edit
                  </button>
                  <button 
                    className="delete-btn"
                    onClick={() => confirmDelete(app)}
                  >
                    <FiTrash2 /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="empty-state">
            <div className="empty-state-icon">📋</div>
            <h3>No applications yet</h3>
            <p>Start tracking your internship journey by adding your first application</p>
            <button className="empty-state-btn" onClick={openAddModal}>
              <FiPlus /> Add Your First Application
            </button>
          </div>
        )}
      </div>

      {/* Add/Edit Application Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingApp ? 'Edit Application' : 'Add New Application'}</h3>
              <button className="modal-close-btn" onClick={closeModal}>
                <FiX />
              </button>
            </div>
            
            {error && (
              <div className="error-message" style={{ marginBottom: '1rem' }}>
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Company Name</label>
                  <input
                    type="text"
                    name="company_name"
                    placeholder="e.g., Google, Microsoft"
                    value={formData.company_name}
                    onChange={handleInputChange}
                    required
                    disabled={submitting}
                  />
                </div>
                <div className="form-group">
                  <label>Position</label>
                  <input
                    type="text"
                    name="position"
                    placeholder="e.g., Software Engineer Intern"
                    value={formData.position}
                    onChange={handleInputChange}
                    required
                    disabled={submitting}
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    required
                    disabled={submitting}
                  >
                    <option value="Applied">Applied</option>
                    <option value="Interview">Interview</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Accepted">Accepted</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Deadline</label>
                  <input
                    type="date"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleInputChange}
                    required
                    disabled={submitting}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Notes (Optional)</label>
                <textarea
                  name="notes"
                  placeholder="Add any notes about this application..."
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows="4"
                  disabled={submitting}
                />
              </div>

              <div className="modal-actions">
                <button 
                  type="submit" 
                  className="save-btn"
                  disabled={submitting}
                >
                  {submitting ? 'Saving...' : (editingApp ? 'Update Application' : 'Save Application')}
                </button>
                <button 
                  type="button" 
                  className="cancel-btn"
                  onClick={closeModal}
                  disabled={submitting}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-overlay" onClick={() => setShowDeleteModal(false)}>
          <div className="modal-content delete-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Delete Application</h3>
              <button className="modal-close-btn" onClick={() => setShowDeleteModal(false)}>
                <FiX />
              </button>
            </div>
            
            <div className="delete-modal-content">
              <p>Are you sure you want to delete this application?</p>
              {deletingApp && (
                <div className="delete-app-info">
                  <strong>{deletingApp.company_name}</strong> - {deletingApp.position}
                </div>
              )}
              <p className="delete-warning">This action cannot be undone.</p>
            </div>

            <div className="modal-actions">
              <button 
                className="delete-confirm-btn"
                onClick={handleConfirmDelete}
              >
                Yes, Delete
              </button>
              <button 
                className="cancel-btn"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;