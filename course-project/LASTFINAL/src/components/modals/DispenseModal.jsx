import { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';

export default function DispenseModal() {
  const {
    activeModal,
    setActiveModal,
    stock,
    dispense,
    submitDispense,
    showToast
  } = useContext(AppContext);

  const [drugId, setDrugId] = useState('');
  const [qty, setQty] = useState('');
  const [rx, setRx] = useState(() => 'RX-' + String(dispense.length + 1).padStart(5, '0'));
  
  const [customer, setCustomer] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [notes, setNotes] = useState('');

  const selectedDrug = drugId ? stock.find(s => s.id === parseInt(drugId)) : null;
  const availStock = selectedDrug ? `${selectedDrug.qty} units` : '';

  if (activeModal !== 'dispense') return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const targetId = parseInt(drugId);
    const parsedQty = parseInt(qty);

    if (isNaN(targetId)) {
      showToast('⚠️ Select a medicine', '#e67e22');
      return;
    }
    if (!customer.trim()) {
      showToast('⚠️ Enter customer name', '#e67e22');
      return;
    }
    if (isNaN(parsedQty) || parsedQty < 1) {
      showToast('⚠️ Enter valid quantity', '#e67e22');
      return;
    }

    const selectedItem = stock.find(s => s.id === targetId);
    if (selectedItem && parsedQty > selectedItem.qty) {
      showToast(`❌ Insufficient stock! Available: ${selectedItem.qty}`, '#c0392b');
      return;
    }

    const success = submitDispense(
      targetId,
      customer.trim(),
      parsedQty,
      rx.trim(),
      notes.trim(),
      phone.trim(),
      age.trim(),
      gender
    );

    if (success) {
      setActiveModal(null);
    }
  };

  return (
    <div className="inline-modal active" onClick={() => setActiveModal(null)}>
      <div className="modal" style={{ maxWidth: '520px' }} onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={() => setActiveModal(null)}>✕</button>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', marginBottom: '4px' }}>
          💊 Dispense Medicine
        </h2>
        <p style={{ fontSize: '.85rem', color: 'var(--tm)', marginBottom: '18px' }}>
          Record medicine dispensing to a customer
        </p>

        <form onSubmit={handleSubmit}>
          <p style={{ fontSize: '.78rem', fontWeight: 700, color: 'var(--green)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: '8px' }}>
            Medicine Details
          </p>
          <div className="form-group">
            <label className="form-lbl">Select Medicine</label>
            <select
              value={drugId}
              onChange={(e) => setDrugId(e.target.value)}
              className="finp"
              required
            >
              <option value="">-- Select --</option>
              {stock.filter(s => s.qty > 0).map(s => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.qty} left)
                </option>
              ))}
            </select>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-lbl">Available Stock</label>
              <input
                value={availStock}
                className="finp"
                readOnly
                style={{ background: '#f0f7f1', fontWeight: 600, color: 'var(--green)' }}
              />
            </div>
            <div className="form-group">
              <label className="form-lbl">Quantity to Dispense</label>
              <input
                type="number"
                min="1"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                className="finp"
                placeholder="Qty"
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label className="form-lbl">Prescription No.</label>
            <input
              value={rx}
              onChange={(e) => setRx(e.target.value)}
              className="finp"
              placeholder="RX-00001"
            />
          </div>

          <p style={{ fontSize: '.78rem', fontWeight: 700, color: 'var(--green)', textTransform: 'uppercase', letterSpacing: '.06em', margin: '14px 0 8px' }}>
            Customer / Patient Details
          </p>
          <div className="form-group">
            <label className="form-lbl">Full Name *</label>
            <input
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
              className="finp"
              placeholder="Patient or customer name"
              required
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-lbl">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="finp"
                placeholder="+91 XXXXX XXXXX"
              />
            </div>
            <div className="form-group">
              <label className="form-lbl">Age</label>
              <input
                type="number"
                min="0"
                max="130"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="finp"
                placeholder="Years"
              />
            </div>
          </div>
          <div className="form-group">
            <label className="form-lbl">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="finp"
            >
              <option value="">— Select —</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-lbl">Notes / Diagnosis</label>
            <input
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="finp"
              placeholder="Optional notes or diagnosis code"
            />
          </div>
          <button type="submit" className="btn btn-solid form-submit">
            ✅ Confirm Dispense
          </button>
        </form>
      </div>
    </div>
  );
}
