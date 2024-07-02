import React from 'react'
import { useSelector } from 'react-redux';

function adminDashboard({branch}) {
    // console.log(branch);

    const branchId = useSelector(state => state.branch.branchId);

    console.log("this is branchId", branchId);
  return (
    <div className="flex-1 px-4 py-4">
        <div className=' w-full h-14 '>
            <div className=' grid grid-cols-3 gap-4'>
                <div className='py-1 text-base my-auto bg-white text-center'>DASHBOARD</div>
                <div className='py-1 text-xl text-center bg-white'>Noida sec-62</div>
                {/* <div className='py-1 text-xl text-center bg-white'>Noida sec-62</div> */}

            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border">
            {/* <div className='border h-96 w-full'></div> */}
            <div className="bg-white p-4 rounded-md shadow-md">
                <h2 className="font-bold text-lg mb-2">Sessions By Channel</h2>
                <div className="flex justify-center items-center w-24 h-24 rounded-full bg-blue-200">
                    <div className="text-center font-bold text-2xl text-blue-600">
                        75%
                    </div>
                </div>
                <ul className="mt-4">
                    <li className="flex items-center justify-between text-sm">
                        <span>• Firewalls(3)</span>
                        <span>4(100%)</span>
                    </li>
                    <li className="flex items-center justify-between text-sm">
                        <span>• Ports(12)</span>
                        <span>12(100%)</span>
                    </li>
                    <li className="flex items-center justify-between text-sm">
                        <span>• Servers(233)</span>
                        <span>2(100%)</span>
                    </li>
                    <li className="flex items-center justify-between text-sm">
                        <span>• Firewalls(3)</span>
                        <span>7(100%)</span>
                    </li>
                    <li className="flex items-center justify-between text-sm">
                        <span>• Firewalls(3)</span>
                        <span>6(70%)</span>
                    </li>
                </ul>
            </div>
            <div className="bg-white p-4 rounded-md shadow-md">
                <h2 className="font-bold text-lg mb-2">Events</h2>
                <div className="h-48 relative">
                    <div className="w-full h-full bg-gray-200 rounded-md"></div>
                    <div className="absolute bottom-0 left-0 w-full h-4 bg-red-500 rounded-bl-md"></div>
                    <div className="absolute top-0 left-0 w-full h-4 bg-orange-500 rounded-tl-md"></div>
                    <div className="absolute bottom-0 left-0 w-2/5 h-16 bg-orange-500 rounded-br-md"></div>
                    <div className="absolute top-0 left-0 w-2/5 h-16 bg-red-500 rounded-bl-md"></div>
                    <div className="absolute bottom-0 left-1/2 w-1/5 h-12 bg-red-500 rounded-br-md"></div>
                    <div className="absolute top-0 left-1/2 w-1/5 h-12 bg-orange-500 rounded-bl-md"></div>
                    <div className="absolute bottom-0 left-3/5 w-1/5 h-12 bg-orange-500 rounded-bl-md"></div>
                    <div className="absolute top-0 left-3/5 w-1/5 h-12 bg-red-500 rounded-br-md"></div>
                </div>
                <div className="mt-4 flex justify-between text-sm">
                    <span className="text-gray-500">Critical</span>
                    <span className="text-gray-500">Error</span>
                    <span className="text-gray-500">Warning</span>
                </div>
            </div>
            <div className="bg-white p-4 rounded-md shadow-md">
                <h2 className="font-bold text-lg mb-2">Device Stats</h2>
                <ul className="mt-4">
                    <li className="flex items-center justify-between text-sm">
                        <span>Uptime</span>
                        <span>195 Days, 8 hours</span>
                    </li>
                    <li className="flex items-center justify-between text-sm">
                        <span>First Seen</span>
                        <span>23 Sep 2019, 2.04PM</span>
                    </li>
                    <li className="flex items-center justify-between text-sm">
                        <span>Collected time</span>
                        <span>23 Sep 2019, 2.04PM</span>
                    </li>
                    <li className="flex items-center justify-between text-sm">
                        <span>Memory space</span>
                        <span>168.3GB</span>
                    </li>
                    <div className="w-full h-2 mt-4 bg-gray-200 rounded-full">
                        <div className="w-4/5 h-full bg-green-500 rounded-full"></div>
                    </div>
                </ul>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-white p-4 rounded-md shadow-md">
                <h2 className="font-bold text-lg mb-2">Sessions By Channel</h2>
                <ul className="mt-4">
                    <li className="flex items-center justify-between text-sm">
                        <span>Connor Chandler</span>
                        <span>$ 4909</span>
                    </li>
                    <li className="flex items-center justify-between text-sm">
                        <span>Russell Floyd</span>
                        <span>$857</span>
                    </li>
                    <li className="flex items-center justify-between text-sm">
                        <span>Douglas White</span>
                        <span>$612</span>
                    </li>
                    <li className="flex items-center justify-between text-sm">
                        <span>Alta Fletcher</span>
                        <span>$233</span>
                    </li>
                    <li className="flex items-center justify-between text-sm">
                        <span>Marguerite Pearson</span>
                        <span>$233</span>
                    </li>
                    <li className="flex items-center justify-between text-sm">
                        <span>Leonard Gutierrez</span>
                        <span>$35</span>
                    </li>
                    <li className="flex items-center justify-between text-sm">
                        <span>Helen Benson</span>
                        <span>$43</span>
                    </li>
                </ul>
            </div>
            <div className="bg-white p-4 rounded-md shadow-md">
                <h2 className="font-bold text-lg mb-2">Sales Analytics</h2>
                <div className="h-48 relative">
                    <div className="w-full h-full bg-gray-200 rounded-md"></div>
                    <div className="absolute top-0 left-0 w-full h-4 bg-blue-500 rounded-tl-md"></div>
                    <div className="absolute bottom-0 left-0 w-full h-4 bg-orange-500 rounded-br-md"></div>
                    <div className="absolute top-0 left-1/5 w-full h-4 bg-red-500 rounded-tl-md"></div>
                    <div className="absolute bottom-0 left-1/5 w-full h-4 bg-orange-500 rounded-br-md"></div>
                    <div className="absolute top-0 left-2/5 w-full h-4 bg-orange-500 rounded-tl-md"></div>
                    <div className="absolute bottom-0 left-2/5 w-full h-4 bg-blue-500 rounded-br-md"></div>
                    <div className="absolute top-0 left-3/5 w-full h-4 bg-blue-500 rounded-tl-md"></div>
                    <div className="absolute bottom-0 left-3/5 w-full h-4 bg-red-500 rounded-br-md"></div>
                    <div className="absolute top-0 left-4/5 w-full h-4 bg-red-500 rounded-tl-md"></div>
                    <div className="absolute bottom-0 left-4/5 w-full h-4 bg-blue-500 rounded-br-md"></div>
                </div>
                <div className="mt-4 flex justify-around text-sm">
                    <div className="flex items-center text-blue-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                        </svg>
                        <span>Online</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                        </svg>
                        <span>Offline</span>
                    </div>
                    <div className="flex items-center text-orange-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                        </svg>
                        <span>Marketing</span>
                    </div>
                </div>
                <div className="mt-4 flex justify-between text-lg font-bold">
                    <span>23,342</span>
                    <span>13,221</span>
                    <span>1,542</span>
                </div>
                <div className="mt-4 flex justify-end">
                    <span className="bg-gray-200 px-3 py-1 rounded-md">Month</span>
                </div>
                <div className="mt-2 flex justify-around text-sm">
                    <span>Feh</span>
                    <span>Mar</span>
                    <span>Anr</span>
                    <span>May</span>
                    <span>Jun</span>
                    <span>Jul</span>
                    <span>Aug</span>
                </div>
            </div>
        </div>
        <div className="bg-white p-4 rounded-md shadow-md mt-4">
            <h2 className="font-bold text-lg mb-2">Card Title</h2>
            <div className="mt-4">
                <h3 className="font-bold text-lg">Total Earning</h3>
                <h2 className="font-bold text-3xl">287,493$</h2>
                <p className="text-gray-500 text-sm">1.4% Since Last Month</p>
            </div>
            <div className="mt-4">
                <h3 className="font-bold text-lg">Total Earning</h3>
                <h2 className="font-bold text-3xl">87,493</h2>
                <p className="text-gray-500 text-sm">5.43% Since Last Month</p>
            </div>
            <div className="mt-4">
                <div className="grid grid-cols-7 gap-2">
                    <div className="h-8 bg-gray-300 rounded-md"></div>
                    <div className="h-12 bg-gray-300 rounded-md"></div>
                    <div className="h-16 bg-gray-300 rounded-md"></div>
                    <div className="h-10 bg-gray-300 rounded-md"></div>
                    <div className="h-14 bg-gray-300 rounded-md"></div>
                    <div className="h-18 bg-gray-300 rounded-md"></div>
                    <div className="h-20 bg-gray-300 rounded-md"></div>
                    <div className="h-8 bg-gray-300 rounded-md"></div>
                    <div className="h-10 bg-gray-300 rounded-md"></div>
                    <div className="h-14 bg-gray-300 rounded-md"></div>
                    <div className="h-16 bg-gray-300 rounded-md"></div>
                    <div className="h-12 bg-gray-300 rounded-md"></div>
                    <div className="h-10 bg-gray-300 rounded-md"></div>
                    <div className="h-16 bg-gray-300 rounded-md"></div>
                    <div className="h-18 bg-gray-300 rounded-md"></div>
                    <div className="h-12 bg-gray-300 rounded-md"></div>
                    <div className="h-14 bg-gray-300 rounded-md"></div>
                    <div className="h-18 bg-gray-300 rounded-md"></div>
                    <div className="h-20 bg-gray-300 rounded-md"></div>
                    <div className="h-8 bg-gray-300 rounded-md"></div>
                    <div className="h-10 bg-gray-300 rounded-md"></div>
                    <div className="h-14 bg-gray-300 rounded-md"></div>
                    <div className="h-16 bg-gray-300 rounded-md"></div>
                    <div className="h-12 bg-gray-300 rounded-md"></div>
                    <div className="h-10 bg-gray-300 rounded-md"></div>
                    <div className="h-16 bg-gray-300 rounded-md"></div>
                    <div className="h-18 bg-gray-300 rounded-md"></div>
                    <div className="h-12 bg-gray-300 rounded-md"></div>
                    <div className="h-14 bg-gray-300 rounded-md"></div>
                    <div className="h-18 bg-gray-300 rounded-md"></div>
                    <div className="h-20 bg-gray-300 rounded-md"></div>
                    <div className="h-8 bg-gray-300 rounded-md"></div>
                    <div className="h-10 bg-gray-300 rounded-md"></div>
                    <div className="h-14 bg-gray-300 rounded-md"></div>
                    <div className="h-16 bg-gray-300 rounded-md"></div>
                    <div className="h-12 bg-gray-300 rounded-md"></div>
                    <div className="h-10 bg-gray-300 rounded-md"></div>
                    <div className="h-16 bg-gray-300 rounded-md"></div>
                    <div className="h-18 bg-gray-300 rounded-md"></div>
                    <div className="h-12 bg-gray-300 rounded-md"></div>
                    <div className="h-14 bg-gray-300 rounded-md"></div>
                    <div className="h-18 bg-gray-300 rounded-md"></div>
                    <div className="h-20 bg-gray-300 rounded-md"></div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default adminDashboard
