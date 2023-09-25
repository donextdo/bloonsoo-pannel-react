import axios from "axios";
import Sidebar from "../Sidebar/Sidebar";
import { useEffect, useState } from 'react';
import baseUrl from "../../../Utils/baseUrl";
import Navbar from "../NavBar/Navbar";


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
const HomePage = () => {
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
        mobile: '',})

    useEffect(() =>{
        fetchUser()
    },[])

    let token: any 
  if (typeof localStorage !== 'undefined') {
      token = localStorage.getItem("token");
  }


    const fetchUser =  async () => {
        try{
            const response =  await axios.get(`${baseUrl}/auth/user`, {
                headers: {
                  'authorization': `Bearer ${token}`
                }
              })
            setUser(response.data)
        }catch (error){
            console.log(error)
        }
        
    }

    return (  
        <div className="bg-gray-100">
            <Sidebar role={user.role}/>
            <Navbar role={user.role}/>
        </div>
    );
}
 
export default HomePage;