import React, { useEffect, useState } from 'react'
import axios from 'axios';

import BatchSubSubSubatt from './batchSubSubSubatt';

function batchSubSubAtt({id, batchId, year, month}) {
    console.log("this is month date : ", year, month);

    const [attendance, setAttendance] = useState([])

    useEffect(() => {
        axios.post(`http://localhost:8000/api/v1/attendance/getAttendance/${id}/${batchId}?month=${month}&year=${year}`, {}, {
           withCredentials: true
        }).then((data) => {
        //   console.log(data.data.data);
          setAttendance(data.data.data)
        })
    }, [year, month])

    const handleChange = async(date, value) => {
        // console.log(date, value);
        const status = value.toUpperCase()
        if (status === 'A' || status == 'P') {
            await axios.post(`http://localhost:8000/api/v1/attendance/createAttendance/${id}`, {date, status}, {
                withCredentials: true
            }).then((data) => {
                // console.log(data.data.data);
            })
        }
        
    }
    

    // console.log(id);
  return (
    <>
        {attendance?.map((data) => (
            <td key={data.date} className="border border-gray-400 py-1 text-center">
                <BatchSubSubSubatt data={data} id={id} batchId={batchId}  handleChange={handleChange} />
                {/* <input maxLength="1" defaultValue={(data?.status) === null? "n" : data?.status} type='text' onChange={(e) => handleChange(data.date, e.target.value)} className='w-8 px-2 border-none outline-none ' /> */}
            </td>
        ))}
    </>
  )
}

export default batchSubSubAtt
