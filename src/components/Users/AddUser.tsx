import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";
import baseUrl from "../../../Utils/baseUrl";

const AddUser = ({ setShowAddUser, fetchUser }: any) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [formError, setFormError] = useState(false);


    const handleClose = () => {
        setShowAddUser(false)
    }

    const handleSubmit = async () => {
        if (passwordError) {
            setFormError(true);
        } else {
            try {
                const loginDto = {
                    username: username,
                    email: email,
                    password: password

                };

                console.log(loginDto)
                const response = await axios.post(`${baseUrl}/auth/signup`, loginDto)

                console.log(response)
                if (response.status == 201) {
                    alert("created a user")
                     setShowAddUser(false)
                    fetchUser()

                }

            } catch (error) {
                console.log(error)
            }
        }

    }

    const handlePasswordChange = (e: any) => {
        const newPassword = e.target.value;
        setPassword(newPassword);

        if (newPassword.length < 6) {
            setPasswordError('Password must be at least 6 characters long');
        } else {
            setPasswordError('');
        }
    };
    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 grid place-items-center z-40 py-20">
            <div className="w-[40vw] max-h-full bg-white rounded-lg relative shadow-md overflow-hidden flex flex-col gap-6 px-8 py-10">
                {/* <form className="flex flex-col gap-6" onSubmit={handleSubmit}> */}

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
                            onChange={handlePasswordChange}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        />
                        {formError && <div className="text-red-500">{passwordError}</div>}
                    </div>
        
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="py-2 px-6 bg-blue-500 rounded-sm text-white font-semibold mt-auto"
                    >
                        Add a user
                    </button>
                {/* </form> */}
            </div>
        </div>
    );
}

export default AddUser;