import React from 'react';
import Widget from './Widget';

const Category = ({ category, onAddWidget, onRemoveWidget }) => {
  return (
    <section style={{ marginBottom: '32px' }}>
      <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px', color: '#1f2937' }}>
        {category.name}
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '16px',
      }}>
        {category.widgets.map((widget) => (
          <Widget
            key={widget.id}
            widget={widget}
            onRemove={() => onRemoveWidget(category.id, widget.id)}
          />
        ))}

        <div
          onClick={onAddWidget}
          style={{
            minHeight: '200px',
            border: '2px dashed #d1d5db',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            backgroundColor: '#99a0a9ff'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#3b82f6';
            e.currentTarget.style.backgroundColor = '#b6c9e7ff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#d1d5db';
            e.currentTarget.style.backgroundColor = '#f9fafb';
          }}
        >
          <div style={{ fontSize: '32px', color: '#9ca3af', marginBottom: '8px' }}>+</div>
          <span style={{ color: '#4b5563', fontWeight: '500' }}>Add Widget</span>
        </div>
      </div>
    </section>
  );
};

export default Category;
