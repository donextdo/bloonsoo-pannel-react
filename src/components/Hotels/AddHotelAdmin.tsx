import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextInput from "../Shared/TextInput";
import { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../../../Utils/baseUrl";

const AddHotelAdmin = ({ setShowAddHotelAdmin }: any) => {
    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState(false);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [hotelIds, setHotelIds] = useState<any>([])
    const [hotelList, setHotelList] = useState<any>([])

    useEffect(()=>{
        fetchHotelList()
    },[])
    let token: any
  if (typeof localStorage !== 'undefined') {
      token = localStorage.getItem("token");
  }

    const handleClose = () => {
        setShowAddHotelAdmin(false)
    }

    const addHotelAdmin = async () => {
        try {
            // setTimeout(() => {
            //     setHotelIdsError(false);
            //     setUsernameError(false);
            //     setEmailError(false);
            //     setPasswordError(false);
            // }, 3000);

            // if (hotelIds.length === 0) {
            //     setHotelIdsError(true);
            //     return;
            // }

            if (password !== confirmPassword) {
                setPasswordError(true);
                return;
            }

            // setApproveLoading(true);

            const userDto = {
                username,
                email,
                password,
                hotelIds,
            };

            const response = await axios.post(`${baseUrl}/user/create-hotel-admin`, userDto, {
                headers: {
                    'authorization': `Bearer ${token}`,
                },
            });

            setUsername('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setHotelIds([]);

            // setApproveLoading(false);
        } catch (error:any) {
            // setApproveLoading(false);
            if (error.response && error.response.data) {
                if (error.response.data.duplicate) {
                    if (error.response.data.duplicate[0] === 'username') {
                        setUsernameError(true);
                    } else if (error.response.data.duplicate[0] === 'email') {
                        setEmailError(true);
                        setEmailErrorMessage('Email already registered');
                    }
                }
            }
            console.log(error);
        }
    }

    async function fetchHotelList() {
        try {
            const response = await axios.get(`${baseUrl}/hotel/get/user-not-exist/list`, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            })
    
            setHotelList(response.data)
        }
        catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 grid place-items-center z-40 py-20">
            <div className="w-[65vw] max-h-full bg-white rounded-lg relative shadow-md overflow-hidden flex flex-col gap-6 px-8 py-10">
                <div className="w-full grid grid-cols-2 gap-6">
                    <div className="flex flex-col gap-6 h-[24rem]">
                        <h4 className="text-lg text-gray-700 font-medium">User Information</h4>
                        <TextInput
                            placeholder="Username"
                            value={username}
                            onChange={(e: any) => setUsername(e.target.value)}
                        />

                        <TextInput
                            placeholder="Email"
                            value={email}

                        />

                        <TextInput
                            type="password"
                            placeholder="Password"
                            value={password}

                        />
                        <TextInput
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}

                        />

                        <button
                            onClick={addHotelAdmin}
                            className="py-2 px-6 bg-blue-500 rounded-sm text-white font-semibold mt-auto"
                        >
                            Create User
                        </button> 
                    </div>
                    <div className="flex flex-col gap-6 overflow-y-hidden h-[24rem]">
                        <h4 className="text-lg text-gray-700 font-medium">Select Property</h4>
                        {/* {hotelIdsError && (
                            <p className="text-sm text-red-500 font-medium">Please select property</p>
                        )} */}
                        <div className="w-full flex flex-col border border-gray-300 h-full relative overflow-visible overflow-y-auto">
                            {hotelList.map((hotel:any, index:number) => (
                                <div
                                    key={index}
                                    className="p-3 flex items-center gap-4 border-b border-gray-200"
                                >
                                    <input
                                        type="checkbox"
                                        value={hotel._id}
                                        onChange={() => {
                                            const updatedHotelIds = hotelIds.includes(hotel._id)
                                                ? hotelIds.filter((id:any) => id !== hotel._id)
                                                : [...hotelIds, hotel._id];
                                            setHotelIds(updatedHotelIds);
                                        }}
                                        className="w-4 h-4 border-2 border-[#3A1C61] text-gray-600 text-sm font-semibold focus:outline-none bg-transparent"
                                    />
                                    <label
                                        className="text-base text-gray-600 font-semibold"
                                    >
                                        {hotel.property_name}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <button
                    onClick={handleClose}
                    className="absolute right-4 top-4 w-6 h-6 z-50"
                >
                    <FontAwesomeIcon icon={faTimes} className="text-red-600 text-xl" />
                </button>
            </div>
        </div>
    );
}

export default AddHotelAdmin;