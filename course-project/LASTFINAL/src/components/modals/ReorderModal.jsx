import { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';

export default function ReorderModal() {
  const {
    activeModal,
    setActiveModal,
    selectedStockId,
    setSelectedStockId,
    stock,
    submitReorder,
    showToast
  } = useContext(AppContext);

  const item = selectedStockId !== null ? stock.find(s => s.id === selectedStockId) : null;

  const [qty, setQty] = useState('');
  const [supplier, setSupplier] = useState(() => (item ? item.supplier || '' : ''));
  const [notes, setNotes] = useState('');

  if (activeModal !== 'reorder' || !item) return null;

  const handleClose = () => {
    setActiveModal(null);
    setSelectedStockId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsedQty = parseInt(qty);
    if (isNaN(parsedQty) || parsedQty < 1) {
      showToast('⚠️ Enter a valid quantity', '#e67e22');
      return;
    }
    if (!supplier.trim()) {
      showToast('⚠️ Enter supplier name', '#e67e22');
      return;
    }

    submitReorder(item.id, parsedQty, supplier.trim(), notes.trim());
    handleClose();
  };

  return (
    <div className="inline-modal active" onClick={handleClose}>
      <div className="modal" style={{ maxWidth: '480px' }} onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={handleClose}>✕</button>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', marginBottom: '6px' }}>
          📦 Place Reorder
        </h2>
        <p style={{ fontSize: '.85rem', color: 'var(--tm)', marginBottom: '20px' }}>
          Fill in the order details below
        </p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-lbl">Drug Name</label>
            <input className="finp" value={item.name} readOnly style={{ background: '#f5f5f5' }} />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-lbl">Current Stock</label>
              <input className="finp" value={item.qty} readOnly style={{ background: '#f5f5f5' }} />
            </div>
            <div className="form-group">
              <label className="form-lbl">Order Quantity</label>
              <input
                type="number"
                min="1"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                className="finp"
                placeholder="e.g. 100"
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label className="form-lbl">Supplier</label>
            <input
              value={supplier}
              onChange={(e) => setSupplier(e.target.value)}
              className="finp"
              placeholder="Supplier name"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-lbl">Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="finp"
              rows="2"
              placeholder="Any special instructions..."
            />
          </div>
          <button type="submit" className="btn btn-solid form-submit">
            Submit Order
          </button>
        </form>
      </div>
    </div>
  );
}
