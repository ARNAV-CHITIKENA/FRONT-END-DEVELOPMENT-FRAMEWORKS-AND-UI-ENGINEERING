/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, useCallback, useRef } from 'react';

export const AppContext = createContext();

const ADMIN_CREDS = { username: 'admin', password: 'Admin@123' };

const DEFAULT_STOCK = [
  {id:1,barcode:'BC-001',name:'Paracetamol 500mg',category:'Analgesic',qty:120,price:2.50,threshold:30,expiry:'2025-12-31',supplier:'MediCo'},
  {id:2,barcode:'BC-002',name:'Amoxicillin 250mg',category:'Antibiotic',qty:18,price:12.00,threshold:25,expiry:'2025-08-15',supplier:'PharmaPlus'},
  {id:3,barcode:'BC-003',name:'Metformin 500mg',category:'Antidiabetic',qty:0,price:8.75,threshold:20,expiry:'2026-03-10',supplier:'DiaCare'},
  {id:4,barcode:'BC-004',name:'Amlodipine 5mg',category:'Antihypertensive',qty:55,price:6.40,threshold:15,expiry:'2026-06-20',supplier:'CardiMed'},
  {id:5,barcode:'BC-005',name:'Cetirizine 10mg',category:'Antihistamine',qty:8,price:3.20,threshold:20,expiry:'2025-11-05',supplier:'AllerCo'},
  {id:6,barcode:'BC-006',name:'Vitamin D3 1000IU',category:'Vitamin',qty:200,price:4.10,threshold:40,expiry:'2026-09-30',supplier:'VitaHealth'},
  {id:7,barcode:'BC-007',name:'Ibuprofen 400mg',category:'Analgesic',qty:95,price:3.80,threshold:30,expiry:'2026-01-15',supplier:'MediCo'},
  {id:8,barcode:'BC-008',name:'Azithromycin 500mg',category:'Antibiotic',qty:12,price:22.50,threshold:20,expiry:'2025-09-28',supplier:'PharmaPlus'},
];

const loadLocal = (key, fallback) => {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
};

const saveLocal = (key, val) => {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch {
    // ignore local storage save failures
  }
};

export const AppProvider = ({ children }) => {
  // Core states
  const [stock, setStock] = useState(() => loadLocal('pharma_stock', DEFAULT_STOCK));
  const [orders, setOrders] = useState(() => loadLocal('pharma_orders', []));
  const [dispense, setDispense] = useState(() => loadLocal('pharma_dispense', []));
  const [users, setUsers] = useState(() => loadLocal('pharma_users', []));
  const [nextId, setNextId] = useState(() => loadLocal('pharma_nextId', { stock: 9, order: 1, disp: 1 }));

  // App UI states
  const [currentUser, setCurrentUser] = useState(null);
  const [currentProfile, setCurrentProfile] = useState(null); // stores user profile details if normal user
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'admin' | 'user'
  const [activeModal, setActiveModal] = useState(null); // 'login' | 'signup' | 'forgot' | 'editStock' | 'adjustStock' | 'reorder' | 'dispense' | 'export'
  const [selectedStockId, setSelectedStockId] = useState(null);
  const [notifications, setNotifications] = useState([]);
  
  // Toast state
  const [toast, setToast] = useState({ show: false, message: '', bg: '' });

  // Sync state with local storage
  useEffect(() => {
    saveLocal('pharma_stock', stock);
  }, [stock]);

  useEffect(() => {
    saveLocal('pharma_orders', orders);
  }, [orders]);

  useEffect(() => {
    saveLocal('pharma_dispense', dispense);
  }, [dispense]);

  useEffect(() => {
    saveLocal('pharma_users', users);
  }, [users]);

  useEffect(() => {
    saveLocal('pharma_nextId', nextId);
  }, [nextId]);

  // Toast trigger helper
  const toastTimerRef = useRef(null);
  const showToast = useCallback((message, bg = 'var(--green)') => {
    setToast({ show: true, message, bg });
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 3200);
  }, []);

  // Helper date conversions
  const fmtDate = useCallback((d) => {
    if (!d) return '—';
    const dt = new Date(d);
    if (isNaN(dt)) return d;
    return dt.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  }, []);

  const todayStr = useCallback(() => {
    return new Date().toISOString().split('T')[0];
  }, []);

  const nowStr = useCallback(() => {
    return new Date().toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  }, []);

  const daysUntilExpiry = useCallback((d) => {
    if (!d) return 9999;
    const diff = new Date(d) - new Date();
    return Math.floor(diff / 86400000);
  }, []);

  const stockStatus = useCallback((qty, threshold) => {
    if (qty === 0) return { label: 'Out of Stock', cls: 'danger' };
    if (qty < threshold) return { label: 'Low Stock', cls: 'warn' };
    return { label: 'In Stock', cls: 'ok' };
  }, []);

  // Notifications generator
  const generateNotifications = useCallback(() => {
    const list = [];
    
    // helper to add locally
    const addLocalNotif = (icon, text, time) => {
      list.push({ icon, text, time });
    };

    stock.forEach(s => {
      const days = daysUntilExpiry(s.expiry);
      if (days < 0) {
        addLocalNotif('⚠️', `${s.name} has EXPIRED`, fmtDate(s.expiry));
      } else if (days <= 30) {
        addLocalNotif('📅', `${s.name} expires in ${days} days`, fmtDate(s.expiry));
      }
      if (s.qty === 0) {
        addLocalNotif('🚨', `${s.name} is OUT OF STOCK`, 'Immediate action needed');
      } else if (s.qty < s.threshold) {
        addLocalNotif('📉', `${s.name} is low (${s.qty} left)`, 'Reorder recommended');
      }
    });

    setNotifications(list.slice(0, 20));
  }, [stock, daysUntilExpiry, fmtDate]);

  // Generate on start or stock change
  useEffect(() => {
    const timer = setTimeout(() => {
      generateNotifications();
    }, 0);
    return () => clearTimeout(timer);
  }, [stock, generateNotifications]);

  const addNotif = useCallback((icon, text, time) => {
    setNotifications(prev => {
      const updated = [{ icon, text, time }, ...prev];
      return updated.slice(0, 20);
    });
  }, []);

  const clearNotifs = useCallback(() => {
    setNotifications([]);
    showToast('🧹 Notifications cleared');
  }, [showToast]);

  // Auth operations
  const handleLogin = useCallback((usernameOrEmail, password) => {
    if (!usernameOrEmail || !password) {
      showToast('⚠️ Please fill in all fields', '#e67e22');
      return false;
    }

    // Admin login
    if (usernameOrEmail === ADMIN_CREDS.username && password === ADMIN_CREDS.password) {
      setCurrentUser('Administrator');
      setIsAdmin(true);
      setCurrentProfile(null);
      setCurrentView('admin');
      setActiveModal(null);
      showToast('✅ Welcome, Administrator!');
      return true;
    }

    // Normal user login
    const found = users.find(u => (u.username === usernameOrEmail || u.email === usernameOrEmail) && u.password === password);
    if (found) {
      setCurrentUser(`${found.firstName} ${found.lastName}`);
      setCurrentProfile(found);
      setActiveModal(null);
      if (found.role === 'Admin') {
        setIsAdmin(true);
        setCurrentView('admin');
        showToast(`✅ Welcome, Admin ${found.firstName}!`);
      } else {
        setIsAdmin(false);
        setCurrentView('user');
        showToast(`✅ Welcome, ${found.firstName}!`);
      }
      return true;
    } else {
      showToast('❌ Invalid username or password', '#c0392b');
      return false;
    }
  }, [users, showToast]);

  const handleSignup = useCallback((formData) => {
    const { firstName, lastName, username, email, phone, role, password, confirmPassword } = formData;
    if (!firstName || !lastName || !username || !email || !role || !password || !confirmPassword) {
      showToast('⚠️ Please fill in all fields', '#e67e22');
      return false;
    }
    if (password !== confirmPassword) {
      showToast('❌ Passwords do not match', '#c0392b');
      return false;
    }
    if (password.length < 8) {
      showToast('❌ Password must be at least 8 characters', '#c0392b');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      showToast('❌ Invalid email address', '#c0392b');
      return false;
    }
    if (users.find(u => u.username === username)) {
      showToast('❌ Username already exists', '#c0392b');
      return false;
    }

    const joinedAt = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });
    const newUser = { firstName, lastName, username, email, phone, role, password, joinedAt };
    
    setUsers(prev => [...prev, newUser]);
    setCurrentUser(`${firstName} ${lastName}`);
    setCurrentProfile(newUser);
    setActiveModal(null);

    if (role === 'Admin') {
      setIsAdmin(true);
      setCurrentView('admin');
      showToast(`✅ Welcome, Admin ${firstName}!`);
    } else {
      setIsAdmin(false);
      setCurrentView('user');
      showToast(`✅ Welcome, ${firstName}!`);
    }
    return true;
  }, [users, showToast]);

  const handleReset = useCallback((newPass, confirmPass) => {
    if (!newPass || !confirmPass) {
      showToast('⚠️ Please fill in both fields', '#e67e22');
      return false;
    }
    if (newPass !== confirmPass) {
      showToast('❌ Passwords do not match', '#c0392b');
      return false;
    }
    if (newPass.length < 8) {
      showToast('❌ Password must be at least 8 characters', '#c0392b');
      return false;
    }
    setActiveModal(null);
    showToast('✅ Password updated successfully!');
    return true;
  }, [showToast]);

  const logout = useCallback(() => {
    setCurrentUser(null);
    setCurrentProfile(null);
    setIsAdmin(false);
    setCurrentView('home');
    showToast('👋 Logged out successfully');
  }, [showToast]);

  // Inventory Stock functions
  const addStockItem = useCallback((item) => {
    const nextStockId = nextId.stock;
    const barcode = item.barcode || `BC-${String(nextStockId).padStart(3, '0')}`;
    const newItem = {
      id: nextStockId,
      barcode,
      name: item.name,
      category: item.category,
      qty: parseInt(item.qty) || 0,
      price: parseFloat(item.price) || 0.0,
      threshold: parseInt(item.threshold) || 30,
      expiry: item.expiry,
      supplier: item.supplier
    };

    setStock(prev => [...prev, newItem]);
    setNextId(prev => ({ ...prev, stock: prev.stock + 1 }));
    addNotif('📦', 'New medicine added: ' + item.name, 'Just now');
    showToast('✅ Medicine added to stock!');
  }, [nextId, addNotif, showToast]);

  const updateStockItem = useCallback((id, updatedData) => {
    setStock(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          barcode: updatedData.barcode || item.barcode,
          name: updatedData.name,
          category: updatedData.category,
          qty: parseInt(updatedData.qty) || 0,
          price: parseFloat(updatedData.price) || 0.0,
          threshold: parseInt(updatedData.threshold) || 30,
          expiry: updatedData.expiry,
          supplier: updatedData.supplier
        };
      }
      return item;
    }));
    showToast('✅ Medicine updated!');
  }, [showToast]);

  const deleteStockItem = useCallback((id) => {
    const sItem = stock.find(x => x.id === id);
    if (!sItem) return;
    setStock(prev => prev.filter(item => item.id !== id));
    showToast('🗑️ Medicine removed from stock');
    addNotif('🗑️', `Medicine deleted: ${sItem.name}`, 'Just now');
  }, [stock, showToast, addNotif]);

  // Adjust stock
  const adjustStock = useCallback((id, type, qty, reason) => {
    let oldQty = 0;
    let newQty = 0;
    let drugName = '';

    setStock(prev => prev.map(item => {
      if (item.id === id) {
        oldQty = item.qty;
        drugName = item.name;
        if (type === 'add') newQty = oldQty + qty;
        else if (type === 'remove') newQty = Math.max(0, oldQty - qty);
        else if (type === 'set') newQty = qty;
        return { ...item, qty: newQty };
      }
      return item;
    }));

    addNotif('⚖️', `Stock adjusted: ${drugName} — ${oldQty} → ${newQty}${reason ? ' (' + reason + ')' : ''}`, 'Just now');
    showToast(`✅ Stock updated: ${oldQty} → ${newQty}`);
  }, [addNotif, showToast]);

  // Orders functions
  const submitReorder = useCallback((stockId, orderQty, supplier, notes) => {
    const sItem = stock.find(x => x.id === stockId);
    if (!sItem) return;

    const ordId = `#ORD-${String(nextId.order).padStart(3, '0')}`;
    const newOrder = {
      id: nextId.order,
      orderId: ordId,
      supplier: supplier || sItem.supplier,
      drug: sItem.name,
      qty: orderQty,
      date: todayStr(),
      status: 'Pending',
      notes: notes || ''
    };

    setOrders(prev => [...prev, newOrder]);
    setNextId(prev => ({ ...prev, order: prev.order + 1 }));
    addNotif('📦', `Reorder placed: ${sItem.name} (${orderQty} units)`, 'Just now');
    showToast(`✅ Order ${ordId} placed for ${sItem.name}`);
  }, [stock, nextId, todayStr, addNotif, showToast]);

  const addSupplierOrder = useCallback((order) => {
    const ordId = order.orderId || `#ORD-${String(nextId.order).padStart(3, '0')}`;
    const newOrder = {
      id: nextId.order,
      orderId: ordId,
      supplier: order.supplier,
      drug: order.drug,
      qty: parseInt(order.qty) || 0,
      date: order.date || todayStr(),
      status: 'Pending'
    };

    setOrders(prev => [...prev, newOrder]);
    setNextId(prev => ({ ...prev, order: prev.order + 1 }));
    showToast('✅ Order added!');
  }, [nextId, todayStr, showToast]);

  const updateOrderStatus = useCallback((id, status) => {
    setOrders(prev => prev.map(o => {
      if (o.id === id) {
        showToast(`✅ Order ${o.orderId} → ${status}`);
        return { ...o, status };
      }
      return o;
    }));
  }, [showToast]);

  const deleteOrder = useCallback((id) => {
    setOrders(prev => prev.filter(o => o.id !== id));
    showToast('🗑️ Order deleted');
  }, [showToast]);

  // Dispense operations
  const submitDispense = useCallback((drugId, customer, qty, rx, notes, phone, age, gender) => {
    let success = false;
    
    setStock(prev => {
      const target = prev.find(x => x.id === drugId);
      if (!target) return prev;
      
      if (qty > target.qty) {
        showToast(`❌ Insufficient stock! Available: ${target.qty}`, '#c0392b');
        return prev;
      }
      
      success = true;
      return prev.map(x => {
        if (x.id === drugId) {
          return { ...x, qty: x.qty - qty };
        }
        return x;
      });
    });

    if (success) {
      const selectedDrug = stock.find(x => x.id === drugId);
      const newDispense = {
        id: nextId.disp,
        date: nowStr(),
        drug: selectedDrug.name,
        customer,
        phone,
        age,
        gender,
        qty,
        rx: rx || '-',
        by: currentUser || 'Admin',
        notes
      };

      setDispense(prev => [newDispense, ...prev]);
      setNextId(prev => ({ ...prev, disp: prev.disp + 1 }));
      addNotif('💊', `Dispensed ${qty}× ${selectedDrug.name} to ${customer}`, 'Just now');
      showToast(`✅ Dispensed ${qty} × ${selectedDrug.name} to ${customer}`);
      return true;
    }
    return false;
  }, [stock, nextId, currentUser, nowStr, addNotif, showToast]);

  const deleteUser = useCallback((index) => {
    setUsers(prev => prev.filter((_, i) => i !== index));
    showToast('🗑️ User deleted');
  }, [showToast]);

  return (
    <AppContext.Provider value={{
      stock, orders, dispense, users, nextId,
      currentUser, currentProfile, isAdmin, currentView, activeModal, selectedStockId, notifications, toast,
      setCurrentView, setActiveModal, setSelectedStockId,
      showToast, fmtDate, todayStr, nowStr, daysUntilExpiry, stockStatus,
      clearNotifs, handleLogin, handleSignup, handleReset, logout,
      addStockItem, updateStockItem, deleteStockItem, adjustStock,
      submitReorder, addSupplierOrder, updateOrderStatus, deleteOrder,
      submitDispense, deleteUser
    }}>
      {children}
    </AppContext.Provider>
  );
};
