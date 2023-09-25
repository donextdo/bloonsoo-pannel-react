import Content from "@/components/Content/Content";
import { Row, TBody, TD, TH, THead, Table } from "@/components/Shared/Table";
import axios from "axios";
import { useEffect, useState } from "react";
import baseUrl from "../../../Utils/baseUrl";
import Link from "next/link";
import AddHotelAdmin from "@/components/Hotels/AddHotelAdmin";

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

const HotelPage = () => {
    const [hotels, setHotels] = useState<any>([]);
    const [showAddHotelAdmin, setShowAddHotelAdmin] = useState(false);
    const [rate, setRate] = useState(0);
    const [endPoint, setEndPoint] = useState('');
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
        fetchUser();
        fetchHotels();
        getCommissionRate();
    }, []);

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


    const fetchHotels = async () => {
        try {
            // setLoading(true);

            if (user.role === 'admin') {
                setEndPoint('get/all')
            } else {
                setEndPoint('get/my')
            }

            const response = await axios.get(`${baseUrl}/hotel/${endPoint}`, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            });
            console.log("hotels", response.data)
            setHotels(response.data);
            // setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const handleHotelStatus = async (id: any, type: any) => {
        try {
            await axios.patch(`${baseUrl}/hotel/${type}/${id}`, {}, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            });

            await fetchHotels();
        } catch (error) {
            console.log(error);
        }
    };

    const handleHotelStatusInactive = async (id:any, type:any) => {
        try {
    
            await axios.patch(`${baseUrl}/hotel/${type}/${id}`, {}, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            })
    
            
            await fetchHotels()
    
        }
        catch (error) {
            console.log(error)
        }
    } 
    

    const getStatusColor = (status: any) => {
        if (status === 'active') {
            return 'bg-green-400';
        } else if (status === 'pending') {
            return 'bg-yellow-500';
        } else {
            return 'bg-red-500';
        }
    };

    const getCommissionRate = async () => {
        try {
            const response = await axios.get(`${baseUrl}/commission/rate`, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });

            setRate(response.data.rate);
        } catch (error) {
            console.log(error);
        }
    };

    const toggleAddHotelAdmin = () => {
        setShowAddHotelAdmin(true)
    }

    return (
        <Content>
            <div className="w-full flex flex-col">

                {user.role === 'admin' && (
                    <button
                        onClick={toggleAddHotelAdmin}
                        className="py-2 px-6 mb-6 w-max bg-gray-800 text-white text-sm font-semibold rounded-md">
                        Create Hotel Manager
                    </button>
                )}

                {/* {loading && <Spinner className="mx-auto" />} */}


                <Table>
                    <THead>

                        <TH title={"Property Name"} />
                        <TH title={"Contact Name"} />
                        <TH title={"Contact Mobile"} />
                        <TH title={"Address"} />
                        <TH title={"User"} />
                        <TH title={"Hotel Commission"} />
                        <TH title={"Status"} />
                        <TH title={"Actions"} />

                    </THead>
                    <TBody>
                        {hotels.map((hotel: any, index: number) => (
                            <Row key={index}>
                                <TD>
                                    <a
                                        href={`/hotels/${hotel._id}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-900 font-semibold">
                                        {hotel.property_name}
                                    </a>
                                </TD>
                                <TD>{hotel.contact_name}</TD>
                                <TD>{hotel.contact_phone_number}</TD>
                                <TD>
                                    <p>{hotel.property_address.street_address},</p>
                                    <p>{hotel.property_address.country}</p>
                                </TD>
                                <TD>{hotel.user?.username}</TD>
                                <TD>
                                    {hotel.special_commission ? hotel.special_commission : rate}
                                </TD>
                                <TD>
                                    <span
                                        className={`px-2 py-[2px] rounded-full text-black ${getStatusColor(hotel.status)}`}>
                                        {hotel.status}
                                    </span>
                                </TD>
                                <TD>
                                    <div className="w-full flex items-center gap-3">
                                        <Link
                                            href={`/hotels/${hotel._id}/basic-information`}
                                            className="px-4 py-1 text-xs font-semibold bg-gray-800 text-white rounded-md"
                                        >
                                            View
                                        </Link>

                                        <Link
                                            href={`/hotels/rooms/${hotel._id}`}
                                            className="px-4 py-1 text-xs font-semibold bg-gray-600 text-white rounded-md"
                                        >
                                            Rooms
                                        </Link>

                                        {user.role === 'admin' && (hotel.status === 'pending' || hotel.status === 'inactive') && (
                                            <button
                                                onClick={() => handleHotelStatus(hotel._id, 'approve')}
                                                className="px-4 py-1 text-xs font-semibold bg-green-600 text-white rounded-md"
                                            >
                                                Approve
                                            </button>
                                        )}

                                        {user.role === 'admin' && hotel.status === 'pending' && (
                                            <button
                                                onClick={() => handleHotelStatus(hotel._id, 'reject')}
                                                className="px-4 py-1 text-xs font-semibold bg-red-600 text-white rounded-md"
                                            >
                                                Reject
                                            </button>
                                        )}

                                        {user.role === 'hotel-admin' && !hotel.is_open_to_bookings && (
                                            <button
                                                onClick={() => handleHotelStatus(hotel._id, 'publish')}
                                                className="px-4 py-1 text-xs font-semibold bg-blue-800 text-white rounded-md"
                                            >
                                                Publish
                                            </button>
                                        )}

                                        {user.role === 'hotel-admin' && hotel.is_open_to_bookings && (
                                            <button
                                                onClick={() => handleHotelStatus(hotel._id, 'unpublish')}
                                                className="px-4 py-1 text-xs font-semibold bg-red-500 text-white rounded-md"
                                            >
                                                Unpublish
                                            </button>
                                        )}

                                        <button
                                            onClick={() => handleHotelStatus(hotel._id, 'inactive')}
                                            className="px-4 py-1 text-xs font-semibold bg-red-800 text-white rounded-md"
                                        >
                                            Delete
                                        </button>

                                        {user.role === 'admin' && hotel.status === 'active' && (
                                            <button
                                                onClick={() => handleHotelStatusInactive(hotel._id, 'inactive')}
                                                className="px-4 py-1 text-xs font-semibold bg-blue-800 text-white rounded-md"
                                            >
                                                Inactive
                                            </button>
                                        )}
                                    </div>
                                </TD>
                            </Row>
                        ))}
                    </TBody>
                </Table>


                {showAddHotelAdmin && (
                <AddHotelAdmin setShowAddHotelAdmin={setShowAddHotelAdmin}/>
            )}
            </div>
        </Content>
    );
}

export default HotelPage;