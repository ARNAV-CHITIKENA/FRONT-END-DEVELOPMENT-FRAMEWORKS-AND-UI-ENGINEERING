import { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';

export default function AdjustStockModal() {
  const {
    activeModal,
    setActiveModal,
    selectedStockId,
    setSelectedStockId,
    stock,
    adjustStock,
    showToast
  } = useContext(AppContext);

  const [type, setType] = useState('add');
  const [qty, setQty] = useState('');
  const [reason, setReason] = useState('');

  const item = selectedStockId !== null ? stock.find(s => s.id === selectedStockId) : null;

  if (activeModal !== 'adjustStock' || !item) return null;

  const handleClose = () => {
    setActiveModal(null);
    setSelectedStockId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsedQty = parseInt(qty);
    if (isNaN(parsedQty) || parsedQty < 0) {
      showToast('⚠️ Enter a valid quantity', '#e67e22');
      return;
    }
    
    adjustStock(item.id, type, parsedQty, reason.trim());
    handleClose();
  };

  return (
    <div className="inline-modal active" onClick={handleClose}>
      <div className="modal" style={{ maxWidth: '400px', borderTop: '4px solid #2563eb' }} onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={handleClose}>✕</button>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.3rem', marginBottom: '6px' }}>
          ⚖️ Adjust Stock
        </h2>
        <p style={{ fontSize: '.88rem', color: 'var(--tm)', marginBottom: '20px', fontWeight: 600 }}>
          Medicine: {item.name}
        </p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-lbl">Current Quantity</label>
            <input className="finp" value={item.qty} readOnly style={{ background: '#f5f5f5' }} />
          </div>
          <div className="form-group">
            <label className="form-lbl">Adjustment Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="finp"
            >
              <option value="add">➕ Add Stock</option>
              <option value="remove">➖ Remove Stock</option>
              <option value="set">📌 Set Exact Quantity</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-lbl">Quantity</label>
            <input
              type="number"
              min="0"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              className="finp"
              placeholder="Enter quantity"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-lbl">Reason (optional)</label>
            <input
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="finp"
              placeholder="e.g. Damaged batch, stock count"
            />
          </div>
          <button type="submit" className="btn btn-solid form-submit">
            Apply Adjustment
          </button>
        </form>
      </div>
    </div>
  );
}
