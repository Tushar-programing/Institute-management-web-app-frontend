import axios from 'axios'
import { React, useState } from 'react'

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Autocomplete from '@mui/material/Autocomplete';

import { useForm } from 'react-hook-form';


function studentComp({_id,course,createdAt,email,mobileNo,name}) {

  const [open, setOpen] = useState(false);

  const [student, setStudent] = useState({
    _id: _id,
    course: course,
    createdAt: createdAt,
    email: email,
    mobileNo: mobileNo,
    name: name,
  })

  const remove = async() => {
    await axios.post(`http://localhost:8000/api/v1/student/removeStudent/${_id}`, {}, {
      withCredentials: true,
    }).then((data) => {
      console.log(data)
      
    })
  }

  const {register, handleSubmit, formState: { errors }} = useForm({
    defaultValues: {
      name: name,
      email: email,
      mobileNo: mobileNo,
      course: course
    },
  })

  const Edit = async(data) => {
    setOpen(false)
    setStudent({
      ...student,
      name: data.name,
      mobileNo: data.mobileNo,
      email: data.email,
      course: data.course,
    })
    await axios.post(`http://localhost:8000/api/v1/student/updateStudent/${_id}`, data, {
      withCredentials: true,
    }).then((response) => {
      console.log("this", response);
      setStudent({
        ...student,
        name: response.data.data.name,
        mobileNo: response.data.data.mobileNo,
        email: response.data.data.email,
        course: response.data.data.course,
      })
    })
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
    <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Students</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To register the student please submit these form
          </DialogContentText>
          <form onSubmit={handleSubmit(Edit)}>
            <div className='my-5 grid grid-cols-12 gap-10'>
              <div className='col-span-5'>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  name="name"
                  label="Full Name"
                  type="text"
                  fullWidth
                  variant="outlined"
                  size="small"
                  {...register("name", {
                    required: 'name is required',
                    minLength: {
                        value: 4,
                        message: 'name must be at least 4 characters'
                    }
                  })}
                />
                {errors.name && <div className='text-red-500 text-sm'>{errors.name.message}</div>}
              </div>
              <div className='col-span-7'>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  name="email"
                  label="Email Address"
                  type="email"
                  fullWidth
                  variant="outlined"
                  size="small"
                  {...register("email", {
                    required: "Email adress is required",
                    validate: {
                        matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                  })}
                />
                {errors.email && <div className='text-red-500 text-sm'>{errors.email.message}</div>}
              </div>
            </div>
            <div className='mb-0 grid grid-cols-12 gap-5'>
              <div className='col-span-7'>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  name="mobileNo"
                  label="Mobile No."
                  type="phone"
                  fullWidth
                  variant="outlined"
                  size="small"
                  {...register("mobileNo", {
                    required: "Mobile no is required",
                    validate: {
                        matchPattern: (value) => /^\d{10}$/.test(value) ||
                        "Phone number is required",
                    }
                  })}
                />
                {errors.mobileNo && <div className='text-red-500 text-sm'>{errors.mobileNo.message}</div>}
              </div>
              <div className='col-span-5 mt-2'>
                <select className='w-40 border py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-md'
                  {...register("course", {     //here name is keyword
                    required: true,
                  })}
                >
                  <option className='text-violet-900' value="GWDD">GWDD</option>
                  <option className='text-violet-900' value="UI/UX">UI/UX</option>
                  <option className='text-violet-900' value="Python Developer">Python Developer</option>
                  <option className='text-violet-900' value="Java Developer">Java Developer</option>
                  <option className='text-violet-900' value="Golang Developer">Golang Developer</option>
                </select>
                {errors.course && <div className='text-red-500 text-sm'>{errors.course.message}</div>}
              </div>
            </div>
          </form>
        </DialogContent>
        <DialogActions className='mb-1'>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit(Edit)} className='bg-blue-600' type="submit">Update</Button>
        </DialogActions>
      </Dialog>


    <div className='grid grid-cols-12 my-auto py-6'>
      <div className=' col-span-2 text-gray-800            px-2'>{student?.name}</div>
      <div className=' col-span-3 text-gray-800            '>{student?.email}</div>
      <div className=' col-span-2 text-gray-800 '>{student?.mobileNo}</div>
      <div className=' col-span-2 text-gray-800 '>{student?.course}</div>
      <div className=' col-span-2 text-gray-800 '>{student?.createdAt?.slice(0,10)}</div>
      <div className=' col-span-1 grid grid-cols-2 gap-1'>
        <button onClick={(e) => setOpen(true)} className=' col-span-1 text-green-500 text-center '>Edit</button>
        <button onClick={remove} className=' col-span-1 text-black text-center text-2xl'>×</button>
      </div>
    </div>
    </>
  )
}

export default studentComp
