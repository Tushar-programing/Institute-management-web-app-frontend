import {React, useState, useEffect} from 'react'

import { useForm } from 'react-hook-form';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import axios from 'axios';
import { useSelector } from 'react-redux';

function batchesSubCom({studentsDetail, batchId}) {
    const [studentsDetails, setStudentsDetails] = useState(studentsDetail)
    // console.log("this is batch ID", batchId);
    const branchId = useSelector(state => state.branch.branchId);

  const [open1, setOpen1] = useState(false);
  
  const [students, setStudents] = useState([])

  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState();


  useEffect(() => {
    
    if (branchId) {
      axios.post(`http://localhost:8000/api/v1/student/getAllBranchStudents/${branchId || "123"}`, {}, {
        withCredentials: true,
      }).then((data) => {
        // console.log("this is main data", data.data.data)
        setStudents(data.data.data)
      })
    }
    
  }, [branchId])

    let filtered;
    filtered = students.filter(stu => !studentsDetails.some(stu2 => stu._id === stu2._id));

    // console.log("this is filter copy", filtered);

  useEffect(() => {
    setSuggestions(filtered);
  }, [students, studentsDetails]);


  const handleChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    if (value.length > 0) {
      const filteredSuggestions = filtered?.filter(option =>
        option.name.toLowerCase().includes(value.toLowerCase()) ||
        option.email.toLowerCase().includes(value.toLowerCase()) ||
        option.mobileNo.toLowerCase().includes(value.toLowerCase()) ||
        option.course.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions(filtered);
    }
  };

  const handleSuggestionClick = async(suggestion) => {
    // setInputValue(suggestion.name);
    studentsDetails?.push(suggestion)
    filtered = filtered?.filter((student) => student._id !==  suggestion._id)

    setSuggestions(filtered);
    await axios.post(`http://localhost:8000/api/v1/batches/addStudent/${batchId}`, {studentId: suggestion._id}, {
        withCredentials: true,
    }).then((response) => {
        // console.log("this is response", response)
    })
    
  };


    const handleClose1 = () => {
        setOpen1(false);
      };


    const handleRemove = async(student) => {
        setStudentsDetails(studentsDetails?.filter((stud) => stud._id !== student._id))

        filtered?.push(student)

        // setSuggestions(filtered);

        await axios.post(`http://localhost:8000/api/v1/batches/removeStudent/${batchId}`, {studentId: student?._id} , {
            withCredentials: true,
        })

    }

  return (
    <div>

      
        {/* {studentsDetails?.slice(0, 2)?.map((stu)=> (
          <span className='rounded-full bg-white border px-3 ml-1 py-1' key={stu?._id}>{stu?.name}</span>
        ))} */}
        <button onClick={(e) => setOpen1(true)} className='rounded-xl border border-gray-500 px-3 py-[2px] rounded-r-none'>+ Students</button>

      <Dialog
        open={open1}
        onClose={handleClose1}
        fullWidth={true}
        maxWidth={'md'}
      >
        <DialogTitle>ADD STUDENTS</DialogTitle>
        <DialogContent>
          <div className=''>
            <div className='text-center mb-3'>Existed Students</div>
            {studentsDetails?.map((stu) => (
              <div className='bg-white border px-3 py-3 grid grid-cols-12 mb-2 rounded-xl' key={stu?._id}>
                  <div className=' col-span-3'>{stu?.name}</div>
                  <div className=' col-span-3'>{stu?.email}</div>
                  <div className=' col-span-3 text-center'>{stu?.mobileNo}</div>
                  <div className=' col-span-2'>{stu?.course}</div>
                  <div className=' col-span-1 text-end'><button onClick={() => handleRemove(stu)} className=' w-10 text-2xl'>×</button></div>
              </div>
            ))}
          </div>

            <div className='h-[356px]'>
                <div className='text-center mb-1 mt-5'>Add Students</div>
                <div className='text-center'>
                    <input
                      type="text"
                      value={inputValue}
                      onChange={handleChange}
                      placeholder="Search Students..."
                      className=" w-96 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                {suggestions?.length > 0 && (
                  <div className=" bg-white rounded-md mt-1 w-full z-10">
                    {/* <div className=''>

                    </div> */}
                    {suggestions?.map((suggestion, index) => (
                      <div
                        key={index}
                        className="p-2 cursor-pointer hover:bg-gray-200 grid grid-cols-12 border py-3 rounded-md mb-2"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        <div className=' col-span-3'>{suggestion?.name}</div>
                        <div className=' col-span-3'>{suggestion?.email}</div>
                        <div className=' col-span-3 text-center'>{suggestion?.mobileNo}</div>
                        <div className=' col-span-2'>{suggestion?.course}</div>
                        <div className=' col-span-1 text-end'><button className='text-red-600 w-10 font-extrabold mt-1 '><img src="https://pngimg.com/d/plus_PNG13.png" className=' w-4 ml-auto'/></button></div>
                      </div>
                    ))}
                  </div>
                )}
            </div>
        </DialogContent>
        <DialogActions className='mb-1 mr-7'>
          <Button onClick={handleClose1}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default batchesSubCom
