import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

/**
 * Entry point of the React application.
 * 
 * Wraps the <App /> in React StrictMode for highlighting potential problems.
 * Also wraps it in <AuthProvider> to provide authentication state throughout the app.
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
)
