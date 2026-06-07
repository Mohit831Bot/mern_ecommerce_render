import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { BrowserRouter } from 'react-router'
import { Toaster } from "@/components/ui/sonner"; //  ADD THIS


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
     <Toaster position="top-right" richColors />
  </BrowserRouter>,
)
