import {React, useEffect, useState} from 'react'


import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import BatchSubSubAtt from './batchSubSubAtt';

function batchSubAtt({studentsDetail, batchId, startDate}) {
  const [open1, setOpen1] = useState(false);

  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());

  const handleClose1 = () => {
    setOpen1(false);
  };

  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  const [years, setYears] = useState([]);
  const [months, setMonths] = useState([]);

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    // Generate the years array from startYear to the current year
    const yearArray = [];
  
    for (let i = currentYear; i >= parseInt(startDate.slice(0, 4)); i--) {
      yearArray.push(i);
    }
    setYears(yearArray);

    const currentMonth = new Date().getMonth();
    const monthArray = [];
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
  
    for (let i = currentMonth; i >= parseInt(startDate.slice(8, 10))-1; i--) {
      monthArray.push(monthNames[i]);
    }
    
    setMonths(monthArray);
  }, [startDate]);

  return (
    <div>
        <button onClick={(e) => setOpen1(true)} className='rounded-xl border border-gray-500 px-3 py-[2px] rounded-r-none'>Attendance</button>
        <Dialog
        open={open1}
        onClose={handleClose1}
        fullWidth={true}
        maxWidth={'xl'}
      >
        <DialogTitle>STUDENTS ATTENDANCE</DialogTitle>
        <DialogContent>
          <div className=''>
          <div className=" grid grid-cols-12">
              <div className='col-span-3 '></div>
              <div className='col-span-3 '>
                  
              </div>
              <div className='col-span-6 '>

                  <select  className='w-36 ml-96 px-3 mb-5 mt-5 py-2 rounded-lg bg-white text-black outline-none
                    border border-gray-200 sticky top-10' 
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  >
                      {years.map(y => (
                        <option key={y} className='text-violet-900' value={y}>
                          {y}
                        </option>
                      ))}
                  </select>

                  <select  className='w-44 ml-8 px-3 mb-5 mt-3 py-2 rounded-lg bg-white text-black outline-none
                    border border-gray-200 sticky top-10'
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                  >
                      {/* {parseInt(startDate.slice(0, 4)) === currentYear ? <>
                        {months?.map((month, index)=> (
                          <option key={index} className='text-violet-900' value={index}>{month}</option>
                        ))}
                      </>
                      : <> */}
                        <option className='text-violet-900' value={1}>January</option>
                        <option className='text-violet-900' value={2}>Febuary</option>
                        <option className='text-violet-900' value={3}>March</option>
                        <option className='text-violet-900' value={4}>April</option>
                        <option className='text-violet-900' value={5}>May</option>
                        <option className='text-violet-900' value={6}>June</option>
                        <option className='text-violet-900' value={7}>July</option>
                        <option className='text-violet-900' value={8}>August</option>
                        <option className='text-violet-900' value={9}>September</option>
                        <option className='text-violet-900' value={10}>October</option>
                        <option className='text-violet-900' value={11}>November</option>
                        <option className='text-violet-900' value={12}>december</option>
                      {/* </>} */}
                  </select>
              </div>
          </div>
          <table className="min-w-full border-collapse border border-gray-400">
            <thead>
                <tr className="bg-gray-200">
                    <th className="border border-gray-400 px-4 py-2">Stu Name</th>
                    <th className="border border-gray-400 px-4 py-2">E-mail adress</th>
                    <th className="border border-gray-400 px-4 py-2">Course</th>
                    {daysInMonth.map(day => (
                      <th key={day} className="border border-gray-400 px-2 py-1">{day}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
            {studentsDetail.map(student => (
              <tr key={student.serial}>
                <td className="border border-gray-400 px-4 py-2">{student?.name}</td>
                <td className="border border-gray-400 px-4 py-2">{student?.email}</td>
                <td className="border border-gray-400 px-4 py-2">{student?.course}</td>
                <BatchSubSubAtt id={student?._id} batchId={batchId}  month={month} year={year} />

              </tr>
            ))}
          </tbody>
          </table>
          </div>

        </DialogContent>
        <DialogActions className='mb-1 mr-7'>
          <Button onClick={handleClose1}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default batchSubAtt
