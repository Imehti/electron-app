import './assets/main.css'
import { ToastContainer, toast } from 'react-toastify'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router'
import App from './App'
import { Provider } from 'react-redux'
import { store } from './store'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <ToastContainer />
        <App />
      </Provider>
    </HashRouter>
  </React.StrictMode>
)
