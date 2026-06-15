import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

export default function ManageUsers() {
  const {
    users,
    deleteUser
  } = useContext(AppContext);

  const handleDelete = (index) => {
    if (window.confirm('Delete this user?')) {
      deleteUser(index);
    }
  };

  return (
    <div id="panel-users" className="panel">
      <div className="panel-header">
        <h2>👥 Manage Users</h2>
      </div>
      <div className="table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Joined</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={i}>
                <td>{u.firstName} {u.lastName}</td>
                <td>@{u.username}</td>
                <td>{u.email}</td>
                <td>{u.phone || '—'}</td>
                <td>
                  <span className={`badge ${u.role === 'Admin' ? 'purple' : 'blue'}`}>
                    {u.role}
                  </span>
                </td>
                <td style={{ fontSize: '.82rem', color: 'var(--tm)' }}>
                  {u.joinedAt || '—'}
                </td>
                <td>
                  <button className="tbl-btn del" onClick={() => handleDelete(i)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {users.length === 0 && (
          <p className="empty-note" id="noUsers" style={{ display: 'block', padding: '20px' }}>
            No registered users yet.
          </p>
        )}
      </div>
    </div>
  );
}
