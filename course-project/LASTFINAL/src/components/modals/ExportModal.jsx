import { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';

export default function ExportModal() {
  const {
    activeModal,
    setActiveModal,
    stock,
    orders,
    dispense,
    users,
    daysUntilExpiry,
    showToast
  } = useContext(AppContext);

  const [dataset, setDataset] = useState('stock');

  if (activeModal !== 'export') return null;

  const handleExport = (format) => {
    let rows = [];
    let headers = [];

    if (dataset === 'stock') {
      headers = ['Barcode', 'Name', 'Category', 'Qty', 'Price', 'Threshold', 'Expiry', 'Supplier'];
      rows = stock.map(s => [s.barcode, s.name, s.category, s.qty, s.price, s.threshold, s.expiry, s.supplier]);
    } else if (dataset === 'orders') {
      headers = ['OrderID', 'Supplier', 'Drug', 'Qty', 'Date', 'Status'];
      rows = orders.map(o => [o.orderId, o.supplier, o.drug, o.qty, o.date, o.status]);
    } else if (dataset === 'dispense') {
      headers = ['Date', 'Drug', 'Customer', 'Qty', 'RX', 'DispensedBy', 'Notes'];
      rows = dispense.map(d => [d.date, d.drug, d.customer, d.qty, d.rx, d.by, d.notes]);
    } else if (dataset === 'expiry') {
      headers = ['Name', 'Category', 'Qty', 'Expiry', 'DaysLeft'];
      rows = stock.map(s => [s.name, s.category, s.qty, s.expiry, daysUntilExpiry(s.expiry)]);
    } else if (dataset === 'users') {
      headers = ['First', 'Last', 'Username', 'Email', 'Phone', 'Role', 'Joined'];
      rows = users.map(u => [u.firstName, u.lastName, u.username, u.email, u.phone, u.role, u.joinedAt]);
    }

    if (format === 'csv') {
      const csvContent = [
        headers,
        ...rows
      ].map(r => r.map(v => `"${(v || '').toString().replace(/"/g, '""')}"`).join(',')).join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `${dataset}_export.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast('✅ CSV exported!');
    } else {
      const win = window.open('', '_blank');
      if (!win) {
        showToast('❌ Popup blocked. Enable popups to print reports.', '#c0392b');
        return;
      }
      
      win.document.write(`
        <html>
          <head>
            <title>${dataset} Export</title>
            <style>
              body { font-family: sans-serif; padding: 20px; }
              table { border-collapse: collapse; width: 100%; margin-top: 20px; }
              th, td { border: 1px solid #ccc; padding: 8px; font-size: 12px; text-align: left; }
              th { background: #e8f5eb; }
              h2 { text-transform: uppercase; color: #3a7d44; }
            </style>
          </head>
          <body>
            <h2>${dataset} Report</h2>
            <table>
              <thead>
                <tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr>
              </thead>
              <tbody>
                ${rows.map(r => `<tr>${r.map(v => `<td>${v !== null && v !== undefined ? v : ''}</td>`).join('')}</tr>`).join('')}
              </tbody>
            </table>
          </body>
        </html>
      `);
      win.document.close();
      win.print();
      showToast('✅ PDF ready to print!');
    }
    setActiveModal(null);
  };

  return (
    <div className="modal-overlay active" onClick={() => setActiveModal(null)}>
      <div className="modal" style={{ maxWidth: '440px' }} onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={() => setActiveModal(null)}>✕</button>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', marginBottom: '6px' }}>
          📤 Export Data
        </h2>
        <p style={{ fontSize: '.85rem', color: 'var(--tm)', marginBottom: '12px' }}>
          Choose dataset and format
        </p>
        <div className="form-group">
          <label className="form-lbl">Dataset</label>
          <select
            value={dataset}
            onChange={(e) => setDataset(e.target.value)}
            className="finp"
          >
            <option value="stock">Stock List</option>
            <option value="orders">Supplier Orders</option>
            <option value="dispense">Dispense Log</option>
            <option value="expiry">Expiry Alerts</option>
            <option value="users">Users</option>
          </select>
        </div>
        <div className="export-options">
          <div className="export-opt" onClick={() => handleExport('csv')}>
            <div className="eo-icon">📄</div>
            <div className="eo-title">CSV Export</div>
            <div className="eo-desc">Excel / spreadsheet compatible</div>
          </div>
          <div className="export-opt" onClick={() => handleExport('pdf')}>
            <div className="eo-icon">📑</div>
            <div className="eo-title">PDF Export</div>
            <div className="eo-desc">Printable report format</div>
          </div>
        </div>
      </div>
    </div>
  );
}
