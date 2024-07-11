import React, { useState , useEffect} from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import Attendance from '../components/attendance';

function attendance() {
  const branchId = useSelector(state => state.branch.branchId);
  const [batch, setBatch] = useState([])

  const [student, setStudent] = useState([]);
  // console.log("batch", batch);
  
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState();

  const [isFocused, setIsFocused] = useState(false);
  // console.log("suggestion", suggestions);

  const [selectedDate, setSelectedDate] = useState(null);

  const [BatchId, setBatchId] = useState()

  const day = String(selectedDate?.getDate())?.padStart(2, '0');
  const month = String(selectedDate?.getMonth() + 1)?.padStart(2, '0'); // Months are 0-based
  const year = selectedDate?.getFullYear();

  const stringDate = (`${year}-${day}-${month}`)

  useEffect(() => {
    console.log("working properly");
    if (branchId) {
      axios.post(`http://localhost:8000/api/v1/batches/getAllBatches/${branchId || "123"}`, {}, {
        withCredentials: true,
      }).then((data) => {
        // console.log("this is batch data", data.data.data)
        setBatch(data.data.data)
        setSuggestions(data.data.data)
      })
    }
  }, [branchId])


  const blockedDates = [
    new Date(2023, 6, 4),
    new Date(2023, 6, 10),
  ];


  const isDateBlocked = (date) => {
    // console.log(date);
    return blockedDates.some(blockedDate => 
      date.getFullYear() === blockedDate.getFullYear() &&
      date.getMonth() === blockedDate.getMonth() &&
      date.getDate() === blockedDate.getDate()
    );
  };

  const isDateAllowed = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to midnight to compare only the date part

    return date <= today;
  };

  const filterDate = (date) => {
    return isDateAllowed(date) && !isDateBlocked(date);
  };
  

  const handleSuggestionClick = (suggestion) => {
    // console.log("this is log suggestion", suggestion);
    setStudent(suggestion?.studentsDetails)
    setBatchId(suggestion?._id)
    setInputValue(`${suggestion?.batchName}         ${suggestion?.startDate?.slice(0, 10)}         ${suggestion?.endDate?.slice(0, 10)}         ${suggestion?.status}`)
    
  };


  const handleChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    if (value.length > 0) {
      const filteredSuggestions = batch?.filter(option =>
        option.batchName.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions(batch);
    }
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      setIsFocused(false);
    }, 250);
  };
  
  return (
    <div className='w-full'>
      <div className='mt-10 text-center text-xl '>Enter Batchwise Attendance</div>

      <div className=' mt-12'>
        <div className=' ml-52 flex'>
            <div className=' my-auto'>Enter Branch Name : </div>
            <div className='ml-20'>
              <input
                type="text"
                value={inputValue}
                onChange={handleChange}
                onFocus={() => setIsFocused(true)}
                onBlur={handleInputBlur}
                placeholder="Search with Batch name..."
                className=" w-[550px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {isFocused && suggestions?.length > 0 && (
                <div className="border rounded-md w-[550px] z-10 px-1 py-1 absolute ml-44">
                    <div
                      className="p-2 grid grid-cols-12 border py-2 rounded-md mb-1 bg-white"
                    >
                      <div className=' col-span-4 '>batchName</div>
                      <div className=' col-span-3 '>Start-Date</div>
                      <div className=' col-span-3  text-center'>End-Date</div>
                      <div className=' col-span-2  text-center'>status</div>
                    </div>
                  {suggestions?.map((suggestion, index) => (
                    <div
                      key={index}
                      className="p-2 cursor-pointer hover:bg-gray-200 grid grid-cols-12 border py-3 rounded-md mb-2 bg-white"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      <div className=' col-span-4 '>{suggestion?.batchName}</div>
                      <div className=' col-span-3 '>{suggestion?.startDate?.slice(0,10)}</div>
                      <div className=' col-span-3  text-center'>{suggestion?.endDate?.slice(0,10)}</div>
                      <div className=' col-span-2  text-center'>{suggestion?.status?.toString()}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
        </div>

        <div className=" ml-52 mt-5 flex">
          <div className='my-auto'>Enter Date : </div>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            filterDate={filterDate}
            placeholderText="Select a date"
            className="w-full ml-36 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>


      <div className='mt-12'>
        <div className='text-center'>STUDENTS</div>

        <div className='border grid grid-cols-12 mx-52 py-2 mt-5 px-2'>
          <div className='col-span-1 ml-2'>Att.</div>
          <div className='col-span-3 '>Stu Name</div>
          <div className='col-span-3 '>E-mail</div>
          <div className='col-span-2 text-center'>Mob No</div>
          <div className='col-span-3 text-center'>Course</div>
        </div>
        
        {student?.length > 0 && !(selectedDate === null)  && <div className='overflow-y-auto h-96 mx-52'>
          {student?.map((stu) => (
              <Attendance key={stu._id} {...stu} batchId={BatchId} date={stringDate} />
          ))}
        </div>}
      </div>
      
    </div>
  )
}

export default attendance
