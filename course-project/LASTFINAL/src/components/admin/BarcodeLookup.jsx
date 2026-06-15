import { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';

export default function BarcodeLookup() {
  const {
    stock,
    stockStatus,
    fmtDate
  } = useContext(AppContext);

  const [inputVal, setInputVal] = useState('');
  const [result, setResult] = useState(null);
  const [searchTriggered, setSearchTriggered] = useState(false);

  const handleLookup = () => {
    const q = inputVal.toUpperCase().trim();
    if (!q) {
      setResult(null);
      setSearchTriggered(false);
      return;
    }

    const found = stock.find(
      x => x.barcode.toUpperCase() === q || x.id.toString() === q
    );
    setResult(found || null);
    setSearchTriggered(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleLookup();
    }
  };

  return (
    <div id="panel-barcode" className="panel">
      <div className="panel-header">
        <h2>🔍 Barcode Lookup</h2>
      </div>
      <div className="barcode-area">
        <div className="scan-anim">📷</div>
        <h3>Medicine Barcode Lookup</h3>
        <p>Enter a barcode or medicine ID to retrieve full details</p>
        <div className="barcode-input-row">
          <input
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g. BC-001"
          />
          <button className="btn btn-solid btn-sm" onClick={handleLookup}>
            Search
          </button>
        </div>
        <p style={{ fontSize: '.78rem', color: 'var(--tm)', marginBottom: '10px' }}>
          Try: BC-001, BC-002, BC-003
        </p>

        {searchTriggered && (
          result ? (
            <div className="barcode-result">
              <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '12px' }}>
                ✅ {result.name}
              </div>
              <div className="bc-field">
                <span>Barcode</span>
                <span>{result.barcode}</span>
              </div>
              <div className="bc-field">
                <span>Category</span>
                <span>{result.category}</span>
              </div>
              <div className="bc-field">
                <span>Quantity</span>
                <span>{result.qty} units</span>
              </div>
              <div className="bc-field">
                <span>Unit Price</span>
                <span>₹{result.price.toFixed(2)}</span>
              </div>
              <div className="bc-field">
                <span>Expiry</span>
                <span>{fmtDate(result.expiry)}</span>
              </div>
              <div className="bc-field">
                <span>Supplier</span>
                <span>{result.supplier}</span>
              </div>
              <div className="bc-field">
                <span>Status</span>
                <span>
                  <span className={`badge ${stockStatus(result.qty, result.threshold).cls}`}>
                    {stockStatus(result.qty, result.threshold).label}
                  </span>
                </span>
              </div>
            </div>
          ) : (
            <div className="barcode-result not-found">
              <div style={{ textAlign: 'center', padding: '10px' }}>
                <b>❌ No medicine found for "{inputVal}"</b>
                <br />
                <span style={{ fontSize: '.82rem', color: 'var(--tm)' }}>
                  Check the barcode and try again
                </span>
              </div>
            </div>
          )
        )}
      </div>

      <div style={{ marginTop: '24px' }}>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', fontWeight: 700, margin: '0 0 14px' }}>
          All Barcodes
        </h3>
        <div className="table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Barcode</th>
                <th>Drug Name</th>
                <th>Category</th>
                <th>Qty</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {stock.map(s => {
                const st = stockStatus(s.qty, s.threshold);
                return (
                  <tr key={s.id}>
                    <td>
                      <code style={{ fontSize: '.78rem', background: '#f0f0f0', padding: '2px 6px', borderRadius: '4px' }}>
                        {s.barcode}
                      </code>
                    </td>
                    <td>{s.name}</td>
                    <td>{s.category}</td>
                    <td>{s.qty}</td>
                    <td>
                      <span className={`badge ${st.cls}`}>{st.label}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
