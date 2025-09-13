import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addWidget, removeWidget } from './store/dashboardSlice.jsx'
import Header from './components/Header'
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

  // Filter categories and widgets based on search term
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
      <Header />
      
      <div className="container">
        <div className="dashboard-title">
          <h1>CNAPP Dashboard</h1>
          <button 
            className="add-widget-btn"
            onClick={() => openAddWidgetModal()}
          >
            <span>+</span>
            Add Widget
          </button>
        </div>

        {filteredCategories.length === 0 ? (
          <div className="no-results">
            <div className="no-results-icon">🔍</div>
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
