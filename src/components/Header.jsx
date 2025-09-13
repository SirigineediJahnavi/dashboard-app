import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchTerm } from '../store/dashboardSlice';

const Header = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.dashboard.searchTerm);

  const handleSearchChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  return (
    <header style={{ backgroundColor: '#aabfd5ff', padding: '16px 0', borderBottom: '1px solid #e5e7eb' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div style={{ display: 'flex', gap: '8px', color: '#6b7280', fontSize: '14px' }}>
            <span>Home</span>
            <span>-</span>
            <span>Dashboard V2</span>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
          <input
            type="text"
            placeholder="Search anything..."
            value={searchTerm}
            onChange={handleSearchChange}
            style={{
              flex: '1',
              padding: '8px 12px',
              borderRadius: '6px',
              border: '1px solid #d1d5db',
              fontSize: '14px',
              outline: 'none',
            }}
          />

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', color: '#4b5563' }}>
            <span>🕐</span>
            <span>Last 2 days</span>
            <span>▼</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
