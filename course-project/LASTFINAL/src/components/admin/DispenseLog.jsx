import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';

export default function DispenseLog() {
  const {
    dispense,
    setActiveModal
  } = useContext(AppContext);

  const [search, setSearch] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  // Filtering logs
  const filteredLogs = dispense.filter(d => {
    const sTerm = search.toLowerCase();
    const matchSearch = !search ||
      d.drug.toLowerCase().includes(sTerm) ||
      d.customer.toLowerCase().includes(sTerm) ||
      (d.rx || '').toLowerCase().includes(sTerm) ||
      (d.phone || '').includes(sTerm);

    if (!matchSearch) return false;
    if (!dateFilter) return true;

    const dDate = new Date(d.date);
    const now = new Date();

    if (dateFilter === 'today') {
      return dDate.toDateString() === now.toDateString();
    } else if (dateFilter === 'week') {
      const weekAgo = new Date(now);
      weekAgo.setDate(now.getDate() - 7);
      return dDate >= weekAgo;
    } else if (dateFilter === 'month') {
      return dDate.getMonth() === now.getMonth() && dDate.getFullYear() === now.getFullYear();
    }

    return true;
  });

  // Calculate summaries
  const totalRecords = dispense.length;
  const totalUnits = dispense.reduce((a, d) => a + d.qty, 0);
  const uniqueMedicines = new Set(dispense.map(d => d.drug)).size;
  const uniquePatients = new Set(dispense.map(d => d.customer)).size;

  return (
    <div id="panel-dispense" className="panel">
      <div className="panel-header">
        <h2>📋 Dispense Log</h2>
        <div className="actions">
          <button className="btn btn-solid btn-sm" onClick={() => setActiveModal('dispense')} style={{ whiteSpace: 'nowrap' }}>
            💊 + Dispense Medicine
          </button>
        </div>
      </div>

      <div className="dispense-summary" id="dispenseSummary">
        <div className="disp-card">
          <div className="num">{totalRecords}</div>
          <div className="lbl">Total Records</div>
        </div>
        <div className="disp-card">
          <div className="num">{totalUnits}</div>
          <div className="lbl">Total Units Dispensed</div>
        </div>
        <div className="disp-card">
          <div className="num">{uniqueMedicines}</div>
          <div className="lbl">Unique Medicines</div>
        </div>
        <div className="disp-card">
          <div className="num">{uniquePatients}</div>
          <div className="lbl">Unique Patients</div>
        </div>
      </div>

      <div className="search-bar">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔍 Search by drug, customer, Rx..."
        />
        <select
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="filter-select"
        >
          <option value="">All Time</option>
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
      </div>

      <div className="table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Date &amp; Time</th>
              <th>Drug</th>
              <th>Customer</th>
              <th>Contact</th>
              <th>Qty</th>
              <th>Prescription</th>
              <th>Dispensed By</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map(d => {
              const genderIcon = d.gender === 'Male' ? '♂️' : d.gender === 'Female' ? '♀️' : d.gender ? '⚧️' : '';
              const contactInfo = [
                d.phone ? `📞 ${d.phone}` : '',
                d.age ? `Age: ${d.age}` : '',
                d.gender ? `${genderIcon} ${d.gender}` : ''
              ].filter(Boolean);

              return (
                <tr key={d.id}>
                  <td style={{ fontSize: '.8rem', whiteSpace: 'nowrap' }}>{d.date}</td>
                  <td><b>{d.drug}</b></td>
                  <td><div style={{ fontWeight: 600 }}>{d.customer}</div></td>
                  <td style={{ fontSize: '.8rem', color: 'var(--tm)', lineHeight: 1.6 }}>
                    {contactInfo.length > 0 ? (
                      contactInfo.map((info, idx) => (
                        <React.Fragment key={idx}>
                          {info}
                          {idx < contactInfo.length - 1 && <br />}
                        </React.Fragment>
                      ))
                    ) : '—'}
                  </td>
                  <td>
                    <span style={{ fontWeight: 700, color: 'var(--green)', fontSize: '1rem' }}>{d.qty}</span>
                  </td>
                  <td><code style={{ fontSize: '.76rem' }}>{d.rx}</code></td>
                  <td style={{ fontSize: '.82rem' }}>{d.by}</td>
                  <td style={{ color: 'var(--tm)', fontSize: '.82rem' }}>{d.notes || '—'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filteredLogs.length === 0 && (
          <p id="dispenseEmpty" className="empty-note" style={{ display: 'block', padding: '20px' }}>
            No dispense records yet.
          </p>
        )}
      </div>
    </div>
  );
}
