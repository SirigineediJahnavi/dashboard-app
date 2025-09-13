import React, { useState } from 'react'

const AddWidgetModal = ({ categories, selectedCategory, onAddWidget, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    content: '',
    categoryId: selectedCategory,
    type: 'text'
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.name.trim() || !formData.categoryId) {
      alert('Please fill in all required fields')
      return
    }

    const newWidget = {
      id: Date.now().toString(),
      name: formData.name.trim(),
      content: formData.content.trim() || 'No content provided',
      type: formData.type
    }

    onAddWidget(formData.categoryId, newWidget)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Add Widget</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Widget Name *</label>
            <input
              type="text"
              name="name"
              className="form-input"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter widget name"
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Category *</label>
            <select
              name="categoryId"
              className="form-select"
              value={formData.categoryId}
              onChange={handleInputChange}
              required
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label className="form-label">Widget Type</label>
            <select
              name="type"
              className="form-select"
              value={formData.type}
              onChange={handleInputChange}
            >
              <option value="text">Text</option>
              <option value="chart">Chart</option>
            </select>
          </div>
          
          <div className="form-group">
            <label className="form-label">Widget Content</label>
            <textarea
              name="content"
              className="form-textarea"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="Enter widget content or description"
              rows="4"
            />
          </div>
          
          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Add Widget
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddWidgetModal
