import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function LandingView() {
  const { setActiveModal } = useContext(AppContext);

  return (
    <div id="homePage">
      <nav>
        <div className="nav-brand">
          <svg className="nav-logo" viewBox="0 0 80 80" fill="none">
            <path d="M16 52Q14 36 20 28Q28 18 40 18Q52 18 60 28Q66 36 64 52Z" fill="#a3722e" />
            <ellipse cx="36" cy="44" rx="18" ry="10" fill="#3a7d44" transform="rotate(-18 36 44)" />
            <ellipse cx="36" cy="44" rx="14" ry="7" fill="#5aaa66" transform="rotate(-18 36 44)" />
            <rect x="48" y="10" width="7" height="30" rx="3.5" fill="#7b5427" transform="rotate(20 48 10)" />
            <circle cx="62" cy="17" r="6" fill="#a3722e" />
            <circle cx="30" cy="20" r="3" fill="#5aaa66" opacity=".7" />
          </svg>
          <div className="nav-title">Pharmacy<br /><span>Inventory Management</span></div>
        </div>
        <div className="nav-actions">
          <button className="btn btn-outline" onClick={() => setActiveModal('login')}>Log In</button>
          <button className="btn btn-solid" onClick={() => setActiveModal('signup')}>Sign Up</button>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-badge">
          <span className="dot"></span>Healthcare · Inventory · Automation
        </div>
        <h1>Smart <em>Pharmacy</em><br />Inventory <strong>Management</strong></h1>
        <p className="hero-desc">
          Track drug stock levels, monitor expiry dates, receive real-time reorder alerts, manage supplier orders and dispensing records — all from one unified platform.
        </p>
        <div className="hero-actions">
          <button className="btn btn-solid" onClick={() => setActiveModal('signup')}>Get Started Free</button>
          <button className="btn btn-outline" onClick={() => setActiveModal('login')}>Log In to Dashboard</button>
        </div>
      </section>

      <div className="features">
        <div className="feat-card">
          <div className="feat-icon">💊</div>
          <div className="feat-title">Stock Management</div>
          <p className="feat-desc">Live tracking with low-stock warnings and status indicators.</p>
        </div>
        <div className="feat-card">
          <div className="feat-icon">📅</div>
          <div className="feat-title">Expiry Alerts</div>
          <p className="feat-desc">Automated notifications before medicines approach expiry.</p>
        </div>
        <div className="feat-card">
          <div className="feat-icon">🔁</div>
          <div className="feat-title">Reorder System</div>
          <p className="feat-desc">Smart reorder forms triggered when stock falls below threshold.</p>
        </div>
        <div className="feat-card">
          <div className="feat-icon">🏭</div>
          <div className="feat-title">Supplier Orders</div>
          <p className="feat-desc">Manage purchase orders from multiple suppliers.</p>
        </div>
        <div className="feat-card">
          <div className="feat-icon">📋</div>
          <div className="feat-title">Dispense Log</div>
          <p className="feat-desc">Track every dispensed medicine with customer and quantity.</p>
        </div>
        <div className="feat-card">
          <div className="feat-icon">📊</div>
          <div className="feat-title">Analytics</div>
          <p className="feat-desc">Charts and reports on dispensing trends and stock movement.</p>
        </div>
        <div className="feat-card">
          <div className="feat-icon">🔍</div>
          <div className="feat-title">Barcode Lookup</div>
          <p className="feat-desc">Quick medicine identification via barcode or ID input.</p>
        </div>
        <div className="feat-card">
          <div className="feat-icon">📤</div>
          <div className="feat-title">Export Data</div>
          <p className="feat-desc">Export inventory, logs and reports as CSV or PDF.</p>
        </div>
      </div>
    </div>
  );
}
