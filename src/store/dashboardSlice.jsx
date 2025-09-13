import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  searchTerm: '',
  categories: [
    {
      id: 'cspm',
      name: 'CSPM Executive Dashboard',
      widgets: [
        {
          id: 'cloud-accounts',
          name: 'Cloud Accounts',
          content: 'Connected (2)\nNot Connected (2)\nTotal: 2',
          type: 'text'
        },
        {
          id: 'cloud-risk-assessment',
          name: 'Cloud Account Risk Assessment',
          content: 'Failed (1689)\nWarning (681)\nNot available (36)\nPassed (7253)\nTotal: 9659',
          type: 'text'
        }
      ]
    },
    {
      id: 'cwpp',
      name: 'CWPP Dashboard',
      widgets: [
        {
          id: 'namespace-alerts',
          name: 'Top 5 Namespace Specific Alerts',
          content: 'No Graph data available!',
          type: 'chart'
        },
        {
          id: 'workload-alerts',
          name: 'Workload Alerts',
          content: 'No Graph data available!',
          type: 'chart'
        }
      ]
    },
    {
      id: 'registry',
      name: 'Registry Scan',
      widgets: [
        {
          id: 'image-risk-assessment',
          name: 'Image Risk Assessment',
          content: '1470 Total Vulnerabilities\nCritical: 9\nHigh: 150\nMedium: 800\nLow: 511',
          type: 'text'
        },
        {
          id: 'image-security-issues',
          name: 'Image Security Issues',
          content: '2 Total Images\nCritical: 2\nHigh: 2\nMedium: 0\nLow: 0',
          type: 'text'
        }
      ]
    }
  ]
}

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    addWidget: (state, action) => {
      const { categoryId, widget } = action.payload
      const category = state.categories.find(cat => cat.id === categoryId)
      if (category) {
        category.widgets.push(widget)
      }
    },
    removeWidget: (state, action) => {
      const { categoryId, widgetId } = action.payload
      const category = state.categories.find(cat => cat.id === categoryId)
      if (category) {
        category.widgets = category.widgets.filter(widget => widget.id !== widgetId)
      }
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload
    }
  },
})

export const { addWidget, removeWidget, setSearchTerm } = dashboardSlice.actions

export default dashboardSlice.reducer
