import { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';

export default function StockList() {
  const {
    stock,
    stockStatus,
    fmtDate,
    deleteStockItem,
    setActiveModal,
    setSelectedStockId
  } = useContext(AppContext);

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const handleEdit = (id) => {
    setSelectedStockId(id);
    setActiveModal('editStock');
  };

  const handleAdjust = (id) => {
    setSelectedStockId(id);
    setActiveModal('adjustStock');
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this medicine from stock?')) {
      deleteStockItem(id);
    }
  };

  const filteredStock = stock.filter(s => {
    const sTerm = search.toLowerCase();
    const st = stockStatus(s.qty, s.threshold);

    const matchesSearch = !search ||
      s.name.toLowerCase().includes(sTerm) ||
      s.barcode.toLowerCase().includes(sTerm) ||
      s.category.toLowerCase().includes(sTerm);

    const matchesCategory = !category || s.category === category;
    const matchesStatus = !statusFilter || st.label === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div id="panel-stock" className="panel">
      <div className="panel-header">
        <h2>💊 Stock List</h2>
        <div className="actions">
          <button className="btn btn-solid btn-sm" onClick={() => { setSelectedStockId(null); setActiveModal('editStock'); }}>
            + Add Medicine
          </button>
        </div>
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
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="filter-select"
        >
          <option value="">All Status</option>
          <option value="In Stock">In Stock</option>
          <option value="Low Stock">Low Stock</option>
          <option value="Out of Stock">Out of Stock</option>
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
              <th>Threshold</th>
              <th>Expiry</th>
              <th>Status</th>
              <th>Actions</th>
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
                  <td>{s.threshold}</td>
                  <td>{fmtDate(s.expiry)}</td>
                  <td>
                    <span className={`badge ${st.cls}`}>{st.label}</span>
                  </td>
                  <td>
                    <button className="tbl-btn edit" onClick={() => handleEdit(s.id)}>✏️ Edit</button>
                    <button className="tbl-btn adjust" onClick={() => handleAdjust(s.id)}>⚖️ Adjust</button>
                    <button className="tbl-btn del" onClick={() => handleDelete(s.id)}>🗑️ Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filteredStock.length === 0 && (
          <p id="stockEmpty" className="empty-note" style={{ display: 'block', padding: '20px' }}>
            No medicines found.
          </p>
        )}
      </div>
    </div>
  );
}
