import axios from 'axios'
import React from 'react'

function studentComp({_id,course,createdAt,email,mobileNo,name}) {

  const remove = async() => {
    await axios.post(`http://localhost:8000/api/v1/student/removeStudent/${_id}`, {}, {
      withCredentials: true,
    }).then((data) => {
      console.log(data)
      
    })
  }

  return (
    <div className='grid grid-cols-12 my-auto py-6'>
      <div className='col-span-2 text-gray-800             mx-2'>{name}</div>
      <div className='col-span-3 text-gray-800            '>{email}</div>
      <div className='col-span-2 text-gray-800 text-center'>{mobileNo}</div>
      <div className='col-span-2 text-gray-800 text-center'>{course}</div>
      <div className='col-span-2 text-gray-800 text-center'>{createdAt.slice(0,10)}</div>
      <button onClick={remove} className='col-span-1 text-gray-800 text-center text-2xl'>×</button>
    </div>
  )
}

export default studentComp
