import { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';

export default function ExpiryAlerts() {
  const {
    stock,
    daysUntilExpiry,
    fmtDate
  } = useContext(AppContext);

  const [filter, setFilter] = useState('all');

  const expiryRows = stock
    .map(s => ({ ...s, daysLeft: daysUntilExpiry(s.expiry) }))
    .filter(r => {
      if (filter === 'expired') return r.daysLeft < 0;
      if (['30', '60', '90'].includes(filter)) {
        const threshold = parseInt(filter);
        return r.daysLeft >= 0 && r.daysLeft <= threshold;
      }
      return true; // 'all'
    })
    .sort((a, b) => a.daysLeft - b.daysLeft);

  return (
    <div id="panel-expiry" className="panel">
      <div className="panel-header">
        <h2>📅 Expiry Alerts</h2>
        <div className="actions">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All</option>
            <option value="expired">Expired</option>
            <option value="30">Expiring in 30 days</option>
            <option value="60">Expiring in 60 days</option>
            <option value="90">Expiring in 90 days</option>
          </select>
        </div>
      </div>
      <div className="table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Drug Name</th>
              <th>Category</th>
              <th>Qty</th>
              <th>Expiry Date</th>
              <th>Days Left</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {expiryRows.map(s => {
              const cls = s.daysLeft < 0 || s.daysLeft <= 30 ? 'expiry-critical' : s.daysLeft <= 60 ? 'expiry-soon' : 'expiry-ok';
              const badgeCls = s.daysLeft < 0 || s.daysLeft <= 30 ? 'danger' : s.daysLeft <= 60 ? 'warn' : 'ok';
              const badgeLabel = s.daysLeft < 0 ? 'Expired' : s.daysLeft <= 30 ? 'Critical' : s.daysLeft <= 60 ? 'Soon' : 'OK';

              return (
                <tr key={s.id}>
                  <td><b>{s.name}</b></td>
                  <td>{s.category}</td>
                  <td>{s.qty}</td>
                  <td>{fmtDate(s.expiry)}</td>
                  <td>
                    <span className={`expiry-days ${cls}`}>
                      {s.daysLeft < 0 ? `Expired ${Math.abs(s.daysLeft)} days ago` : `${s.daysLeft} days`}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${badgeCls}`}>{badgeLabel}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {expiryRows.length === 0 && (
          <p id="expiryEmpty" className="empty-note" style={{ display: 'block', padding: '20px' }}>
            ✅ No expiry alerts!
          </p>
        )}
      </div>
    </div>
  );
}
