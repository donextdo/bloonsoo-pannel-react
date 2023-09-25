import axios from "axios";
import Content from "../Content/Content";
import baseUrl from "../../../Utils/baseUrl";
import { useEffect, useState } from "react";
import User from "@/pages/users";
import DashboardCard from "./DashboardCard";
import { faBellConcierge, faDollarSign, faHotel, faUser } from "@fortawesome/free-solid-svg-icons";


interface Address {
    addressLine1: string;
    addressLine2: string;
    city: string;
    country: string;
    postalCode: string;
    _id: string;
}

interface User {
    _id: string;
    username: string;
    email: string;
    role: string;
    status: string;
    isEmailVerified: boolean;
    isMobileVerified: boolean;
    isProfileComplete: boolean;
    whishList: [];
    createdAt: string;
    updatedAt: string;
    __v: number;
    firstName: string;
    lastName: string;
    about: string;
    address: Address;
    mobile: string;
}



const Dashboard = () => {
    const [activeHotelCount, setActiveHotelCount] = useState(0)
    const [totalBookings, setTotalBookings] = useState(0)
    const [pendingBookings, setPendingBookings] = useState(0)
    const [rejectBookings, setRejectBookings] = useState(0)
    const [totalCommission, setTotalCommission] = useState(0)
    const [activeUsers, setActiveUsers] = useState(0)
    const [inactiveHotelCount, setInactiveHotelCount] = useState(0)
    const [user, setUser] = useState<User>({
        _id: '',
        username: '',
        email: '',
        role: '',
        status: '',
        isEmailVerified: false,
        isMobileVerified: false,
        isProfileComplete: false,
        whishList: [],
        createdAt: '',
        updatedAt: '',
        __v: 0,
        firstName: '',
        lastName: '',
        about: '',
        address: {
            addressLine1: '',
            addressLine2: '',
            city: '',
            country: '',
            postalCode: '',
            _id: '',
        },
        mobile: '',
    })

    useEffect(() => {
        fetchUser()
        getActiveHotelCount()
        getTotalBookings()
        getActiveUsers()
        getTotalCommission()
        getInactiveHotelCount()
        getPendinglBookings()
        getRejectlBookings()
    }, [])

    let token: any 
      if (typeof localStorage !== 'undefined') {
          token = localStorage.getItem("token");
      }


    const fetchUser = async () => {
        try {
            const response = await axios.get(`${baseUrl}/auth/user`, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            })
            setUser(response.data)
        } catch (error) {
            console.log(error)
        }

    }

    async function getTotalCommission() {
        try {
            const res = await axios.get(`${baseUrl}/commission/total`, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            })
            // totalCommission.value = data[0]?.total || 0
            console.log(res.data[0].total)
            setTotalCommission(res.data[0].total || 0)
        }
        catch (error) {
            console.log(error)
        }
    }

    async function getActiveHotelCount() {
        try {
            const res = await axios.get(`${baseUrl}/hotel/get/active/count`, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            })
            // console.log(res.data)
            setActiveHotelCount(res.data)

        }
        catch (error) {
            console.log(error)
        }
    }

    async function getInactiveHotelCount() {
        try {
            const res = await axios.get(`${baseUrl}/hotel/get/inactive/count`, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            })
            console.log(res.data)
            setInactiveHotelCount(res.data)

        }
        catch (error) {
            console.log(error)
        }
    }

    async function getTotalBookings() {
        try {
            const res = await axios.get(`${baseUrl}/booking/get/booking-count`, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            })
            setTotalBookings(res.data)

        }
        catch (error) {
            console.log(error)
        }
    }

    async function getActiveUsers() {
        try {
            const res = await axios.get(`${baseUrl}/user/active-users/count`, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            })
            setActiveUsers(res.data)

        }
        catch (error) {
            console.log(error)
        }
    }

    async function getPendinglBookings() {
        try {
            const res = await axios.get(`${baseUrl}/booking/get/pending-count`, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            })
            setPendingBookings(res.data)

        }
        catch (error) {
            console.log(error)
        }
    }

    async function getRejectlBookings() {
        try {
            const res = await axios.get(`${baseUrl}/booking/get/reject-count`, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            })
            setRejectBookings(res.data)

        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <Content>
            <div className=' w-full flex flex-col gap-10'>
                <h3 className="text-2xl font-light text-gray-600">
                    Dashboard
                </h3>

                <div className="w-full grid grid-cols-4 gap-6">
                    <DashboardCard icon={faHotel} color="bg-gradient-to-r from-blue-600 to-blue-300" title="Active Hotels"  value={activeHotelCount} />
                    <DashboardCard icon={faHotel} color="bg-gradient-to-r from-violet-600 to-violet-300" title="Deactive Hotels"  value={inactiveHotelCount} />
                    <DashboardCard icon={faBellConcierge} color="bg-gradient-to-r from-orange-400 to-orange-200"  title="Total Bookings" value={totalBookings} />
                    <DashboardCard icon={faBellConcierge} color="bg-gradient-to-r from-orange-400 to-orange-200"  title="Reject Bookings" value={rejectBookings} />
                    <DashboardCard icon={faBellConcierge} color="bg-gradient-to-r from-orange-400 to-orange-200"  title="Pending Bookings" value={pendingBookings} />
                    {user.role === 'admin' && (
                        <DashboardCard icon={faDollarSign} color="bg-gradient-to-r from-amber-400 to-amber-200"  title="Total Income" value={totalCommission} />
                    )}
                    <DashboardCard icon={faUser} color="bg-gradient-to-r from-emerald-500 to-emerald-200" title="Active Users" value={activeUsers} />
                </div>
            </div>
        </Content>
    );
}

export default Dashboard;