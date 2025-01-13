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
        <div className="navbar bg-base-300">
            <div className="flex-1">
                <Link to='/' className="btn btn-ghost text-xl">DevTinder</Link>
            </div>
            <div className="flex-none gap-2">
                {userData && <div className="dropdown dropdown-end mx-4">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src={userData?.photoUrl ? userData?.photoUrl : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-300 rounded-box z-[1] w-52 p-2 shadow">
                        <li>
                            <Link to='/profile' className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </Link>
                        </li>
                        <li><a>Settings</a></li>
                        <li><a onClick={handleLogout}>Logout</a></li>
                    </ul>
                </div>}
            </div>
        </div>
    )
}

export default Navbar