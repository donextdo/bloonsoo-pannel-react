import { useRouter } from "next/router";

const Navbar = ({ role }: any) => {
    const router = useRouter()
    const logout = () => {
        localStorage.removeItem('token')
        router.push ('/login')
    }
    return (
        <div>
            <nav className="nav h-20 px-4 fixed top-0 right-0 left-0 ml-56 bg-white z-40 shadow-md">
                <div className="w-full h-full flex items-center justify-between">
                    <h4 className="text-base text-gray-600 font-semibold">
                        {role === 'admin' ? 'ADMIN' : 'HOTEL ADMIN'}
                    </h4>

                    {/* radius */}
                    {/* <h3 className="text-lg font-semibold text-gray-800">
                        Radius:
                    </h3>
                    <input
                        type="number"
                        value={addRadius}
                        onChange={(e) => setAddRadius(e.target.value)}
                        className="px-6 py-2 border border-slate-400 text-gray-600 text-sm font-semibold focus:outline-none"
                    />
                    <button
                        onClick={saveToDatabase}
                        className="bg-slate-800 text-white text-sm font-semibold rounded-md py-2 px-6"
                    >
                        Save to Database
                    </button> */}
                    {/* radius */}
                    <button
                        onClick={logout}
                        className="py-2 px-6 bg-slate-800 text-white text-sm font-semibold rounded-md"
                    >
                        Logout
                    </button>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
