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
import StudentComp from '../components/studentComp';


function studentReg() {
  const [open, setOpen] = React.useState(true);
  const [students, setStudents] = useState();

  const {register, handleSubmit, formState: { errors }} = useForm()

  const handleClose = () => {
    setOpen(false);
  };

  const branchId = useSelector(state => state.branch.branchId);
  console.log("this is branchId form : ", branchId);

  const student = async(data) => {
    console.log(data);
    await axios.post(`http://localhost:8000/api/v1/student/create/${branchId || "123"}`, data , {
      withCredentials: true,
    }).then((data) => {
      console.log(data.data.data)
      setOpen(false)
    })
  }

  useEffect(() => {
    console.log("working properly");
    if (branchId) {
      axios.post(`http://localhost:8000/api/v1/student/getAllBranchStudents/${branchId || "123"}`, {}, {
        withCredentials: true,
      }).then((data) => {
        console.log("this is main data", data.data.data)
        setStudents(data.data.data)
      })
    }
    
  }, [branchId])

  const courses = [
    {label: "GWDD"},
    {label: "UI/UX"},
    {label: "Python Developer"},
    {label: "Java Developer"},
    {label: "Golang Developer"},
  ]


  return (
    <div className='border w-full'>
      <Dialog
        open={open}
        onClose={handleClose}
        
      >
        <DialogTitle>Students</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To register the student please submit these form
          </DialogContentText>
          <form onSubmit={handleSubmit(student)}>
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
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={courses}
                  renderInput={(params) => 
                    <TextField
                      {...params}
                      label="Course"
                      {...register("course", {
                        required: 'course is required',
                      })}
                    />
                  }
                  size="small"
                />
                {errors.course && <div className='text-red-500 text-sm'>{errors.course.message}</div>}
              </div>
            </div>
          </form>
        </DialogContent>
        <DialogActions className='mb-1'>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit(student)} className='bg-blue-600' type="submit">Register</Button>
        </DialogActions>
      </Dialog>


      <div className=' mt-5 text-end sticky top-4'>
        <button onClick={() => setOpen(true)} className='bg-green-500 py-3 px-8 text-white rounded-xl rounded-r-none '>Register the Student</button>
      </div>
      <div className=' mx-16 mt-16'>
        <div className='border my-4 grid grid-cols-12 h-auto py-3 shadow-sm'>
            <div className='col-span-2 text-gray-800             mx-2'>Name</div>
            <div className='col-span-3 text-gray-800            '>Email</div>
            <div className='col-span-2 text-gray-800 text-center'>Mobile No</div>
            <div className='col-span-2 text-gray-800 text-center'>Course</div>
            <div className='col-span-2 text-gray-800 text-center'>Created At</div>
            <div className='col-span-1 text-gray-800 text-center'>remove</div>
        </div>
        {students?.map((stu) => (
          <div key={stu._id} className='border mb-3 shadow-md'>
            <StudentComp {...stu} />
          </div>
        ))}
      </div>
      
    </div>
  )
}

export default studentReg
