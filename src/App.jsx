import axios from 'axios'
import { useEffect, useState } from 'react'
// import './App.css'

import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { login } from './store/authslice';

function App() {
  const dispatch = useDispatch()

  console.log("working properly");
  useEffect(() => {
    axios.post('http://localhost:8000/api/v1/branch/getCurrentUser', {}, {
      withCredentials: true,
    }).then((data) => {
      // console.log(data.data.data)
      dispatch(login(data.data.data))
    })
  })

  // useEffect(() => {
  //   axios.post(`${conf.apiUrl}/users/getCurrentUser`, {}, {
  //     withCredentials: true,
  //   }).then((userDat) => {
  //       const userData = userDat.data.data;
  //       // console.log("this is userData", userData);
  //       if (userData) {
  //         dispatch(login({userData}))
  //       } else {
  //         dispatch(logout())
  //       }
  //   })
  // }, [])

  return (
    <Outlet />
  )
}

export default App
