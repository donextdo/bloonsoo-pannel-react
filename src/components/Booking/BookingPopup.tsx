import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import baseUrl from "../../../Utils/baseUrl";

const BookingPopup = ({ setShowBooking, bookingObj, fetchBookings }: any) => {
    let token: any
    if (typeof localStorage !== 'undefined') {
        token = localStorage.getItem("token");
    }

    const handleClose = () => {
        setShowBooking(false)
    }

    const dateConvert = (dateStr: any) => {
        const date = new Date(dateStr)

        return date.toLocaleDateString("en-US", { weekday: "short", year: "numeric", month: "short", day: "numeric" })
    }

    const handleApprove = async (bookingObj: any) => {
        try {
            //   setApproveLoading(true);
            const res = await axios.patch(`${baseUrl}/booking/approve/${bookingObj._id}`, {}, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            });

            const payment = {
                hotel_name: bookingObj.hotel_id.property_name,
                total_sale_amount: bookingObj.total,
                amount: bookingObj.total - bookingObj.commission,
                bloonsoo_discount: 10,
                hotel_discount: 10,
                commission_rate: bookingObj.commission_rate,
                commission: bookingObj.commission,

            }

            const response = await axios.post(`${baseUrl}/payment`, payment, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            });

            fetchBookings()
            setShowBooking(false)
        } catch (error) {
            console.log(error);
        }
    };

    const handleReject = async (id: any) => {
        try {
            //   setRejectLoading(true);
            const res = await axios.patch(`${baseUrl}/booking/cancel/${id}`, {}, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            });

            fetchBookings()
            setShowBooking(false)

        } catch (error) {
            console.log(error);
        }
    };
    console.log("bookingObj", bookingObj)
    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 grid place-items-center z-40 py-20">
            <div className="w-[60vw] max-h-full bg-white rounded-lg relative shadow-md overflow-visible flex flex-col gap-6 px-8 py-10 overflow-y-auto !scrollbar-thin !scrollbar-track-transparent !scrollbar-thumb-gray-500">

                <button onClick={handleClose} className="absolute right-4 top-4 w-6 h-6 z-50">
                    <FontAwesomeIcon icon={faTimes} className="text-red-600 text-xl" />
                </button>

                <div className="flex flex-col pb-5 gap-2 border-b border-gray-400">
                    <h3 className="text-xl font-semibold">
                        {bookingObj.hotel_id.property_name}
                    </h3>
                </div>

                {bookingObj.status === 0 ?
                    <div className="flex flex-col pb-5 gap-2 border-b border-gray-400">
                        <h3 className="text-base font-medium">
                            {bookingObj.full_name.substring(0, 3)}***
                        </h3>
                        <h3 className="text-base font-medium">
                            {bookingObj.country.substring(0, 3)}***
                        </h3>
                        <h3 className="text-base font-medium">
                            {bookingObj.email.substring(0, 3)}***
                        </h3>
                        <h3 className="text-base font-medium">
                            {bookingObj.mobile.substring(0, 3)}***
                        </h3>
                    </div> :
                    bookingObj.status === 1 ?
                        <div className="flex flex-col pb-5 gap-2 border-b border-gray-400">
                            <h3 className="text-base font-medium">
                                {bookingObj.full_name}
                            </h3>
                            <h3 className="text-base font-medium">
                                {bookingObj.country}
                            </h3>
                            <h3 className="text-base font-medium">
                                {bookingObj.email}
                            </h3>
                            <h3 className="text-base font-medium">
                                {bookingObj.mobile}
                            </h3>
                        </div>
                        : ''
                }
                {/* <div className="flex flex-col pb-5 gap-2 border-b border-gray-400">
                    <h3 className="text-base font-medium">
                        {bookingObj.full_name}
                    </h3>
                    <h3 className="text-base font-medium">
                        {bookingObj.country}
                    </h3>
                    <h3 className="text-base font-medium">
                        {bookingObj.email}
                    </h3>
                    <h3 className="text-base font-medium">
                        {bookingObj.mobile}
                    </h3>
                </div> */}

                {bookingObj.booked_rooms.map((book: any, index: number) => (
                    <section key={index} className="flex flex-col gap-6">
                        <div className="flex flex-col pb-5 gap-4 border-b border-gray-400">
                            <h4 className="text-base font-semibold text-gray-900">
                                Total length of stay:
                                <span className="font-medium">
                                    {`${book.nights} nights ${book.adults} adults ${book.children > 0 ? `${book.children} children` : ''}`}
                                </span>
                            </h4>
                            <div className="w-2/5 grid grid-cols-2 gap-4 text-sm text-gray-900">
                                <div className="flex flex-col gap-2">
                                    <span className="font-medium">Check In</span>
                                    <span className="font-semibold">{dateConvert(book.check_in)}</span>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <span className="font-medium">Check Out</span>
                                    <span className="font-semibold">{dateConvert(book.check_out)}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col pb-5 gap-2 border-b border-gray-400">
                            <h4 className="text-base font-semibold">
                                {`${book.rooms} x ${book.room_name} ${book.room_type}`}
                            </h4>
                        </div>
                        <div className="flex items-center justify-between pb-5 gap-2 border-b border-gray-400">
                            <h3 className="text-lg font-bold">Price</h3>
                            <h3 className="text-lg font-bold">{book.total}</h3>
                        </div>
                    </section>
                ))}

                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">Commission Rate</h3>
                        <h3 className="text-lg font-medium">{bookingObj.commission_rate}%</h3>
                    </div>
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">Commission for bloonsoo</h3>
                        <h3 className="text-lg font-medium">USD {bookingObj.commission.toFixed(2)}</h3>
                    </div>
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">Hotel Payment</h3>
                        <h3 className="text-lg font-medium">
                            USD {((bookingObj.total) - (bookingObj.commission.toFixed(2))).toFixed(2)}
                        </h3>
                    </div>
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold">Total Price</h3>
                        <h3 className="text-lg font-bold">{bookingObj.total}</h3>
                    </div>
                    <div className="flex items-center gap-4 mt-6 justify-end">
                        {(bookingObj.status == 0 || bookingObj.status == 1 )&& (
                            <button
                                onClick={() => handleApprove(bookingObj)}
                                className="py-2 px-6 bg-blue-500 rounded-sm text-white font-semibold"
                            >
                                Approve
                            </button>
                        )}
                        {bookingObj.status == 0 && (
                            <button
                                onClick={() => handleReject(bookingObj._id)}
                                className="py-2 px-6 bg-red-500 rounded-sm text-white font-semibold"
                            >
                                Reject
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookingPopup;