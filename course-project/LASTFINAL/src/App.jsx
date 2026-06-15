import { useContext } from 'react';
import { AppProvider, AppContext } from './context/AppContext';

// Import views
import LandingView from './components/LandingView';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';

// Import modals & alerts
import LoginModal from './components/modals/LoginModal';
import SignupModal from './components/modals/SignupModal';
import ForgotModal from './components/modals/ForgotModal';
import EditStockModal from './components/modals/EditStockModal';
import AdjustStockModal from './components/modals/AdjustStockModal';
import ReorderModal from './components/modals/ReorderModal';
import DispenseModal from './components/modals/DispenseModal';
import ExportModal from './components/modals/ExportModal';
import Toast from './components/Toast';

import './index.css';

function AppContent() {
  const { currentView, activeModal } = useContext(AppContext);

  return (
    <>
      {/* Dynamic backgrounds */}
      <div className="bg-layer"></div>
      <div className="bg-circles">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Page Views routing */}
      {currentView === 'home' && <LandingView />}
      {currentView === 'admin' && <AdminDashboard />}
      {currentView === 'user' && <UserDashboard />}

      {/* Global Modals */}
      {activeModal === 'login' && <LoginModal />}
      {activeModal === 'signup' && <SignupModal />}
      {activeModal === 'forgot' && <ForgotModal />}
      {activeModal === 'editStock' && <EditStockModal />}
      {activeModal === 'adjustStock' && <AdjustStockModal />}
      {activeModal === 'reorder' && <ReorderModal />}
      {activeModal === 'dispense' && <DispenseModal />}
      {activeModal === 'export' && <ExportModal />}

      {/* Toast Alert */}
      <Toast />
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
