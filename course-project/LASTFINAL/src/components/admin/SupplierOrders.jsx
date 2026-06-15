import { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';

export default function SupplierOrders() {
  const {
    orders,
    nextId,
    todayStr,
    fmtDate,
    addSupplierOrder,
    updateOrderStatus,
    deleteOrder,
    showToast
  } = useContext(AppContext);

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // New Order Form state
  const [orderForm, setOrderForm] = useState({
    orderId: '',
    date: '',
    supplier: '',
    drug: '',
    qty: ''
  });

  const openAddModal = () => {
    setOrderForm({
      orderId: `#ORD-${String(nextId.order).padStart(3, '0')}`,
      date: todayStr(),
      supplier: '',
      drug: '',
      qty: ''
    });
    setShowAddModal(true);
  };

  const handleFormChange = (e) => {
    const { id, value } = e.target;
    setOrderForm(prev => ({ ...prev, [id]: value }));
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!orderForm.supplier.trim() || !orderForm.drug.trim()) {
      showToast('⚠️ Fill all required fields', '#e67e22');
      return;
    }
    
    addSupplierOrder(orderForm);
    setShowAddModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this order?')) {
      deleteOrder(id);
    }
  };

  const filteredOrders = orders.filter(o => {
    const sTerm = search.toLowerCase();
    const matchesSearch = !search ||
      o.drug.toLowerCase().includes(sTerm) ||
      o.supplier.toLowerCase().includes(sTerm) ||
      o.orderId.toLowerCase().includes(sTerm);

    const matchesStatus = !statusFilter || o.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const clsMap = { Pending: 'warn', Delivered: 'ok', Cancelled: 'danger' };

  return (
    <div id="panel-supplier" className="panel">
      <div className="panel-header">
        <h2>🏭 Supplier Orders</h2>
        <div className="actions">
          <button className="btn btn-solid btn-sm" onClick={openAddModal}>
            + New Order
          </button>
        </div>
      </div>
      <div className="search-bar">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔍 Search orders..."
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="filter-select"
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>
      <div className="table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Supplier</th>
              <th>Drug</th>
              <th>Qty</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map(o => (
              <tr key={o.id}>
                <td><code style={{ fontSize: '.78rem' }}>{o.orderId}</code></td>
                <td>{o.supplier}</td>
                <td>{o.drug}</td>
                <td>{o.qty}</td>
                <td>{fmtDate(o.date)}</td>
                <td>
                  <span className={`badge ${clsMap[o.status] || 'blue'}`}>{o.status}</span>
                </td>
                <td>
                  <select
                    className="filter-select"
                    style={{ padding: '4px 8px', fontSize: '.76rem', marginRight: '6px' }}
                    value={o.status}
                    onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                  <button className="tbl-btn del" onClick={() => handleDelete(o.id)}>Del</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredOrders.length === 0 && (
          <p id="orderEmpty" className="empty-note" style={{ display: 'block', padding: '20px' }}>
            No orders yet.
          </p>
        )}
      </div>

      {/* Inline New Order Modal */}
      {showAddModal && (
        <div className="inline-modal active" onClick={() => setShowAddModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowAddModal(false)}>✕</button>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', marginBottom: '20px' }}>
              ➕ New Supplier Order
            </h2>
            <form onSubmit={handleAddSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-lbl">Order ID</label>
                  <input
                    id="orderId"
                    value={orderForm.orderId}
                    onChange={handleFormChange}
                    className="finp"
                    placeholder="#ORD-XXX"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-lbl">Date</label>
                  <input
                    id="date"
                    type="date"
                    value={orderForm.date}
                    onChange={handleFormChange}
                    className="finp"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-lbl">Supplier Name</label>
                <input
                  id="supplier"
                  value={orderForm.supplier}
                  onChange={handleFormChange}
                  className="finp"
                  placeholder="Supplier"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-lbl">Drug Name</label>
                <input
                  id="drug"
                  value={orderForm.drug}
                  onChange={handleFormChange}
                  className="finp"
                  placeholder="Medicine name"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-lbl">Quantity</label>
                <input
                  id="qty"
                  type="number"
                  min="1"
                  value={orderForm.qty}
                  onChange={handleFormChange}
                  className="finp"
                  placeholder="0"
                  required
                />
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '18px' }}>
                <button type="submit" className="btn btn-solid" style={{ flex: 1 }}>
                  Submit Order
                </button>
                <button type="button" className="btn btn-outline" style={{ flex: 1 }} onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
