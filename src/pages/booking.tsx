import Content from "@/components/Content/Content";
import { Row, TBody, TD, TH, THead, Table } from "@/components/Shared/Table";
import axios from "axios";
import { useEffect, useState } from "react";
import baseUrl from "../../Utils/baseUrl";
import BookingPopup from "@/components/Booking/BookingPopup";

const BookingPage = () => {
    const [bookings, setBookings] = useState([]);
    const [showBooking, setShowBooking] = useState(false);
    const [bookingObj, setBookingObj] = useState({
        arrival_time: "",
        booked_rooms: [],
        commission: 0,
        commission_rate: 0,
        country: "",
        createdAt: "",
        email: "",
        full_name: "",
        hotel_id: {
            _id: '',
            property_name: ''
        },
        is_travelling_for_work: false,
        mobile: "",
        payment_method: "",
        status: 0,
        total: "",
        updatedAt: "",
        user_id: {
            _id: '',
            username: '',
            email: '',
            firstName: '',
            lastName: ''
        },
        __v: 0,
        _id: ""
    })

    let token: any 
      if (typeof localStorage !== 'undefined') {
          token = localStorage.getItem("token");
      }

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await axios.get(`${baseUrl}/booking`, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            });
            console.log(response.data);
            setBookings(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const getPaymentMethod = (type: any) => {
        if (type === 0) {
            return 'Credit/Debit Card';
        } else if (type === 1) {
            return 'Crypto Currency';
        } else {
            return 'On Site';
        }
    }

    //   const toggleDetails = (book:any) => {
    //     setCurrentBooking(book);
    //     console.log(currentBooking);
    //     setShowDetails(true);
    //   }

    //   const closeDetails = () => {
    //     setShowDetails(false);
    //   }

    //   const onSubmit = () => {
    //     fetchBookings();
    //     setShowDetails(false);
    //   }

    const handleView = (book: any) => {
        console.log(book)
        setBookingObj(book)
        setShowBooking(!showBooking)
    }

    const getStatusColor = (status: any) => {
        if (status === 0) {
            return 'bg-yellow-500';
        } else if (status === 1) {
            return 'bg-green-500';
        } else {
            return 'bg-red-500';
        }
    }

    const getStatusText = (status: any) => {
        if (status === 0) {
            return 'PENDING';
        } else if (status === 1) {
            return 'APPROVED';
        } else {
            return 'CANCELLED';
        }
    }

    return (
        <Content>
            <div className="w-full flex flex-col">
                <Table>
                    <THead>
                        <TH title={"ID"} />
                        <TH title={"Hotel"} />
                        <TH title={"Full Name"} />
                        <TH title={"Email"} />
                        <TH title={"Total"} />
                        <TH title={"Rate"} />
                        <TH title={"Commission"} />
                        <TH title={"Hotel Payment"} />
                        <TH title={"Payment Method"} />
                        <TH title={"Status"} />
                        <TH title={"Actions"} />
                    </THead>

                    <TBody>
                        {bookings.map((book: any, index: number) => (
                            <Row key={index}>
                                <TD>{book._id}</TD>
                                <TD>{book.hotel_id.property_name}</TD>
                                <TD>{book.full_name}</TD>
                                <TD>{book.email}</TD>
                                <TD>{book.total}</TD>
                                <TD>{book.commission_rate}</TD>
                                <TD>{(book.commission).toFixed(2)}</TD>
                                <TD>{((book.total) - (book.commission).toFixed(2)).toFixed(2)}</TD>
                                <TD>{getPaymentMethod(book.payment_method)}</TD>
                                <TD><span
                                    className={`px-2 py-[2px] rounded-full text-black ${getStatusColor(book.status)}`}>
                                    {getStatusText(book.status)}
                                </span></TD>

                                <TD>
                                    <div className="w-full flex items-center gap-3">
                                        <button
                                            className="px-4 py-1 text-xs font-semibold bg-gray-600 text-white rounded-md" onClick={() => handleView(book)}>
                                            View
                                        </button>

                                    </div>
                                </TD>
                            </Row>
                        ))}
                    </TBody>
                </Table>
            </div>

            {showBooking && (
                <BookingPopup setShowBooking={setShowBooking} bookingObj={bookingObj} fetchBookings={fetchBookings}/>
            )}
        </Content>
    );
}

export default BookingPage;