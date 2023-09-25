import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import baseUrl from "../../../Utils/baseUrl";
import { FaCaretDown } from "react-icons/fa";

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

interface Hotel {
    breakfast: boolean;
    contact_name: string;
    contact_phone_number: string;
    contact_phone_number_alternative: string;
    cover_image: string;
    createdAt: string;
    credit_card_options: boolean;
    extra_beds: boolean;
    extra_beds_options: null;
    facilities: string[];
    gallery_images: string[];
    is_open_to_bookings: boolean;
    is_own_multiple_hotels: boolean;
    languages: string[];
    parking: boolean;
    parking_details: string;
    policies: string;
    property_address: string;
    property_name: string;
    rooms: string[];
    star_rating: string;
    status: string;
    updatedAt: string;
    use_channel_manager: boolean;
    user: string;
    __v: number;
    _id: string;
}

const OfferPopup = ({ setShowOffer }: any) => {
    const [inputValue, setInputValue] = useState('');
    const [startDate, setStartDate] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [daysToExpire, setDaysToExpire] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [endPoint, setEndPoint] = useState('');
    const [hotels, setHotels] = useState<any>([]);
    const [selectedHotelId, setSelectedHotelId] = useState("");
    const [textarea, setTextarea] = useState('');
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

    const [oneHotel, setoneHotel] = useState({
        about: "",
        amenities: [],
        breakfast: false,
        contact_name: "",
        contact_phone_number: "",
        contact_phone_number_alternative: "",
        cover_image: "",
        createdAt: "",
        credit_card_options: false,
        extra_beds: false,
        extra_beds_options: {
            no_of_beds: 0,
            accommodate_guests: [],
            _id: ''
        },
        facilities: [],
        gallery_images: [],
        is_open_to_bookings: false,
        is_own_multiple_hotels: false,
        languages: [],
        parking: false,
        parking_details: {
            parking_type: '',
            parking_type_2: '',
            parking_type_3: '',
            reservation: false,
            parking_price: '',
            // ...
        },
        policies: {
            cancellation_duration: 0,
            pay_time: '',
            preventAccidental_bookings: false,
            check_in_form: '',
            check_in_untill: '',
            check_out_untill: '',
            check_out_form: '',
            // ...
        },
        property_address: {
            street_address: '',
            country: '',
            postal_code: '',
            _id: ''
        },
        property_name: "",
        rooms: [],
        star_rating: "",
        status: "",
        updatedAt: "",
        use_channel_manager: false,
        user: "",
        __v: 0,
        _id: ""
    });
    useEffect(() => {
        fetchUser()
        fetchHotels();
        calculateDate()
    }, [startDate, expiryDate]);

    const calculateDate = () => {
        if (startDate && expiryDate) {
            const start = new Date(startDate);
            const expiry = new Date(expiryDate);
            const timeDiff = expiry.getTime() - start.getTime();
            const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
            setDaysToExpire(daysDiff);
        }
    }


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

    const handleClose = () => {
        setShowOffer(false)
    }

    const handleGenerateRandomWord = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let randomWord = '';
        for (let i = 0; i < 5; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            randomWord += characters.charAt(randomIndex);
        }
        setInputValue(randomWord);
    };

    const hotelObject = async (e: any) => {
        const id = e.target.value
        setSelectedHotelId(e.target.value)

        const response = await axios.get(`${baseUrl}/hotel/${id}`, {
            headers: {
                'authorization': `Bearer ${token}`
            }
        });
        console.log(response.data)
        console.log(id)
        setoneHotel(response.data)
    }

    const handleSave = async () => {
        const offer = {
            offer_code: inputValue,
            expiredate: expiryDate,
            startdate: startDate,
            days: daysToExpire,
            discount: discount,
            note: textarea,
            hotel_id: selectedHotelId,
            hotel_name:oneHotel.property_name
        }

        const response = await axios.post(`${baseUrl}/offer/insert`, offer, {
            headers: {
                'authorization': `Bearer ${token}`
            }
        });
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-5 backdrop-blur-sm grid place-items-center z-20">
            <div className="w-96 h-[70vh] overflow-y-auto py-8 px-6 bg-white shadow-lg flex flex-col gap-6 rounded-md relative">
                <button
                    onClick={handleClose}
                    className="absolute right-4 top-4 w-6 h-6 z-50"
                >
                    <FontAwesomeIcon icon={faTimes} className="text-red-600 text-xl" />
                </button>

                <div className=" mt-4 w-full space-y-4">
                    <div className="flex flex-col space-y-2">
                        <label className="text-sm font-medium">
                            Enter up to 5 numbers and capital letters:
                        </label>
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="w-full border rounded px-2 py-1 focus:outline-none focus:ring focus:border-blue-300 uppercase "
                            maxLength={5}
                        />
                    </div>
                    <button onClick={handleGenerateRandomWord} className="py-2 px-6 bg-blue-500 rounded-sm text-white font-semibold w-full">Generate Random Word</button>

                    <div className="flex flex-col space-y-2">
                        <label>Start Date </label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-full border rounded px-2 py-1 focus:outline-none focus:ring focus:border-blue-300 "
                        />
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label>Expiry Date </label>
                        <input
                            type="date"
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(e.target.value)}
                            className="w-full border rounded px-2 py-1 focus:outline-none focus:ring focus:border-blue-300 "
                        />
                    </div>

                    <div>
                        Days to Expire: <span className="font-bold text-md">{daysToExpire} days</span>
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label>Discount </label>
                        <input
                            type="number"
                            value={discount}
                            onChange={(e) => setDiscount(Number(e.target.value))}
                            className="w-full border rounded px-2 py-1 focus:outline-none focus:ring focus:border-blue-300 "
                        />
                    </div>

                    <div className="flex flex-col space-y-2">
                        <label>Select a hotel </label>
                        <div className="w-full h-max relative">
                            <select
                                id="dropdown"
                                value={selectedHotelId}
                                onChange={hotelObject}
                                className="w-full px-6 py-2 border bg-white border-slate-400 text-gray-600 text-sm font-semibold focus:outline-none appearance-none"
                            >
                                <option disabled value="">
                                    Select a hotel
                                </option>
                                {hotels.map((hotel: any) => (
                                    <option key={hotel.hotel_id} value={hotel._id}>
                                        {hotel.property_name}
                                    </option>
                                ))}
                            </select>
                            <FaCaretDown
                                className="text-gray-600 text-lg absolute right-4 top-0 bottom-0 my-auto cursor-pointer pointer-events-none"
                            />
                        </div>

                    </div>

                    <div className="flex flex-col space-y-2">
                        <label> Note</label>
                        <textarea
                            rows={4}
                            value={textarea}
                            onChange={(e) => setTextarea(e.target.value)}
                            className="w-full border rounded px-2 py-1 focus:outline-none focus:ring focus:border-blue-300 "
                        />
                    </div>

                    <button
                        onClick={handleSave}
                        className="bg-blue-500 rounded-sm text-white py-2 px-4 hover:bg-blue-700 w-full"
                    >
                        Save
                    </button>

                </div>
            </div>
        </div>
    );
}

export default OfferPopup;