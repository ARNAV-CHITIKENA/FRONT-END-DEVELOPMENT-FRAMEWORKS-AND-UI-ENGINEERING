import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

// Import subpanels
import StockList from './admin/StockList';
import ExpiryAlerts from './admin/ExpiryAlerts';
import ReorderAlerts from './admin/ReorderAlerts';
import SupplierOrders from './admin/SupplierOrders';
import DispenseLog from './admin/DispenseLog';
import BarcodeLookup from './admin/BarcodeLookup';
import Analytics from './admin/Analytics';
import ManageUsers from './admin/ManageUsers';

export default function AdminDashboard() {
  const {
    logout,
    notifications,
    clearNotifs,
    setActiveModal
  } = useContext(AppContext);

  const [activeTab, setActiveTab] = useState('stock');
  const [showNotifPanel, setShowNotifPanel] = useState(false);

  const toggleNotifPanel = () => {
    setShowNotifPanel(prev => !prev);
  };

  const handleClearNotifs = () => {
    clearNotifs();
    setShowNotifPanel(false);
  };

  const renderPanel = () => {
    switch (activeTab) {
      case 'stock':
        return <StockList />;
      case 'expiry':
        return <ExpiryAlerts />;
      case 'reorder':
        return <ReorderAlerts />;
      case 'supplier':
        return <SupplierOrders />;
      case 'dispense':
        return <DispenseLog />;
      case 'barcode':
        return <BarcodeLookup />;
      case 'analytics':
        return <Analytics />;
      case 'users':
        return <ManageUsers />;
      default:
        return <StockList />;
    }
  };

  return (
    <div id="adminPage" className="admin-page">
      <nav className="admin-nav">
        <div className="nav-brand">
          <svg className="nav-logo" viewBox="0 0 80 80" fill="none">
            <path d="M16 52Q14 36 20 28Q28 18 40 18Q52 18 60 28Q66 36 64 52Z" fill="#a3722e" />
            <ellipse cx="36" cy="44" rx="18" ry="10" fill="#3a7d44" transform="rotate(-18 36 44)" />
            <ellipse cx="36" cy="44" rx="14" ry="7" fill="#5aaa66" transform="rotate(-18 36 44)" />
          </svg>
          <div className="nav-title">Pharmacy<br /><span>Admin Dashboard</span></div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', position: 'relative' }}>
          
          {/* Notification Bell */}
          <button className="notif-btn" id="notifBtn" onClick={toggleNotifPanel}>
            🔔
            {notifications.length > 0 && (
              <span className="notif-count" id="notifCount">
                {notifications.length > 9 ? '9+' : notifications.length}
              </span>
            )}
          </button>

          {showNotifPanel && (
            <div className="notif-panel" id="notifPanel" style={{ display: 'block' }}>
              <div className="notif-header">
                <h4>Notifications</h4>
                <button
                  onClick={handleClearNotifs}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '.78rem', color: 'var(--green)' }}
                >
                  Clear all
                </button>
              </div>
              <div id="notifList">
                {notifications.length > 0 ? (
                  notifications.map((n, idx) => (
                    <div className="notif-item" key={idx}>
                      <div className="notif-icon">{n.icon}</div>
                      <div>
                        <div className="notif-text">{n.text}</div>
                        <div className="notif-time">{n.time}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="notif-empty">No notifications</div>
                )}
              </div>
            </div>
          )}

          <button className="btn btn-solid btn-sm" onClick={() => setActiveModal('export')}>
            📤 Export
          </button>
          <button className="btn btn-outline btn-sm" onClick={logout}>
            Log Out
          </button>
        </div>
      </nav>

      <div className="admin-body">
        <aside className="admin-sidebar">
          <p className="sidebar-label sidebar-label-top">Inventory</p>
          <button
            className={`sidebar-btn ${activeTab === 'stock' ? 'active' : ''}`}
            onClick={() => setActiveTab('stock')}
          >
            💊 <span className="sbtext">Stock List</span>
          </button>
          <button
            className={`sidebar-btn ${activeTab === 'expiry' ? 'active' : ''}`}
            onClick={() => setActiveTab('expiry')}
          >
            📅 <span className="sbtext">Expiry Alerts</span>
          </button>
          <button
            className={`sidebar-btn ${activeTab === 'reorder' ? 'active' : ''}`}
            onClick={() => setActiveTab('reorder')}
          >
            🔁 <span className="sbtext">Reorder</span>
          </button>

          <p className="sidebar-label">Orders</p>
          <button
            className={`sidebar-btn ${activeTab === 'supplier' ? 'active' : ''}`}
            onClick={() => setActiveTab('supplier')}
          >
            🏭 <span className="sbtext">Supplier Orders</span>
          </button>
          <button
            className={`sidebar-btn ${activeTab === 'dispense' ? 'active' : ''}`}
            onClick={() => setActiveTab('dispense')}
          >
            📋 <span className="sbtext">Dispense Log</span>
          </button>

          <p className="sidebar-label">Tools</p>
          <button
            className={`sidebar-btn ${activeTab === 'barcode' ? 'active' : ''}`}
            onClick={() => setActiveTab('barcode')}
          >
            🔍 <span className="sbtext">Barcode Lookup</span>
          </button>
          <button
            className={`sidebar-btn ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            📊 <span className="sbtext">Analytics</span>
          </button>

          <p className="sidebar-label">Admin</p>
          <button
            className={`sidebar-btn ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            👥 <span className="sbtext">Manage Users</span>
          </button>
        </aside>

        <main className="admin-main">
          {renderPanel()}
        </main>
      </div>
    </div>
  );
}
