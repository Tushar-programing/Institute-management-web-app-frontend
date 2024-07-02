import React from 'react'
import {Outlet} from "react-router-dom"
import AdminOutlet from './components/adminOutlet';

const AdminLayout = () => (
    <div className='bg-gray-100  '>
        <div className="flex ">
            <AdminOutlet />
            <Outlet />
        </div>
    </div>
  );

export default AdminLayout
