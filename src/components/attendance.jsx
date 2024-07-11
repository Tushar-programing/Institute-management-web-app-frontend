import React, { useEffect, useState } from 'react'

import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


function attendance({name, course, mobileNo, email, _id, date, batchId}) {
    // console.log("this is student details 45 : ", date,  batchId, _id);
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        axios.post(`http://localhost:8000/api/v1/attendance/getAttByBatch/${_id}/${batchId}`, {date}, {
            withCredentials: true
        }).then((data) => {
            // console.log("this is data of tru or false", data.data.data);
            setChecked(data?.data?.data === "P"?  true : false);
        })
    }, [batchId, date])

    const handleChange = async() => {
        const status = !checked? "P" : "A";

        setChecked(!checked)

        await axios.post(`http://localhost:8000/api/v1/attendance/createAttendance/${_id}/${batchId}`, {date, status}, {
            withCredentials: true
        }).then((data) => {
            // console.log(data.data.data);
        })
        
    }

  return (
    <div className='border grid grid-cols-12 py-2 mt-5 px-2 '>
        <div className='col-span-1 my-auto '><Checkbox checked={checked} onChange={handleChange} {...label} defaultChecked /></div>
        <div className='col-span-3 my-auto '>{name}</div>
        <div className='col-span-3 my-auto '>{email}</div>
        <div className='col-span-2 my-auto text-center'>{mobileNo}</div>
        <div className='col-span-3 my-auto text-center'>{course}</div>
    </div>
  )
}

export default attendance
