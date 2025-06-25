import { createContext, useContext, useState } from 'react'

const NotificationContext = createContext()

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([])

  const addNotification = (message, type = 'info', duration = 5000) => {
    const id = Date.now()
    const notification = {
      id,
      message,
      type,
      duration
    }

    setNotifications(prev => [...prev, notification])

    // Auto remove notification after duration
    setTimeout(() => {
      removeNotification(id)
    }, duration)

    return id
  }

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }

  const clearNotifications = () => {
    setNotifications([])
  }

  const success = (message, duration) => addNotification(message, 'success', duration)
  const error = (message, duration) => addNotification(message, 'error', duration)
  const warning = (message, duration) => addNotification(message, 'warning', duration)
  const info = (message, duration) => addNotification(message, 'info', duration)

  const value = {
    notifications,
    addNotification,
    removeNotification,
    clearNotifications,
    success,
    error,
    warning,
    info
  }

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotification() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider')
  }
  return context
} 