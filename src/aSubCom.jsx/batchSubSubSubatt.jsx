import {React, useState, useEffect} from 'react'
import axios from 'axios'

function batchSubSubSubatt({data, id, batchId}) {
    
    // console.log(data);
    const [input, setInput] = useState((data?.status) === null? "" : data?.status)

    const handleChange = async(date, value) => {
        // console.log(date, value);
        const status = value.toUpperCase()
        setInput(status)

        if (status === 'A' || status == 'P' || status == 'L') {
            await axios.post(`http://localhost:8000/api/v1/attendance/createAttendance/${id}/${batchId}`, {date, status}, {
                withCredentials: true
            }).then((data) => {
                // console.log(data.data.data);
            })
        }
        
    }
  return (
    <div>
      <input maxLength="1" type='text' value={input} 
      onChange={(e) => handleChange(data.date, e.target.value)} 
      className={`w-8 px-2 border-none outline-none ${input === 'P'? 'text-green-600' : input === 'A' ? 'text-red-600'  : 'text-yellow-400'}`} />
    </div>
  )
}

export default batchSubSubSubatt
