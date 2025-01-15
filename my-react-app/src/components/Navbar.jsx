import { useSelector, useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { removeUser } from "../store/userSlice"
import { BASE_URL } from "../utils/contants"
import { removeFeed } from "../store/feedSlice"

const Navbar = () => {
    const userData = useSelector(store => store.user)

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const handleLogout = async () => {
        try {
            await fetch(BASE_URL + '/logout', {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            dispatch(removeUser())
            dispatch(removeFeed())
            navigate('/login')
        } catch (error) {
            console.log(error) //make error page and redirect to the error page
        }
    }
    return (
        <div className="navbar bg-base-300 shadow-lg">
            {/* Logo Section */}
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-xl font-bold tracking-wide">
                    DevTinder
                </Link>
            </div>

            {/* User Section */}
            <div className="flex-none gap-4">
                {userData && (
                    <div className="dropdown dropdown-end relative">
                        {/* Avatar Button */}
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-ghost btn-circle avatar hover:bg-base-200 transition duration-200 ease-in-out">
                            <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200">
                                <img
                                    alt="User Avatar"
                                    src={
                                        userData?.photoUrl
                                            ? userData?.photoUrl
                                            : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                    }
                                />
                            </div>
                        </div>

                        {/* Dropdown Menu */}
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-300 text-gray-400 rounded-lg shadow-lg w-52 p-2 mt-2 absolute right-0 z-10">
                            <li>
                                <Link
                                    to="/profile"
                                    className="flex items-center justify-between hover:bg-base-200 rounded-md px-2 py-1 transition">
                                    Profile
                                    <span className="badge bg-blue-500 text-white">New</span>
                                </Link>
                            </li>
                            <li>
                                <a className="hover:bg-base-200 rounded-md px-2 py-1 transition">Settings</a>
                            </li>
                            <li>
                                <a
                                    onClick={handleLogout}
                                    className="hover:bg-red-200 hover:text-red-600 rounded-md px-2 py-1 transition">
                                    Logout
                                </a>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Navbar