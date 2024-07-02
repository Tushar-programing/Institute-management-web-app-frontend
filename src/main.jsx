import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import AdminLayout from './outlet.jsx'
import './index.css'

import { createBrowserRouter, Outlet } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'

import Login from './pages/login.jsx'
import Signup from './pages/signup.jsx'

import Admin from './pages/adminDashboard.jsx'
import StudentReg from './pages/studentReg.jsx'

import store from './store/store.js'
import { Provider } from "react-redux"



const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
      {
        path: '/admin',
        element: <AdminLayout />,
        children: [
          {
            path: 'dashboard',
            element: <Admin />,
          },
          {
            path: 'student',
            element: <StudentReg />
          },
        ],
      },
    ]
  },
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}  />
      <App />
    </Provider>
  </React.StrictMode>,
)
