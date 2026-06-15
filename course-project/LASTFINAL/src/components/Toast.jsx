import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function Toast() {
  const { toast } = useContext(AppContext);

  return (
    <div
      className={`toast ${toast.show ? 'show' : ''}`}
      style={{ background: toast.bg }}
    >
      {toast.message}
    </div>
  );
}
