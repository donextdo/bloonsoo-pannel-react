import axios from "axios"
import { useEffect, useState } from "react"
import baseUrl from "../../Utils/baseUrl"
import { Row, TBody, TD, TH, THead, Table } from "@/components/Shared/Table"
import AssignHotel from "@/components/Users/AssignHotel"
import AddUser from "@/components/Users/AddUser"
import Content from "@/components/Content/Content"
import RoleUser from "@/components/Users/RoleUser"
import UpdateUser from "@/components/Users/UpdateUser"

const User = () => {
    const [users, setUsers] = useState<any>([])
    const [userId, setUserId] = useState('');
    const [showAssignHotel, setShowAssignHotel] = useState(false);
    const [showAddUser, setShowAddUser] = useState(false);
    const [showRoleUser, setShowRoleUser] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showUpdateUser, setShowUpdateUser] = useState(false);



    useEffect(() => {
        fetchUser()
    }, [])


    let token: any
    if (typeof localStorage !== 'undefined') {
        token = localStorage.getItem("token");
    }


    const fetchUser = async () => {
        try {
            const response = await axios.get(`${baseUrl}/user/get-all-users`, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            })
            console.log(response.data)
            setUsers(response.data)
        } catch (error) {
            console.log(error)
        }

    }

    const toggleAssignHotel = (id: any) => {
        setUserId(id);
        setShowAssignHotel(!showAssignHotel);
    };

    const handleAdduser = (id:any) => {
        setShowAddUser(true)
        setUserId(id);

    }

    const triggerSearch = async () => {
        try {
            // setLoading(true);

            const response = await axios.post(`${baseUrl}/user/search-user`, { query: searchQuery }, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            });

            setUsers(response.data);
            // setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const triggerReset = async () => {
        try {
            await fetchUser();
            setSearchQuery('');
        } catch (error) {
            console.log(error);
        }
    };

    const handleRoleUser = (id: any) => {
        setShowRoleUser(true)
        setUserId(id);

    };

    const handleInactiveUser = async (id: any) => {
        try {
            const response = await axios.patch(`${baseUrl}/user/inactiveUser/${id}`, {}, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            });
            fetchUser();

        } catch (error) {
            console.log(error);
        }


    };

    const handleActiveUser = async (id: any) => {
        try {
            const response = await axios.patch(`${baseUrl}/user/activeUser/${id}`, {}, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            });
            fetchUser();

        } catch (error) {
            console.log(error);
        }

    };


    const handleDeleteUser = async (id: any) => {
        try {
            const response = await axios.delete(`${baseUrl}/user/deleteUser/${id}`, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            });
            fetchUser();

        } catch (error) {
            console.log(error);
        }

    };

    const handleUpdateUser = (id: any) => {
        setShowUpdateUser(true)
        setUserId(id);

    };


    return (

        <Content >

            <div className="w-full flex gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-6 py-2 border border-slate-400 text-gray-600 text-sm font-semibold focus:outline-none"
                />

                <button
                    onClick={triggerSearch}
                    disabled={!searchQuery}
                    className={`py-2 px-6 w-max bg-gray-800 text-white text-sm font-semibold ${!searchQuery ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    Search
                </button>

                <button
                    onClick={triggerReset}
                    className="py-2 px-6 w-max bg-blue-800 text-white text-sm font-semibold">
                    Reset
                </button>

                <button
                    onClick={handleAdduser}
                    className="py-2 px-6 w-max bg-blue-800 text-white text-sm font-semibold">
                    Add a user
                </button>
            </div>

            <Table>
                <THead>
                    <TH title={"Username"} />
                    <TH title={"Email"} />
                    <TH title={"Role"} />
                    <TH title={"Status"} />
                    <TH title={"Actions"} />
                </THead>

                <TBody>
                    {users.map((user: any, index: number) => (
                        <Row key={index}>
                            <TD>{user.username}</TD>
                            <TD>{user.email}</TD>
                            <TD>{user.role}</TD>
                            <TD>{user.status}</TD>
                            <TD>
                                <div className="w-full flex items-center gap-3">
                                    <button
                                        onClick={() => toggleAssignHotel(user._id)}
                                        className="px-4 py-1 text-xs font-semibold bg-green-600 text-white rounded-md">
                                        Assign Hotel
                                    </button>
                                    <button onClick={() => handleDeleteUser(user._id)}
                                        className="px-4 py-1 text-xs font-semibold bg-red-800 text-white rounded-md">
                                        Delete
                                    </button>
                                    <button onClick={() => handleActiveUser(user._id)}
                                        className="px-4 py-1 text-xs font-semibold bg-blue-800 text-white rounded-md">
                                        Active
                                    </button>
                                    <button onClick={() => handleInactiveUser(user._id)}
                                        className="px-4 py-1 text-xs font-semibold bg-blue-800 text-white rounded-md">
                                        Inactive
                                    </button>
                                    <button onClick={() => handleRoleUser(user._id)}
                                        className="px-4 py-1 text-xs font-semibold bg-blue-800 text-white rounded-md">
                                        Role
                                    </button>
                                    <button onClick={() => handleUpdateUser(user._id)}
                                        className="px-4 py-1 text-xs font-semibold bg-gray-500 text-white rounded-md">
                                        Edit
                                    </button>
                                </div>
                            </TD>
                        </Row>
                    ))}
                </TBody>
            </Table>

            {showAssignHotel && (
                <AssignHotel setShowAssignHotel={setShowAssignHotel} userId={userId} />
            )}
            {showAddUser && (
                <AddUser setShowAddUser={setShowAddUser} />
            )}

            {showRoleUser && (
                <RoleUser setShowRoleUser={setShowRoleUser} userId={userId} fetchUser={fetchUser} />
            )}

            {showUpdateUser && (
                <UpdateUser setShowUpdateUser={setShowUpdateUser} userId={userId} fetchUser={fetchUser} />
            )}
        </Content>
    );
}

export default User;