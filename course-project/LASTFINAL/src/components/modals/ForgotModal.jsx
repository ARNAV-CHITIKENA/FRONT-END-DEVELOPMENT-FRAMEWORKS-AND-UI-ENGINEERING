import { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';

export default function ForgotModal() {
  const { activeModal, setActiveModal, handleReset } = useContext(AppContext);
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  if (activeModal !== 'forgot') return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = handleReset(newPass, confirmPass);
    if (success) {
      setNewPass('');
      setConfirmPass('');
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
        <h2>Reset Password</h2>
        <p className="modal-sub" style={{ marginBottom: '18px' }}>
          Enter and confirm your new password.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-lbl">New Password</label>
            <input
              type="password"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              className="finp"
              placeholder="Min 8 characters"
            />
          </div>
          <div className="form-group">
            <label className="form-lbl">Confirm New Password</label>
            <input
              type="password"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              className="finp"
              placeholder="Re-enter new password"
            />
          </div>
          <button type="submit" className="btn btn-solid form-submit">
            Update Password
          </button>
        </form>
        <div style={{ textAlign: 'center', marginTop: '14px' }}>
          <a className="forgot-link" style={{ float: 'none', display: 'inline-block' }} onClick={() => setActiveModal('login')}>
            ← Back to Login
          </a>
        </div>
      </div>
    </div>
  );
}
