import { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';

export default function LoginModal() {
  const { activeModal, setActiveModal, handleLogin } = useContext(AppContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  if (activeModal !== 'login') return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = handleLogin(username, password);
    if (success) {
      setUsername('');
      setPassword('');
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
        <h2>Welcome back</h2>
        <p className="modal-sub">
          Don't have an account?{' '}
          <a onClick={() => setActiveModal('signup')}>Sign up free</a>
        </p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-lbl">Username or Email</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="finp"
              placeholder="Username or email"
              autoComplete="username"
            />
          </div>
          <div className="form-group">
            <label className="form-lbl">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="finp"
              placeholder="Password"
              autoComplete="current-password"
            />
          </div>
          <a className="forgot-link" onClick={() => setActiveModal('forgot')}>
            Forgot password?
          </a>
          <button type="submit" className="btn btn-solid form-submit">
            Log In
          </button>
        </form>
        <div className="admin-hint">
          <span>🔐 Admin — Username: <b>admin</b> &nbsp;|&nbsp; Password: <b>Admin@123</b></span>
        </div>
      </div>
    </div>
  );
}
