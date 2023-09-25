import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";
import baseUrl from "../../../Utils/baseUrl";
import ada from '../../../assets/hero.png'
import Image from "next/image";
import { useRouter } from "next/router";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [keepMeLoggedIn, setKeepMeLoggedIn] = useState(false);
    const [usernameNotFoundError, setUsernameNotFoundError] = useState(false);
    const [passwordInvalidError, setPasswordInvalidError] = useState(false);
    const [notAnAdminError, setNotAnAdminError] = useState(false);
    const router = useRouter()

    const handleClick = async () => {
        try {
            const loginDto = {
                email: username,
                password: password
            };

            const response = await axios.post(`${baseUrl}/auth/admin/login`, loginDto, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = response.data;
            console.log(data);

            localStorage.setItem('token', data.token);
            // localStorage.setItem('keepLoggedIn', keepMeLoggedIn);

            if(response.status === 200){
                router.push("/")
            }
            

        } catch (error:any) {
            if (error.response) {
                if (error.response.data.code) {
                    if (error.response.data.code === 'USER_NOT_FOUND') {
                        setTimeout(() => {
                            setUsernameNotFoundError(false);
                        }, 5000);
                        setUsernameNotFoundError(true);
                    } else if (error.response.data.code === 'INVALID_PASSWORD') {
                        setTimeout(() => {
                            setPasswordInvalidError(false);
                        }, 5000);
                        setPasswordInvalidError(true);
                    } else if (error.response.data.code === 'NOT_AN_ADMIN') {
                        setTimeout(() => {
                            setNotAnAdminError(false);
                        }, 5000);
                        setNotAnAdminError(true);
                    }
                } else {
                    console.log(error.response.data.message);
                }
            } else {
                console.error(error);
            }
        }
    };
    
    return ( 
        <section className=" relative h-full w-full">
            
            <div className="w-full h-screen">
                <Image
                    src={ada}
                    alt="background image"
                    className='object-cover w-full h-full'
                />

            </div>
            <div className="w-full h-full px-12 absolute right-0 top-0 md:w-1/2 bg-white bg-opacity-60 backdrop-blur-sm flex flex-col justify-center gap-6 ">
                <h3 className="text-4xl font-semibold mb-6">Login</h3>

                <div className="relative w-full mb-2">
                    <input
                        type="email"
                        placeholder="Email or Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full pl-12 pr-6 py-3 border-2 border-[#3A1C61] text-gray-600 text-sm font-semibold focus:outline-none bg-transparent"
                    />
                    <FontAwesomeIcon
                        icon={faUser}
                        className="text-[#3A1C61] text-xl absolute left-4 top-0 bottom-0 my-auto"
                    />
                    {usernameNotFoundError && (
                        <small className="text-xs font-semibold text-red-700 absolute left-0 -bottom-5">
                            Cannot find username or email
                        </small>
                    )}
                </div>

                <div className="relative w-full mb-2">
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-12 pr-6 py-3 border-2 border-[#3A1C61] text-gray-600 text-sm font-semibold focus:outline-none bg-transparent"
                    />
                    <FontAwesomeIcon
                        icon={faLock}
                        className="text-[#3A1C61] text-xl absolute left-4 top-0 bottom-0 my-auto"
                    />
                    {passwordInvalidError && (
                        <small className="text-xs font-semibold text-red-700 absolute left-0 -bottom-5">
                            Invalid Password
                        </small>
                    )}
                </div>

                <div className="flex items-center mb-2">
                    <input
                        type="checkbox"
                        id="checkbox-1"
                        checked={keepMeLoggedIn}
                        onChange={(e) => setKeepMeLoggedIn(e.target.checked)}
                        className="w-4 h-4 border-2 border-[#3A1C61] text-gray-600 text-sm font-semibold focus:outline-none bg-transparent"
                    />
                    <label htmlFor="checkbox-1" className="ml-2 text-sm text-gray-600">
                        Keep me logged in
                    </label>
                </div>

                <button
                    onClick={handleClick}
                    className="w-full py-3 bg-[#3A1C61] text-white font-semibold text-base rounded-lg hover:bg-blue-900 text-bold"
                >
                    Login
                </button>

                {notAnAdminError && (
                    <small className="text-xs font-semibold text-red-700">
                        You are not an admin
                    </small>
                )}

                <a href="#" className="ml-auto text-sm font-semibold">
                    Forgot Password ?
                </a>
            </div>
        </section>
     );
}
 
export default Login;