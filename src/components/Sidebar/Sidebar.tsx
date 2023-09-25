import Link from 'next/link';
import logo from '../../../assets/logo.png'
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart, faChartLine, faPhone, faHotel, faBookmark, faUser, faCoins, faWallet, faGift } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import baseUrl from '../../../Utils/baseUrl';
import { FaPaypal } from 'react-icons/fa';



const Sidebar = ({role}:any) => {
    const [highLight, setHighLight] = useState(1)
   
    const handleClick = (id: any) => {
        setHighLight(id)
    }

    console.log(role)
    return (
        <div className='fixed left-0 top-0 bottom-0 h-screen w-56 bg-slate-900 flex flex-col gap-10 text-white'>

            <div className='w-full h-20 border-b border-slate-700 flex items-center pl-4'>
                <Image
                    src={logo}
                    alt="logo"
                    className="w-4/5 object-contain"
                />
            </div>

            <div className='w-full h-max flex flex-col gap-2'>
                <div
                    className={`py-4 px-6 w-full text-white ${highLight === 1 ? 'bg-slate-600' : 'bg-slate-900'} hover:bg-slate-700 text-sm font-normal cursor-pointer`}
                    onClick={() => handleClick(1)}
                >
                    <Link href="/" className="w-full h-full flex items-center gap-3">
                        <FontAwesomeIcon icon={faChartLine} className="text-base w-6" />
                        <span>Dashboard</span>
                    </Link>
                </div>

                <div
                    className={`py-4 px-6 w-full text-white ${highLight === 2 ? 'bg-slate-600' : 'bg-slate-900'} hover:bg-slate-700 text-sm font-normal cursor-pointer`}
                    onClick={() => handleClick(2)}
                >
                    <Link href="/hotels/hotels" className="w-full h-full flex items-center gap-3">
                        <FontAwesomeIcon icon={faHotel} className="text-base w-6" />
                        <span>Hotels</span>
                    </Link>
                </div>

                <div
                    className={`py-4 px-6 w-full text-white ${highLight === 3 ? 'bg-slate-600' : 'bg-slate-900'} hover:bg-slate-700 text-sm font-normal cursor-pointer`}
                    onClick={() => handleClick(3)}
                >
                    <Link href="/booking" className="w-full h-full flex items-center gap-3">
                        <FontAwesomeIcon icon={faBookmark} className="text-base w-6" />
                        <span>Bookings</span>
                    </Link>
                </div>

                <div
                    className={`py-4 px-6 w-full text-white ${highLight === 4 ? 'bg-slate-600' : 'bg-slate-900'} hover:bg-slate-700 text-sm font-normal cursor-pointer`}
                    onClick={() => handleClick(4)}
                >
                    <Link href="/users" className="w-full h-full flex items-center gap-3">
                        <FontAwesomeIcon icon={faUser} className="text-base w-6" />
                        <span>users</span>
                    </Link>
                </div>
                
                {role === 'admin' && (
                    <div
                    className={`py-4 px-6 w-full text-white ${highLight === 5 ? 'bg-slate-600' : 'bg-slate-900'} hover:bg-slate-700 text-sm font-normal cursor-pointer`}
                    onClick={() => handleClick(5)}
                >
                    <Link href="/commission" className="w-full h-full flex items-center gap-3">
                        <FontAwesomeIcon icon={faCoins} className="text-base w-6" />
                        <span>Commission</span>
                    </Link>
                </div>
                )}  

                 <div
                    className={`py-4 px-6 w-full text-white ${highLight === 6 ? 'bg-slate-600' : 'bg-slate-900'} hover:bg-slate-700 text-sm font-normal cursor-pointer`}
                    onClick={() => handleClick(6)}
                >
                    <Link href="/payment" className="w-full h-full flex items-center gap-3">
                        <FontAwesomeIcon icon={faWallet} className="text-base w-6" />
                        <span>Payment</span>
                    </Link>
                </div>  

                
                 <div
                    className={`py-4 px-6 w-full text-white ${highLight === 7 ? 'bg-slate-600' : 'bg-slate-900'} hover:bg-slate-700 text-sm font-normal cursor-pointer`}
                    onClick={() => handleClick(7)}
                >
                    <Link href="/offer" className="w-full h-full flex items-center gap-3">
                        <FontAwesomeIcon icon={faGift} className="text-base w-6" />
                        <span>Offer</span>
                    </Link>
                </div>            
            </div>


        </div>
    );
}

export default Sidebar;