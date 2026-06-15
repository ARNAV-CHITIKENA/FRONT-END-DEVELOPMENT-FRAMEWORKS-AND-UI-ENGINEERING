import { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';

export default function EditStockModal() {
  const {
    activeModal,
    setActiveModal,
    selectedStockId,
    setSelectedStockId,
    stock,
    addStockItem,
    updateStockItem,
    showToast
  } = useContext(AppContext);

  const isEdit = selectedStockId !== null;

  const [formData, setFormData] = useState(() => {
    if (selectedStockId !== null) {
      const item = stock.find(s => s.id === selectedStockId);
      if (item) {
        return {
          barcode: item.barcode || '',
          category: item.category || 'Analgesic',
          name: item.name || '',
          qty: item.qty !== undefined ? item.qty.toString() : '',
          price: item.price !== undefined ? item.price.toString() : '',
          threshold: item.threshold !== undefined ? item.threshold.toString() : '30',
          expiry: item.expiry || '',
          supplier: item.supplier || ''
        };
      }
    }
    return {
      barcode: '',
      category: 'Analgesic',
      name: '',
      qty: '',
      price: '',
      threshold: '30',
      expiry: '',
      supplier: ''
    };
  });

  if (activeModal !== 'editStock') return null;

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleClose = () => {
    setActiveModal(null);
    setSelectedStockId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      showToast('⚠️ Drug name is required', '#e67e22');
      return;
    }

    if (isEdit) {
      updateStockItem(selectedStockId, formData);
    } else {
      addStockItem(formData);
    }
    handleClose();
  };

  return (
    <div className="inline-modal active" onClick={handleClose}>
      <div className="modal" style={{ maxWidth: '500px' }} onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={handleClose}>✕</button>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', marginBottom: '20px' }}>
          {isEdit ? '✏️ Edit Medicine' : '➕ Add Medicine'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label className="form-lbl">Barcode ID</label>
              <input
                id="barcode"
                value={formData.barcode}
                onChange={handleChange}
                className="finp"
                placeholder={isEdit ? '' : 'BC-XXX (auto if blank)'}
              />
            </div>
            <div className="form-group">
              <label className="form-lbl">Category</label>
              <select
                id="category"
                value={formData.category}
                onChange={handleChange}
                className="finp"
              >
                <option value="Analgesic">Analgesic</option>
                <option value="Antibiotic">Antibiotic</option>
                <option value="Antidiabetic">Antidiabetic</option>
                <option value="Antihypertensive">Antihypertensive</option>
                <option value="Antihistamine">Antihistamine</option>
                <option value="Vitamin">Vitamin</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-lbl">Drug Name *</label>
            <input
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="finp"
              placeholder="e.g. Paracetamol 500mg"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-lbl">Quantity</label>
              <input
                id="qty"
                type="number"
                min="0"
                value={formData.qty}
                onChange={handleChange}
                className="finp"
                placeholder="0"
              />
            </div>
            <div className="form-group">
              <label className="form-lbl">Unit Price (₹)</label>
              <input
                id="price"
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                className="finp"
                placeholder="0.00"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-lbl">Low Stock Threshold</label>
              <input
                id="threshold"
                type="number"
                min="1"
                value={formData.threshold}
                onChange={handleChange}
                className="finp"
                placeholder="30"
              />
            </div>
            <div className="form-group">
              <label className="form-lbl">Expiry Date</label>
              <input
                id="expiry"
                type="date"
                value={formData.expiry}
                onChange={handleChange}
                className="finp"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-lbl">Supplier</label>
            <input
              id="supplier"
              value={formData.supplier}
              onChange={handleChange}
              className="finp"
              placeholder="Supplier name"
            />
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '18px' }}>
            <button type="submit" className="btn btn-solid" style={{ flex: 1 }}>
              {isEdit ? 'Save Changes' : 'Add Medicine'}
            </button>
            <button type="button" className="btn btn-outline" style={{ flex: 1 }} onClick={handleClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
