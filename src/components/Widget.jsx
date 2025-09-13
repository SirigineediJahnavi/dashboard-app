import React from 'react';
import ChartWidget from './ChartWidget';

const Widget = ({ widget, onRemove }) => {
  const renderWidgetContent = () => {
    if (widget.type === 'chart') {
      return <ChartWidget widget={widget} />;
    }

    return (
      <div style={{
        padding: '16px',
        fontSize: '14px',
        color: '#374151',
        backgroundColor: '#ffffff',
        borderRadius: '6px',
        whiteSpace: 'pre-line',
      }}>
        {widget.content}
      </div>
    );
  };

  return (
    <article style={{
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      backgroundColor: '#ffffff',
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 16px',
        borderBottom: '1px solid #e5e7eb',
        backgroundColor: '#f9fafb',
        borderTopLeftRadius: '8px',
        borderTopRightRadius: '8px',
      }}>
        <h3 style={{
          fontSize: '16px',
          fontWeight: '600',
          color: '#111827',
          margin: 0,
        }}>
          {widget.name}
        </h3>
        <button
          onClick={onRemove}
          title="Remove widget"
          style={{
            background: 'none',
            border: 'none',
            fontSize: '20px',
            color: '#9ca3af',
            cursor: 'pointer',
            padding: '0 8px',
          }}
        >
          ×
        </button>
      </div>

      {renderWidgetContent()}
    </article>
  );
};

export default Widget;
