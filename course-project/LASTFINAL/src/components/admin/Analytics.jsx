import { useContext, useEffect, useRef } from 'react';
import { AppContext } from '../../context/AppContext';
import Chart from 'chart.js/auto';

export default function Analytics() {
  const {
    stock,
    dispense,
    daysUntilExpiry
  } = useContext(AppContext);

  const categoryChartRef = useRef(null);
  const statusChartRef = useRef(null);
  const dispenseChartRef = useRef(null);
  const topChartRef = useRef(null);

  const chartInstances = useRef({});

  // Calculations
  const totalValue = stock.reduce((a, s) => a + s.qty * s.price, 0);
  const lowCount = stock.filter(s => s.qty > 0 && s.qty < s.threshold).length;
  const outCount = stock.filter(s => s.qty === 0).length;
  const expiringCount = stock.filter(s => {
    const d = daysUntilExpiry(s.expiry);
    return d >= 0 && d <= 30;
  }).length;
  const totalDispenses = dispense.length;

  useEffect(() => {
    // Destroy previous charts
    Object.values(chartInstances.current).forEach(c => {
      try {
        c.destroy();
      } catch {
        // ignore errors if chart instance cannot be destroyed
      }
    });
    chartInstances.current = {};

    // 1. Category Chart
    const cats = {};
    stock.forEach(s => {
      cats[s.category] = (cats[s.category] || 0) + s.qty;
    });

    if (categoryChartRef.current) {
      chartInstances.current.category = new Chart(categoryChartRef.current, {
        type: 'bar',
        data: {
          labels: Object.keys(cats),
          datasets: [
            {
              label: 'Qty',
              data: Object.values(cats),
              backgroundColor: 'rgba(58,125,68,.7)',
              borderRadius: 6
            }
          ]
        },
        options: {
          plugins: { legend: { display: false } },
          scales: { y: { beginAtZero: true } },
          responsive: true,
          maintainAspectRatio: false
        }
      });
    }

    // 2. Status Doughnut Chart
    const inStock = stock.filter(s => s.qty >= s.threshold).length;
    const low = stock.filter(s => s.qty > 0 && s.qty < s.threshold).length;
    const out = stock.filter(s => s.qty === 0).length;

    if (statusChartRef.current) {
      chartInstances.current.status = new Chart(statusChartRef.current, {
        type: 'doughnut',
        data: {
          labels: ['In Stock', 'Low Stock', 'Out of Stock'],
          datasets: [
            {
              data: [inStock, low, out],
              backgroundColor: ['#3a7d44', '#f0ad00', '#c0392b'],
              borderWidth: 0
            }
          ]
        },
        options: {
          plugins: { legend: { position: 'bottom' } },
          responsive: true,
          maintainAspectRatio: false
        }
      });
    }

    // 3. Monthly Dispense Trend (last 6 months)
    const months = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      months.push({
        label: d.toLocaleString('en-IN', { month: 'short' }),
        month: d.getMonth(),
        year: d.getFullYear()
      });
    }

    const monthCounts = months.map(m =>
      dispense
        .filter(d => {
          const dt = new Date(d.date);
          return dt.getMonth() === m.month && dt.getFullYear() === m.year;
        })
        .reduce((a, d) => a + d.qty, 0)
    );

    if (dispenseChartRef.current) {
      chartInstances.current.dispense = new Chart(dispenseChartRef.current, {
        type: 'line',
        data: {
          labels: months.map(m => m.label),
          datasets: [
            {
              label: 'Units Dispensed',
              data: monthCounts,
              borderColor: '#3a7d44',
              backgroundColor: 'rgba(58,125,68,0.12)',
              fill: true,
              tension: 0.4,
              pointRadius: 5,
              pointBackgroundColor: '#3a7d44'
            }
          ]
        },
        options: {
          plugins: { legend: { display: false } },
          scales: { y: { beginAtZero: true } },
          responsive: true,
          maintainAspectRatio: false
        }
      });
    }

    // 4. Top 5 Dispensed Medicines
    const drugMap = {};
    dispense.forEach(d => {
      drugMap[d.drug] = (drugMap[d.drug] || 0) + d.qty;
    });
    const top5 = Object.entries(drugMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    if (topChartRef.current) {
      chartInstances.current.top = new Chart(topChartRef.current, {
        type: 'bar',
        data: {
          labels: top5.map(x => x[0]),
          datasets: [
            {
              label: 'Units',
              data: top5.map(x => x[1]),
              backgroundColor: ['#3a7d44', '#5aaa66', '#a3722e', '#3b82f6', '#f0ad00'],
              borderRadius: 8
            }
          ]
        },
        options: {
          indexAxis: 'y',
          plugins: { legend: { display: false } },
          scales: { x: { beginAtZero: true } },
          responsive: true,
          maintainAspectRatio: false
        }
      });
    }

    // Cleanup on unmount
    return () => {
      Object.values(chartInstances.current).forEach(c => {
        try {
          c.destroy();
        } catch {
          // ignore errors on cleanup unmount
        }
      });
    };
  }, [stock, dispense, daysUntilExpiry]);

  return (
    <div id="panel-analytics" className="panel">
      <div className="panel-header">
        <h2>📊 Analytics</h2>
      </div>
      <div className="analytics-grid" id="analyticsCards">
        <div className="stat-card">
          <div className="stat-num">{stock.length}</div>
          <div className="stat-lbl">Total Medicines</div>
        </div>
        <div className="stat-card blue">
          <div className="stat-num">
            ₹{totalValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
          </div>
          <div className="stat-lbl">Stock Value</div>
        </div>
        <div className="stat-card warn">
          <div className="stat-num">{lowCount}</div>
          <div className="stat-lbl">Low Stock Items</div>
        </div>
        <div className="stat-card danger">
          <div className="stat-num">{outCount}</div>
          <div className="stat-lbl">Out of Stock</div>
        </div>
        <div className="stat-card warn">
          <div className="stat-num">{expiringCount}</div>
          <div className="stat-lbl">Expiring &le;30 Days</div>
        </div>
        <div className="stat-card">
          <div className="stat-num">{totalDispenses}</div>
          <div className="stat-lbl">Total Dispenses</div>
        </div>
      </div>

      <div className="charts-row">
        <div className="chart-box">
          <h3>Stock by Category</h3>
          <div style={{ position: 'relative', height: '220px' }}>
            <canvas ref={categoryChartRef}></canvas>
          </div>
        </div>
        <div className="chart-box">
          <h3>Stock Status Distribution</h3>
          <div style={{ position: 'relative', height: '220px' }}>
            <canvas ref={statusChartRef}></canvas>
          </div>
        </div>
      </div>

      <div className="chart-box">
        <h3>Monthly Dispense Trend</h3>
        <div style={{ position: 'relative', height: '160px' }}>
          <canvas ref={dispenseChartRef}></canvas>
        </div>
      </div>

      <div className="chart-box">
        <h3>Top 5 Dispensed Medicines</h3>
        <div style={{ position: 'relative', height: '180px' }}>
          <canvas ref={topChartRef}></canvas>
        </div>
      </div>
    </div>
  );
}
