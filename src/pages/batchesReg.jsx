import React, { useEffect, useState } from 'react'
import "./pge.css"

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Autocomplete from '@mui/material/Autocomplete';

import { useForm } from 'react-hook-form';
import axios from 'axios';

import { useSelector } from 'react-redux';
import BatchesComp from '../components/batchesComp';


function studentReg() {
  const [open, setOpen] = React.useState(false);
  const [batch, setBatch] = useState();

  const {register, handleSubmit, formState: { errors }} = useForm()

  const handleClose = () => {
    setOpen(false);
  };

  const branchId = useSelector(state => state.branch.branchId);
  console.log("this is branchId form : ", branchId);

  const batches = async(data) => {
    console.log(data);
    await axios.post(`http://localhost:8000/api/v1/batches/create/${branchId || "123"}`, data , {
      withCredentials: true,
    }).then((data) => {
      console.log(data.data.data)
      setOpen(false)
    })
  }

  useEffect(() => {
    console.log("working properly");
    if (branchId) {
      axios.post(`http://localhost:8000/api/v1/batches/getAllBatches/${branchId || "123"}`, {}, {
        withCredentials: true,
      }).then((data) => {
        console.log("this is batch data", data.data.data)
        setBatch(data.data.data)
      })
    }
  }, [branchId, open])

  const courses = [
    {label: "true"},
    {label: "false"},
  ]


  return (
    <div className='border w-full'>
      <Dialog
        open={open}
        onClose={handleClose}
        
      >
        <DialogTitle>Batches</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To create the Batches please submit these form
          </DialogContentText>
          <form onSubmit={handleSubmit(batches)}>
            <div className='my-5 grid grid-cols-12 gap-10'>
              <div className='col-span-5'>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  name="batchName"
                  label="Batch Name"
                  type="text"
                  fullWidth
                  variant="outlined"
                  size="small"
                  {...register("batchName", {
                    required: 'batchName is required',
                    minLength: {
                        value: 4,
                        message: 'Batch name must be at least 4 characters'
                    }
                  })}
                />
                {errors.batchName && <div className='text-red-500 text-sm'>{errors.batchName.message}</div>}
              </div>
              <div className='col-span-7'>
                <input
                  type="date"
                  required
                  name="startDate"
                  className='border mt-2 py-[6px] rounded-md px-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                  {...register("startDate", {
                    required: "startDate is required",
                  })}
                />
                {errors.startDate && <div className='text-red-500 text-sm'>{errors.startDate.message}</div>}
              </div>
            </div>
            <div className='mb-0 grid grid-cols-12 gap-5'>
              <div className='col-span-6'>
              <input
                  type="date"
                  required
                  name="endDate"
                  className='border mt-2 py-[6px] rounded-md px-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                  {...register("endDate", {
                    required: "endDate is required",
                  })}
                />
                {errors.endDate && <div className='text-red-500 text-sm'>{errors.endDate.message}</div>}
              </div>
              <div className='col-span-5 mt-2'>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={courses}
                  renderInput={(params) => 
                    <TextField
                      {...params}
                      label="status"
                      {...register("status", {
                        required: 'status is required',
                      })}
                    />
                  }
                  size="small"
                />
                {errors.status && <div className='text-red-500 text-sm'>{errors.status.message}</div>}
              </div>
            </div>
          </form>
        </DialogContent>
        <DialogActions className='mb-1'>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit(batches)} className='bg-blue-600' type="submit">Register</Button>
        </DialogActions>
      </Dialog>


      <div className=' mt-10 text-end sticky top-8 mr-16'>
        <button onClick={() => setOpen(true)} className='bg-green-500 py-3 px-8 text-white rounded-xl rounded-r-none '>Create Batches</button>
      </div>
      <div className=' mx-12 mt-10'>
        <div className='border my-4 grid grid-cols-12 h-auto py-3 shadow-sm'>
            <div className='col-span-3 text-gray-800  mx-2'>Name</div>
            <div className='col-span-4 text-gray-800 grid grid-cols-8'>
                <div className='col-span-3'>Start Date</div>
                <div className='col-span-3'>End Date</div>
                <div className='col-span-2'>Status</div>
            </div>
            <div className='col-span-2 text-gray-800 '>Batch Students</div>
            <div className='col-span-2 text-gray-800 '>Stu Attendance</div>
            <div className='col-span-1 text-gray-800 text-center'>Edit/Remove</div>
        </div>
        {batch?.map((bat) => (
          <div key={bat._id} className=' shadow-md'>
            <BatchesComp {...bat} />
          </div>
        ))}
      </div>
      
    </div>
  )
}

export default studentReg
