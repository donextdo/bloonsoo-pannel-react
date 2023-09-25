import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import baseUrl from "../../../Utils/baseUrl";
import axios from "axios";

const RoleUser = ({setShowRoleUser, userId, fetchUser}:any) => {
    let token: any 
    if (typeof localStorage !== 'undefined') {
        token = localStorage.getItem("token");
    }
    
    const handleClose = () => {
        setShowRoleUser(false)
    }

    const handleAdmin = async () => {
        try {
            const response = await axios.patch(`${baseUrl}/user/user-admin/${userId}`, {}, 
            {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            }
            )

            console.log(response.data)
            // if (response.status == 201) {
            //     alert("created a user")
            // } 
        setShowRoleUser(false)
            fetchUser()
            
        } catch (error) {
            console.log(error)
        }
    }

    const handleHotelAdmin = async () => {
        try {
            const response = await axios.patch(`${baseUrl}/user/user-hotel-admin/${userId}`, {},
            {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            }
            )

            console.log(response.data)
            // if (response.status == 201) {
            //     alert("created a user")
            // } 
        setShowRoleUser(false)
            fetchUser()
            
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 grid place-items-center z-40 py-20">
            <div className="w-[20vw] max-h-full bg-white rounded-lg relative shadow-md overflow-hidden flex flex-col gap-6 px-8 py-10">
                <button onClick={handleClose} className="absolute right-4 top-4 w-6 h-6 z-50">
                    <FontAwesomeIcon icon={faTimes} className="text-red-600 text-xl" />
                </button>

                <h1 className="mt-4 text-center text-lg">Change user role</h1>

                <div className="flex justify-between mt-4">
                    <button
                        onClick={() => handleAdmin()}
                        className="py-2 px-6 bg-blue-500 rounded-sm text-white font-semibold"
                    >
                        Admin
                    </button>
                    <button
                        onClick={handleHotelAdmin}
                        className="py-2 px-6 bg-red-500 rounded-sm text-white font-semibold"
                    >
                        Hotel Admin
                    </button>
                </div>
            </div>
        </div>
    );
}

export default RoleUser;