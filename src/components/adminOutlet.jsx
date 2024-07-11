import React, { useEffect, useState } from 'react'

import img from '../image/logo.jpg'
import axios from "axios"

import { Link } from 'react-router-dom';

import { branchData as setBranchData } from '../store/branchSlice';

import { useDispatch, useSelector } from 'react-redux';


function adminOutlet() {
    const dispatch = useDispatch();

    const [option, setOption] = useState([]);
    const [branch, setBranch] = useState("");

    useEffect(() => {
        axios.post('http://localhost:8000/api/v1/branch/getAllBranchInfo', {}, {
            withCredentials: true,
        }).then((data) => {
            setOption(data.data.data);
            if (data.data.data.length > 0) {
                const BranchId = data.data.data[0]._id;
                setBranch(BranchId);
                dispatch(setBranchData(BranchId));
            }
        })
    }, [dispatch]);

    const handleChange = (e) => {
        const selectBranchId = e.target.value;
        setBranch(selectBranchId);
        dispatch(setBranchData(selectBranchId));
    }

    
  return (
    <div className="bg-white w-80 p-4 shadow-md">
        <div className="flex items-center mb-4">
            <img src={img} alt="Logo" className="w-16 h-16 mr-2" />
            <h1 className="font-bold text-xl">Aptech</h1>
        </div>
        <div className="flex items-center mb-4">
            <img src="https://cdn-icons-png.flaticon.com/512/147/147144.png" alt="Profile Picture" className="w-8 h-8 rounded-full mr-2" />
            <h2 className="font-medium text-lg">Admin</h2>
        </div>
        {/* <p className="text-gray-600 mb-4">Welcome</p> */}
        <select  className='px-3 mb-5 mt-5 py-2 rounded-lg bg-white text-black outline-none
         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 duration-200 border border-gray-200 w-full sticky top-10' 
         value={branch}
         onChange={handleChange}
        //  defaultValue={option[0]?._id}
        >
            {option?.map((opt) => (
                <option key={opt._id} className='text-violet-900' value={opt._id}>{opt.userName}</option>
            ))}
          
        </select>
        <h3 className="font-medium text-lg mt-6">Dash menu</h3>
        <ul className="mt-2">
            <li className="flex items-center py-2 px-3 rounded-md hover:bg-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <Link to={"/admin/dashboard"}><a className="font-medium">Dashboard</a></Link>
                <span className="ml-auto text-xs font-bold bg-blue-500 text-white px-2 py-1 rounded-full">New</span>
            </li>
            <li className="flex items-center py-2 px-3 rounded-md hover:bg-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5a1 1 0 011-1h4zM11 10a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V11a1 1 0 011-1h4z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 20a1 1 0 01-1 1H7a1 1 0 01-1-1v-2a1 1 0 011-1h13a1 1 0 011 1v2z" />
                </svg>
                <Link to={"/admin/student"}><a className="font-medium">Student Registration</a></Link>
            </li>
            <li className="flex items-center py-2 px-3 rounded-md hover:bg-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.732-.858L3 21l1.867-12.143A2 2 0 015.138 11H18.862a2 2 0 011.732.858L21 3" />
                </svg>
                <Link to={"/admin/batches"}><a className="font-medium">New Batches</a></Link>
            </li>
            <li className="flex items-center py-2 px-3 rounded-md hover:bg-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13.024a2.75 2.75 0 001.425 2.447l1.52 1.122a2.75 2.75 0 003.064-3.192l-1.122-1.52a2.75 2.75 0 00-3.192 3.064l1.122 1.52A2.75 2.75 0 0012 21.025V6.253z" />
                </svg>
                <Link to={"/admin/attendance"}><a className="font-medium">Stu Attendance</a></Link>
            </li>
            <li className="flex items-center py-2 px-3 rounded-md hover:bg-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <a href="#" className="font-medium">Tables</a>
            </li>
            <li className="flex items-center py-2 px-3 rounded-md hover:bg-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <a href="#" className="font-medium">Icons</a>
            </li>
            <li className="flex items-center py-2 px-3 rounded-md hover:bg-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <a href="#" className="font-medium">User Pages</a>
            </li>
            <li className="flex items-center py-2 px-3 rounded-md hover:bg-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4m-9 5h18a2 2 0 002-2v-6a2 2 0 00-2-2H3a2 2 0 00-2 2v6a2 2 0 002 2z" />
                </svg>
                <a href="#" className="font-medium">Student Registration</a>
            </li>
            <li className="flex items-center py-2 px-3 rounded-md hover:bg-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 20l4-16m2 16l4-16M3 10h18M7 15l-4 6M5 15l-4 6M12 15l-4 6M9 15l-4 6" />
                </svg>
                <a href="#" className="font-medium">Branch Registration</a>
            </li>
        </ul>
        <div className="mt-8">
            <h3 className="font-medium text-lg">Category</h3>
            <ul className="mt-2">
                <li className="flex items-center py-1 px-3 rounded-md hover:bg-gray-200">
                    <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
                    <a href="#" className="font-medium">#Sales</a>
                </li>
                <li className="flex items-center py-1 px-3 rounded-md hover:bg-gray-200">
                    <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                    <a href="#" className="font-medium">#Marketing</a>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default adminOutlet
