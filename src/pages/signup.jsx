import React, { useState } from 'react'
import logo from "../image/logo.jpg"
import { useForm } from 'react-hook-form'

import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function signup() {
  const [error, setError] = useState()
  const {register,  handleSubmit, formState: { errors }} = useForm()

  const navigate = useNavigate();

  const validatePassword = (value) => {
    if (value.length < 6) {
      return 'Password must be at least 6 characters';
    }
    if (!/\d/.test(value)) {
      return 'Password must contain at least one number';
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      return 'Password must contain at least one special character';
    }
    return true;
  };

  const signup = async(data) => {
    try {
      const response = axios.post("http://localhost:8000/api/v1/branch/registerBranch", {userName: data.userName, password: data.password}, {
        withCredentials: true,
      })
      if (response) {
        navigate("/login")
      }
    } catch (error) {
      setError(error.response.data.message);
      console.log(error.response.data);
    }
  }


  return (
    <div className='bg-gray-100 border h-screen'>
        <div className="bg-gray-100 font-sans mx-44 my-24 border  shadow-2xl">
            <div className="flex ">

                <div className="w-[745px] bg-white p-10 pb-20 h-[550px]">
                    <img src={logo} alt="Yakazi Logo" className="h-24 mx-auto mb-2" />
                    <h2 className="text-xl  mb-6 text-center ">Welcome to Register branch Page</h2>
                    {error && <div className=' text-center text-red-500 '>*{error}</div>}
                    <form onSubmit={handleSubmit(signup)} className='mx-48 mt-4 '>
                        
                        <div className="mb-6">
                            <label  className="block text-gray-700 text-sm font-semibold mb-2">Enter BranchName</label>
                            <input
                            type="text"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                            {...register("userName", {
                                required: 'username is required',
                                minLength: { 
                                    value: 6, 
                                    message: 'Username must be at least 6 characters' 
                                } 
                            })}
                            />
                            {errors.userName && <p className="text-red-500 text-xs italic mt-1">{errors.userName.message}</p>}

                        </div>
                        <div className="mb-4 ">
                            <label  className="block text-gray-700 text-sm font-semibold mb-2">Password</label>
                            <input
                            type="password"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                            {...register('password', { 
                                required: 'Password is required', 
                                validate: validatePassword
                              })}
                            />
                            {errors.password && <p className="text-red-500 text-xs italic mt-1">{errors.password.message}</p>}
                        </div>
                        <div className="mb-4">
                            <input type="checkbox" id="remember" name="remember" className="mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" />
                            <label  className="text-gray-700 text-sm">Remember me</label>
                        </div>
                        
                        <div className='text-center  mt-2'><button type="submit" className="px-10 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                            Login
                        </button></div>
                    </form>
                </div>

                <div className="w-2/5 bg-gray-800 py-44">
                    <h2 className="text-2xl text-white font-semibold mb-4 text-center">ALREAY USER ?</h2>
                    <p className="text-gray-400 mb-6 text-center w-80 mx-auto">Want to Loginn new Aptech branch !</p>
                    <div className='text-center'><Link to="/login"><button className="border px-6 py-2 text-white bg-gray-800 rounded-md hover:bg-gray-900 ">
                        LOGIN BRANCH
                    </button></Link></div>
                </div>

            </div>
        </div>
    </div>
  )
}

export default signup
