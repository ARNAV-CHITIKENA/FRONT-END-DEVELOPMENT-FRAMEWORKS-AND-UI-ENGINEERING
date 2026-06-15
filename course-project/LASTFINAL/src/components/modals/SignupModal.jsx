import { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';

export default function SignupModal() {
  const { activeModal, setActiveModal, handleSignup } = useContext(AppContext);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phone: '',
    role: '',
    password: '',
    confirmPassword: ''
  });

  if (activeModal !== 'signup') return null;

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = handleSignup(formData);
    if (success) {
      setFormData({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        phone: '',
        role: '',
        password: '',
        confirmPassword: ''
      });
    }
  };

  return (
    <div className="modal-overlay active" onClick={() => setActiveModal(null)}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={() => setActiveModal(null)}>✕</button>
        <div className="modal-logo">
          <svg viewBox="0 0 80 80" fill="none">
            <path d="M16 52Q14 36 20 28Q28 18 40 18Q52 18 60 28Q66 36 64 52Z" fill="#a3722e" />
            <ellipse cx="36" cy="44" rx="18" ry="10" fill="#3a7d44" transform="rotate(-18 36 44)" />
          </svg>
          <span className="modal-logo-title">PharmaInventory</span>
        </div>
        <h2>Create account</h2>
        <p className="modal-sub">
          Have an account? <a onClick={() => setActiveModal('login')}>Log in</a>
        </p>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label className="form-lbl">First Name</label>
              <input
                id="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="finp"
                placeholder="First name"
              />
            </div>
            <div className="form-group">
              <label className="form-lbl">Last Name</label>
              <input
                id="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="finp"
                placeholder="Last name"
              />
            </div>
          </div>
          <div className="form-group">
            <label className="form-lbl">Username</label>
            <input
              id="username"
              value={formData.username}
              onChange={handleChange}
              className="finp"
              placeholder="Choose a username"
            />
          </div>
          <div className="form-group">
            <label className="form-lbl">Email</label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="finp"
              placeholder="you@example.com"
            />
          </div>
          <div className="form-group">
            <label className="form-lbl">Phone</label>
            <input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              className="finp"
              placeholder="+91 XXXXX XXXXX"
            />
          </div>
          <div className="form-group">
            <label className="form-lbl">Role</label>
            <select
              id="role"
              value={formData.role}
              onChange={handleChange}
              className="finp"
            >
              <option value="">Select your role</option>
              <option value="Pharmacist">Pharmacist</option>
              <option value="Pharmacy Technician">Pharmacy Technician</option>
              <option value="Store Manager">Store Manager</option>
              <option value="Inventory Staff">Inventory Staff</option>
              <option value="Admin">Admin</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-lbl">Password</label>
              <input
                id="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="finp"
                placeholder="Min 8 characters"
              />
            </div>
            <div className="form-group">
              <label className="form-lbl">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="finp"
                placeholder="Re-enter password"
              />
            </div>
          </div>
          <button type="submit" className="btn btn-solid form-submit">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}
