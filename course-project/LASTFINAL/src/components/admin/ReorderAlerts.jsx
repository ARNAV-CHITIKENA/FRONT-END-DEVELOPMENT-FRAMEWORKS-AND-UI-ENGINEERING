import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

export default function ReorderAlerts() {
  const {
    stock,
    stockStatus,
    setActiveModal,
    setSelectedStockId
  } = useContext(AppContext);

  const alerts = stock.filter(s => s.qty < s.threshold);

  const handleOrderNow = (id) => {
    setSelectedStockId(id);
    setActiveModal('reorder');
  };

  return (
    <div id="panel-reorder" className="panel">
      <div className="panel-header">
        <h2>🔁 Reorder Alerts</h2>
      </div>
      <div id="reorderList">
        {alerts.map(s => {
          const st = stockStatus(s.qty, s.threshold);
          return (
            <div key={s.id} className={`reorder-card ${s.qty === 0 ? 'critical' : ''}`}>
              <div className="reorder-info">
                <h4>
                  {s.name} <span className={`badge ${st.cls}`}>{st.label}</span>
                </h4>
                <p>
                  Current: <b>{s.qty}</b> &nbsp;|&nbsp; Threshold: <b>{s.threshold}</b> &nbsp;|&nbsp; Supplier: {s.supplier}
                </p>
              </div>
              <button className="btn btn-solid btn-sm" onClick={() => handleOrderNow(s.id)}>
                📦 Order Now
              </button>
            </div>
          );
        })}
      </div>
      {alerts.length === 0 && (
        <p id="reorderEmpty" className="empty-note" style={{ display: 'block', padding: '20px' }}>
          ✅ All stock levels are sufficient!
        </p>
      )}
    </div>
  );
}
