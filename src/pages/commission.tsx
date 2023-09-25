import Content from "@/components/Content/Content";
import axios from "axios";
import { useEffect, useState } from "react";
import baseUrl from "../../Utils/baseUrl";
import CommissionPopup from "@/components/Commission/CommissionPopup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";

const CommissionPage = () => {
    const [rate, setRate] = useState();
    const [commisionData, setCommisionData] = useState([]);
    // const [loading, setLoading] = useState(true);
    const [showPopup, setShowPopup] = useState(false);
    const [hotels, setHotels] = useState<any>([]);
    const [selectedHotelId, setSelectedHotelId] = useState("");
    const [specialRate, setSpecialRate] = useState(0);

    let token: any 
      if (typeof localStorage !== 'undefined') {
          token = localStorage.getItem("token");
      }

    useEffect(() => {
        async function fetchData() {
            getCommissionRate();
            fetchCommissionData();
            fetchHotels();
        }
        fetchData();
    }, []);

    async function fetchHotels() {
        try {
            const response = await axios.get(`${baseUrl}/hotel/get/all`, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });
            console.log(response.data);
            setHotels(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    async function getCommissionRate() {
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
    }

    async function fetchCommissionData() {
        try {
            // setLoading(true);

            const response = await axios.get(`${baseUrl}/commission`, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            });

            console.log(response.data);
            setCommisionData(response.data);
            // setLoading(false);
        } catch (error) {
            // setLoading(false);
            console.log(error);
        }
    }

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const handleSave = async () => {
       

        try {
            const response = await axios.patch(
                `${baseUrl}/hotel/specialCommissionHotel/${selectedHotelId}`,
                {
                    special_commission: specialRate,
                },
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log("data", response.data);

            if (response.status === 200) {
                alert("Successfully added a special discount");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const updateRate = async (rate: any) => {
        try {
            const response = await axios.post(
                `${baseUrl}/commission/update`,
                {
                    rate,
                },
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                }
            );

            getCommissionRate();
            togglePopup();
        } catch (error) {
            console.log(error);
        }
    };

    const dateConvert = (dateStr: any) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-US", {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    const handleInputChange = (event:any) => {
        const newValue = event.target.value;
        setSpecialRate(newValue);
      };

    return (
        <Content>
            <div className="w-full px-6 py-10 bg-white shadow-md relative">
                <h3 className="text-lg font-semibold text-gray-800">
                    Commission Rate ${rate}%
                </h3>

                <button
                    onClick={togglePopup}
                    className="absolute right-6 top-10 text-2xl text-blue-600 hover:text-gray-700"
                >
                    <FontAwesomeIcon icon={faGear} />
                </button>
            </div>

            <div className="w-full px-6 py-10 bg-white shadow-md relative mt-2">
            <div className="flex justify-between">
                <div className="flex gap-8">
                    <h3 className="text-lg font-semibold text-gray-800">
                        Special Commission Rate:
                    </h3>
                    <input
                        type="number"
                        value={specialRate}
                        onChange={handleInputChange}
                        className="px-6 py-2 border border-slate-400 text-gray-600 text-sm font-semibold focus:outline-none"
                    />
                </div>
                <div className="flex gap-8">
                    <select
                        id="dropdown"
                        value={selectedHotelId}
                        onChange={(e) => setSelectedHotelId(e.target.value)}
                        className="w-full px-6 py-2 border bg-white border-slate-400 text-gray-600 text-sm font-semibold focus:outline-none appearance-none"
                    >
                        <option disabled value="">
                            Select a hotel
                        </option>
                        {hotels.map((hotel:any) => (
                            <option key={hotel.hotel_id} value={hotel._id}>
                                {hotel.property_name}
                            </option>
                        ))}
                    </select>
                    <button
                        onClick={handleSave}
                        className="bg-blue-500 rounded-sm text-white py-2 px-4 hover:bg-blue-700"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>

            {showPopup && (
                <CommissionPopup setShowPopup={setShowPopup} updateRate={updateRate}/>
            )}
        </Content>
    );
};

export default CommissionPage;
