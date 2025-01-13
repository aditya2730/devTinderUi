import Navbar from "./Navbar"
import { Outlet, useNavigate } from "react-router-dom"
import Footer from "./Footer"
import { BASE_URL } from "../utils/contants"
import { useDispatch } from "react-redux"
import { addUser } from "../store/userSlice"
import { useEffect } from "react"

const Body = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const fetchUser = async () => {
        try {
            const URL = BASE_URL + "/profile/view"
            const res = await fetch(URL, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
            })
            const userData = await res.json()
            dispatch(addUser(userData))
        } catch (error) {
            console.log(error) //make error page and redirect to the error page
            return navigate("/login")
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])

    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Body