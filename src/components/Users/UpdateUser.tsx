import axios from "axios";
import baseUrl from "../../../Utils/baseUrl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

const UpdateUser = ({setShowUpdateUser, userId, fetchUser}:any) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    useEffect(() => {
        fetchOneUser()
    }, [])

    let token: any
    if (typeof localStorage !== 'undefined') {
        token = localStorage.getItem("token");
    }


    const fetchOneUser = async () => {
        try {
            const response = await axios.get(`${baseUrl}/user/${userId}`, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            })
            console.log(response.data)
            setUsername(response.data.username)
            setEmail(response.data.email)
            
        } catch (error) {
            console.log(error)
        }

    }

    const handleClose = () => {
        setShowUpdateUser(false)
    }

    const handleSubmit = async () => {
        try {
            const loginDto = {
                username: username,
                email: email,
                password: password

            };

            console.log(loginDto)
            const response = await axios.patch(`${baseUrl}/user/${userId}`, loginDto)

            console.log(response)
            if (response.status == 201) {
                alert("Updated user profile")
            } 
            
            setShowUpdateUser(false)
            fetchUser()
            
        } catch (error) {
            console.log(error)
        }
    }
    return ( 
        <div className="fixed inset-0 bg-black bg-opacity-40 grid place-items-center z-40 py-20">
        <div className="w-[40vw] max-h-full bg-white rounded-lg relative shadow-md overflow-hidden flex flex-col gap-6 px-8 py-10">
            <button onClick={handleClose} className="absolute right-4 top-4 w-6 h-6 z-50">
                <FontAwesomeIcon icon={faTimes} className="text-red-600 text-xl" />
            </button>
            <div>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                />
            </div>
            <div>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    required
                />
            </div>
            <div>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                />
            </div>

            <button
                onClick={handleSubmit}
                className="py-2 px-6 bg-blue-500 rounded-sm text-white font-semibold mt-auto"
            >
                Add a user
            </button>
        </div>
    </div>
     );
}
 
export default UpdateUser;