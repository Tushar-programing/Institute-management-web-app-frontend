import axios from 'axios'
import { React, useState } from 'react'

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import BatchesSubCom from '../aSubCom.jsx/batchesSubCom';
import BatchSubAtt from '../aSubCom.jsx/batchSubAtt';

import { useForm } from 'react-hook-form';


function batchesComp({_id, batchName, startDate, endDate, status, studentsDetails}) {
  // console.log(_id, batchName, startDate, endDate, status, studentsDetails);

  const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    {
      title: 'The Lord of the Rings: The Return of the King',
      year: 2003,
    },
    { title: 'The Good, the Bad and the Ugly', year: 1966 },
    { title: 'Fight Club', year: 1999 },
  ];

  const [open, setOpen] = useState(false);


  const [batches, setBatches] = useState({
    _id: _id,
    batchName: batchName,
    startDate: startDate,
    endDate: endDate,
    status: status.toString(),
    studentsDetails: studentsDetails,
    rm: false,
  })

  const remove = async() => {
    await axios.post(`http://localhost:8000/api/v1/batches/remove/${_id}`, {}, {
      withCredentials: true,
    }).then((data) => {
      console.log(data)
      setBatches({
            ...batches,
            rm: true,
          })
    })
  }

  const {register, handleSubmit, formState: { errors }} = useForm({
    defaultValues: {
      batchName: batches?.batchName,
      startDate: batches?.startDate,
      endDate: batches?.endDate,
      status: batches?.status,
    },
  })

  const Edit = async(data) => {
    // console.log("this is edit data", data);
    setOpen(false)
    setBatches({
      ...batches,
      batchName: data?.batchName,
      startDate: data?.startDate || batches?.startDate,
      endDate: data?.endDate || batches?.endDate,
      status: data?.status,
    })
    await axios.post(`http://localhost:8000/api/v1/batches/update/${_id}`, {
      batchName: data?.batchName,
      startDate: data?.startDate || batches?.startDate,
      endDate: data?.endDate || batches?.endDate,
      status: data?.status,
    }, {
      withCredentials: true,
    }).then((response) => {
      console.log("this", response);
      setBatches({
        ...batches,
        batchName: response.data.data.batchName,
        startDate: response.data.data.startDate,
        endDate: response.data.data.endDate,
        status: response.data.data.status.toString(),
      })
    })
  }

  const handleClose = () => {
    setOpen(false);
  };



  if (batches?.rm) {
    return null;
  }


  return (
    <div className='mb-4 border'>
    <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Batches</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To Edit the Batches please submit these form
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
                        message: 'batchName must be at least 4 characters'
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
                    required: false,
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
                    required: false,
                  })}
                />
                {errors.endDate && <div className='text-red-500 text-sm'>{errors.endDate.message}</div>}
              </div>
              <div className='col-span-5 mt-2'>
                <select className='w-40 border py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-md'
                  {...register("status", {     //here name is keyword
                    required: true,
                  })}
                >
                  <option className='text-violet-900' value="true">True</option>
                  <option className='text-violet-900' value="false">False</option>
                </select>
                {errors.status && <div className='text-red-500 text-sm'>{errors.status.message}</div>}
              </div>
            </div>
          </form>
        </DialogContent>
        <DialogActions className='mb-1'>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit(Edit)} className='bg-blue-600' type="submit">Update</Button>
        </DialogActions>
      </Dialog>


      {/* _id, batchName, startDate, endDate, status, studentsDetails */}
    <div className='grid grid-cols-12 my-auto py-6'>
      <div className=' col-span-3 text-gray-800 px-2'>{batches?.batchName}</div>

      <div className=' col-span-4 text-gray-800 grid grid-cols-8'>
          <div className=' col-span-3 text-gray-800 '>{batches?.startDate?.slice(0,10)}</div>
          <div className=' col-span-3 text-gray-800 '>{batches?.endDate?.slice(0,10)}</div>
          <div className=' col-span-2 text-gray-800 '>{batches?.status}</div>
      </div>

      <div className=' col-span-2 text-gray-800 '>
          <BatchesSubCom studentsDetail={batches?.studentsDetails} batchId={batches?._id}/>
      </div>
      <div className=' col-span-2 text-gray-800 '>
          <BatchSubAtt studentsDetail={batches?.studentsDetails} startDate={batches?.startDate?.slice(0,10)} batchId={batches?._id}/>
          
      </div>

      <div className=' col-span-1 grid grid-cols-2 gap-1'>
        <button onClick={(e) => setOpen(true)} className='col-span-1 text-green-500 text-center '>Edit</button>
        <button onClick={remove} className=' col-span-1 text-black text-center text-2xl'>×</button>
      </div>
    </div>

    </div>
  )
}

export default batchesComp