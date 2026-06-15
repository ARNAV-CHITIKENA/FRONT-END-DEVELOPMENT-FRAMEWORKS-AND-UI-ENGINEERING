import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

export default function UserDashboard() {
  const {
    currentProfile,
    logout,
    stock,
    fmtDate,
    stockStatus
  } = useContext(AppContext);

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  if (!currentProfile) return null;

  const initials = (
    currentProfile.firstName[0] + (currentProfile.lastName ? currentProfile.lastName[0] : '')
  ).toUpperCase();

  const filteredStock = stock.filter(s => {
    const sTerm = search.toLowerCase();
    const matchesSearch = !search ||
      s.name.toLowerCase().includes(sTerm) ||
      s.barcode.toLowerCase().includes(sTerm);
    
    const matchesCategory = !category || s.category === category;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div id="userPage" className="admin-page">
      <nav className="admin-nav">
        <div className="nav-brand">
          <svg className="nav-logo" viewBox="0 0 80 80" fill="none">
            <path d="M16 52Q14 36 20 28Q28 18 40 18Q52 18 60 28Q66 36 64 52Z" fill="#a3722e" />
            <ellipse cx="36" cy="44" rx="18" ry="10" fill="#3a7d44" transform="rotate(-18 36 44)" />
            <ellipse cx="36" cy="44" rx="14" ry="7" fill="#5aaa66" transform="rotate(-18 36 44)" />
          </svg>
          <div className="nav-title">Pharmacy<br /><span>Inventory Management</span></div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '.88rem', color: 'var(--tm)', fontWeight: 500 }}>
            Hello, {currentProfile.firstName} 👋
          </span>
          <button className="btn btn-outline btn-sm" onClick={logout}>Log Out</button>
        </div>
      </nav>

      <div className="user-page-scroll" style={{ overflowY: 'auto', flex: 1 }}>
        <div className="user-body">
          {/* Profile Card */}
          <div className="profile-card">
            <div className="profile-avatar">{initials}</div>
            <div className="profile-name">{currentProfile.firstName} {currentProfile.lastName}</div>
            <div className="profile-role-badge">{currentProfile.role}</div>
            <div className="profile-info-grid">
              <div className="pi-row">
                <span className="pi-lbl">👤 Username</span>
                <span className="pi-val">@{currentProfile.username}</span>
              </div>
              <div className="pi-row">
                <span className="pi-lbl">📧 Email</span>
                <span className="pi-val">{currentProfile.email}</span>
              </div>
              <div className="pi-row">
                <span className="pi-lbl">📱 Phone</span>
                <span className="pi-val">{currentProfile.phone || '—'}</span>
              </div>
              <div className="pi-row">
                <span className="pi-lbl">🏷️ Role</span>
                <span className="pi-val">{currentProfile.role}</span>
              </div>
              <div className="pi-row">
                <span className="pi-lbl">📅 Joined</span>
                <span className="pi-val">{currentProfile.joinedAt || '—'}</span>
              </div>
            </div>
          </div>

          {/* Read-only Stock */}
          <div className="user-stock">
            <div className="panel-header">
              <h2>💊 Medicine Stock</h2>
              <span className="readonly-badge">👁️ View Only</span>
            </div>
            <div className="search-bar">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="🔍 Search medicine..."
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="filter-select"
              >
                <option value="">All Categories</option>
                <option value="Analgesic">Analgesic</option>
                <option value="Antibiotic">Antibiotic</option>
                <option value="Antidiabetic">Antidiabetic</option>
                <option value="Antihypertensive">Antihypertensive</option>
                <option value="Antihistamine">Antihistamine</option>
                <option value="Vitamin">Vitamin</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Barcode</th>
                    <th>Drug Name</th>
                    <th>Category</th>
                    <th>Qty</th>
                    <th>Unit Price</th>
                    <th>Expiry</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStock.map(s => {
                    const st = stockStatus(s.qty, s.threshold);
                    return (
                      <tr key={s.id}>
                        <td>
                          <code style={{ fontSize: '.78rem', background: '#f0f0f0', padding: '2px 6px', borderRadius: '4px' }}>
                            {s.barcode}
                          </code>
                        </td>
                        <td><b>{s.name}</b></td>
                        <td>{s.category}</td>
                        <td style={{ fontWeight: 600 }}>{s.qty}</td>
                        <td>₹{s.price.toFixed(2)}</td>
                        <td>{fmtDate(s.expiry)}</td>
                        <td>
                          <span className={`badge ${st.cls}`}>{st.label}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {filteredStock.length === 0 && (
                <p style={{ textAlign: 'center', padding: '20px', color: 'var(--tm)' }}>
                  No medicines found.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
