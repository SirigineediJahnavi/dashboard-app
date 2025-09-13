import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addWidget, removeWidget, setSearchTerm } from './store/dashboardSlice.jsx'
import { FiRefreshCw } from 'react-icons/fi'
import { BsThreeDotsVertical } from 'react-icons/bs'
import Category from './components/Category'
import AddWidgetModal from './components/AddWidgetModal'

function App() {
  const dispatch = useDispatch()
  const { categories, searchTerm } = useSelector((state) => state.dashboard)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('')

  const handleAddWidget = (categoryId, widgetData) => {
    dispatch(addWidget({ categoryId, widget: widgetData }))
    setIsModalOpen(false)
    setSelectedCategory('')
  }

  const handleRemoveWidget = (categoryId, widgetId) => {
    dispatch(removeWidget({ categoryId, widgetId }))
  }

  const openAddWidgetModal = (categoryId = '') => {
    setSelectedCategory(categoryId)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedCategory('')
  }

  const handleSearchChange = (e) => {
    dispatch(setSearchTerm(e.target.value))
  }

  const handleRefresh = () => {
    console.log('Dashboard refreshed')
    // Add your refresh logic here
  }

  const handleMenuClick = () => {
    console.log('Menu clicked')
    // Add your menu logic here
  }

  const filteredCategories = categories.map(category => ({
    ...category,
    widgets: category.widgets.filter(widget =>
      widget.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      widget.content.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.widgets.length > 0
  )

  return (
    <div className="app">
      <div className="header-bar" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px',
        backgroundColor: '#aabfd5ff',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '600' }}>CNAPP Dashboard</h1>

        <input
          type="text"
          placeholder="Search anything..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={{
            flex: '1',
            margin: '0 16px',
            padding: '8px 12px',
            borderRadius: '6px',
            border: '1px solid #d1d5db',
            fontSize: '14px',
            outline: 'none',
            maxWidth: '400px'
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <FiRefreshCw
            onClick={handleRefresh}
            style={{ cursor: 'pointer' }}
            title="Refresh"
            size={20}
          />
          <BsThreeDotsVertical
            onClick={handleMenuClick}
            style={{ cursor: 'pointer' }}
            title="More options"
            size={20}
          />
        </div>
      </div>

      <div className="container" style={{ padding: '16px' }}>
        <div className="dashboard-title" style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
          <button
            className="add-widget-btn"
            onClick={() => openAddWidgetModal()}
            style={{
              padding: '8px 12px',
              borderRadius: '6px',
              backgroundColor: '#2563eb',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            <span style={{ marginRight: '6px' }}>+</span>
            Add Widget
          </button>
        </div>

        {filteredCategories.length === 0 ? (
          <div className="no-results" style={{ textAlign: 'center', marginTop: '40px' }}>
            <div className="no-results-icon" style={{ fontSize: '32px' }}>🔍</div>
            <p>No widgets found matching your search.</p>
          </div>
        ) : (
          filteredCategories.map((category) => (
            <Category
              key={category.id}
              category={category}
              onAddWidget={() => openAddWidgetModal(category.id)}
              onRemoveWidget={handleRemoveWidget}
            />
          ))
        )}

        {isModalOpen && (
          <AddWidgetModal
            categories={categories}
            selectedCategory={selectedCategory}
            onAddWidget={handleAddWidget}
            onClose={closeModal}
          />
        )}
      </div>
    </div>
  )
}

export default App
