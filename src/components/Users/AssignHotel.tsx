import axios from "axios";
import { useEffect, useState } from "react";
import baseUrl from "../../../Utils/baseUrl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const AssignHotel = ({userId, setShowAssignHotel}:any) => {
    const [hotelList, setHotelList] = useState<any> ([])
    const [hotelIds, setHotelIds] = useState<any> ([])
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() =>{
        fetchHotel()
    },[])

    let token: any 
  if (typeof localStorage !== 'undefined') {
      token = localStorage.getItem("token");
  }


    const fetchHotel =  async () => {
        try{
            const response =  await axios.get(`${baseUrl}/hotel/get/all`, {
                headers: {
                  'authorization': `Bearer ${token}`
                }
              })
              setHotelList(response.data)
        }catch (error){
            console.log(error)
        }
        
    }

    const assignHotel = async () => {
        try {
            // setTimeout(() => {
            //     setHotelIdsError(false);
            // }, 3000);

            // if (hotelIds.length === 0) {
            //     setHotelIdsError(true);
            //     return;
            // }

            // setLoading(true);

            const dto = {
                userId: userId,
                hotelIds: hotelIds,
            };

            console.log(dto);

            const response = await axios.patch(
                `${baseUrl}/user/hotels/assign-hotels`,
                dto,
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                }
            );

            setHotelIds([]);
            // setLoading(false);
            // Assuming emits function is passed as a prop
            
        } catch (error) {
            console.log(error);
        }
    }

    const handleClose = () => {
        setShowAssignHotel(false)
    }

    const triggerSearch = async () => {
        try {
            const response = await axios.post(`${baseUrl}/hotel/search-by-name`, { query: searchQuery }, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });

            setHotelList(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const triggerReset = () => {
        setSearchQuery('');
        fetchHotel();
    };

    return ( 
        <div className="fixed inset-0 bg-black bg-opacity-40 grid place-items-center z-40 py-20">
        <div className="w-[40vw] max-h-full bg-white rounded-lg relative shadow-md overflow-hidden flex flex-col gap-6 px-8 py-10">
          <div className="w-full flex gap-4 mb-6">
            <input
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
            <button
              onClick={triggerSearch}
              disabled={!searchQuery}
              className="py-2 px-6 w-max bg-gray-800 text-white text-sm font-semibold"
            >
              Search
            </button>
            <button
              onClick={triggerReset}
              className="py-2 px-6 w-max bg-blue-800 text-white text-sm font-semibold"
            >
              Reset
            </button>
          </div>
  
          <div className="flex flex-col gap-6 overflow-y-hidden h-[24rem]">
            
            <h4 className="text-lg text-gray-700 font-medium">Select Property</h4>
            
            <div className="w-full flex flex-col border border-gray-300 h-full relative overflow-visible overflow-y-scroll scrollbar-default scrollbar-track-transparent scrollbar-thumb-gray-500">
              {hotelList.map((hotel:any, index:number) => (
                <div key={index} className="p-3 flex items-center gap-4 border-b border-gray-200">
                  <input
                    type="checkbox"
                    value={hotel._id}
                    checked={hotelIds.includes(hotel._id)}
                    onChange={() => {
                      if (hotelIds.includes(hotel._id)) {
                        setHotelIds(hotelIds.filter((id:any) => id !== hotel._id));
                      } else {
                        setHotelIds([...hotelIds, hotel._id]);
                      }
                    }}
                    className="w-4 h-4 border-2 border-[#3A1C61] text-gray-600 text-sm font-semibold focus:outline-none bg-transparent"
                  />
                  <label htmlFor="" className="text-base text-gray-600 font-semibold">
                    {hotel.property_name}
                  </label>
                </div>
              ))}
            </div>
          </div>
  
          <button
            onClick={assignHotel}
            className="py-2 px-6 bg-blue-500 rounded-sm text-white font-semibold mt-auto"
          >
            Assign Hotel(s)
          </button>
  
          <button onClick={handleClose} className="absolute right-4 top-4 w-6 h-6 z-50">
            <FontAwesomeIcon icon={faTimes} className="text-red-600 text-xl" />
          </button>
        </div>
      </div>
     );
}
 
export default AssignHotel;