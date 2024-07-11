import axios from 'axios';
import React from 'react'

function demo() {

   const handleForm = (event) => {
    event.preventDefault();

    const status = event.target.status.value;
    const date = event.target.date.value.toString();

    console.log('Status:', status);
    console.log('Date:', date);

    axios.post('http://localhost:8000/api/v1/attendance/createAttendance/668bb6533d5bbe3d2f126425', {date, status}, {
        withCredentials:true,
    }).then((data) => {
        console.log("this is response data", data);
    })

   }

  return (
    <div className='w-full border'>
      <div className='mx-40 border border-black mt-44 h-96'>
        <form onSubmit={handleForm}>
            <input 
                type='text'
                className=' border border-black  px-4'
                placeholder='Status'
                name='status'
            />
            <input 
                type='date'
                className=' border border-black ml-10 px-4'
                placeholder='Status'
                name="date"
            />
            <button>submit</button>
        </form>
      </div>
    </div>
  )
}

export default demo
