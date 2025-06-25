'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Calendar, X } from 'lucide-react'

interface DateEntry {
  date: string
  type: 'task' | 'leave'
  content: string
}

export default function TimesheetsComponent() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalType, setModalType] = useState<'task' | 'leave'>('task')
  const [taskContent, setTaskContent] = useState('')
  const [leaveReason, setLeaveReason] = useState('')
  const [entries, setEntries] = useState<DateEntry[]>([])

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    
    // Add all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i))
    }
    
    return days
  }

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0]
  }

  const getDateStatus = (date: Date) => {
    const dateStr = formatDate(date)
    const entry = entries.find(e => e.date === dateStr)
    return entry
  }

  const handleDateClick = (date: Date) => {
    const dateStr = formatDate(date)
    setSelectedDate(dateStr)
    setIsModalOpen(true)
  }

  const handleSubmit = () => {
    if (!selectedDate) return

    const newEntry: DateEntry = {
      date: selectedDate,
      type: modalType,
      content: modalType === 'task' ? taskContent : leaveReason
    }

    // Remove existing entry for this date if it exists
    const filteredEntries = entries.filter(e => e.date !== selectedDate)
    setEntries([...filteredEntries, newEntry])

    // Reset form
    setTaskContent('')
    setLeaveReason('')
    setIsModalOpen(false)
    setSelectedDate(null)
  }

  const handleCancel = () => {
    setTaskContent('')
    setLeaveReason('')
    setIsModalOpen(false)
    setSelectedDate(null)
  }

  const openModal = (type: 'task' | 'leave') => {
    setModalType(type)
    setIsModalOpen(true)
  }

  const days = getDaysInMonth(currentDate)
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setCurrentDate(new Date())}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Today
          </button>
          <button
            onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 mb-6">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="p-3 text-center text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}
        
        {days.map((day, index) => {
          if (!day) {
            return <div key={index} className="p-3" />
          }
          
          const isToday = formatDate(day) === formatDate(new Date())
          const entry = getDateStatus(day)
          const isPast = day < new Date(new Date().setHours(0, 0, 0, 0))
          
          let bgColor = 'bg-white'
          let textColor = 'text-gray-900'
          let borderColor = 'border-gray-200'
          
          if (entry) {
            if (entry.type === 'task') {
              bgColor = 'bg-green-100'
              borderColor = 'border-green-300'
              textColor = 'text-green-800'
            } else {
              bgColor = 'bg-red-100'
              borderColor = 'border-red-300'
              textColor = 'text-red-800'
            }
          } else if (isToday) {
            bgColor = 'bg-blue-100'
            borderColor = 'border-blue-300'
            textColor = 'text-blue-800'
          }
          
          return (
            <button
              key={index}
              onClick={() => handleDateClick(day)}
              disabled={!isPast}
              className={`
                p-3 h-16 border rounded-lg transition-all duration-200
                ${bgColor} ${borderColor} ${textColor}
                ${isPast ? 'hover:bg-gray-50 cursor-pointer' : 'opacity-50 cursor-not-allowed'}
                ${entry ? 'font-medium' : ''}
              `}
            >
              <div className="text-sm">{day.getDate()}</div>
              {entry && (
                <div className="text-xs mt-1 truncate">
                  {entry.type === 'task' ? '✓ Task' : '🏖️ Leave'}
                </div>
              )}
            </button>
          )
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center space-x-6 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
          <span>Task Completed</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-red-100 border border-red-300 rounded"></div>
          <span>Leave Applied</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-100 border border-blue-300 rounded"></div>
          <span>Today</span>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedDate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">
                {modalType === 'task' ? 'Add Task' : 'Apply for Leave'}
              </h3>
              <button
                onClick={handleCancel}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">
                Date: {new Date(selectedDate).toLocaleDateString()}
              </p>
            </div>

            {modalType === 'task' ? (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What are you working on?
                </label>
                <textarea
                  value={taskContent}
                  onChange={(e) => setTaskContent(e.target.value)}
                  placeholder="Describe your current task..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={4}
                />
              </div>
            ) : (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for leave
                </label>
                <textarea
                  value={leaveReason}
                  onChange={(e) => setLeaveReason(e.target.value)}
                  placeholder="Enter the reason for your leave..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={4}
                />
              </div>
            )}

            <div className="flex space-x-3">
              <button
                onClick={handleSubmit}
                disabled={modalType === 'task' ? !taskContent.trim() : !leaveReason.trim()}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Submit
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Action Buttons */}
      <div className="mt-6 flex space-x-4">
        <button
          onClick={() => openModal('task')}
          className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          <Calendar className="w-4 h-4" />
          <span>Add Task</span>
        </button>
        <button
          onClick={() => openModal('leave')}
          className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          <Calendar className="w-4 h-4" />
          <span>Apply Leave</span>
        </button>
      </div>
    </div>
  )
} 