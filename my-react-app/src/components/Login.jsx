import { useState } from "react"
import { useDispatch } from "react-redux"
import { addUser } from "../store/userSlice"
import { useNavigate } from "react-router-dom"
import { BASE_URL } from "../utils/contants"

const Login = () => {
    const [emailId, setEmailId] = useState('')
    const [password, setPassword] = useState('')
    const [loginError, setLoginError] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const login = async () => {
        const URL = BASE_URL + "/login"
        let payloadObj = {
            emailId: emailId,
            password: password
        }
        try {
            const res = await fetch(URL, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payloadObj)
            })
            const userData = await res.json()
            dispatch(addUser(userData))
            navigate("/")
        } catch (error) {
            console.log(error)
            setLoginError('Invalid password or email')
        }

    }

    return (
        <div className="flex justify-center my-10">
            <div className="card bg-base-300 w-96 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title justify-center">Login</h2>
                    <div>
                        <label className="input input-bordered flex items-center gap-2 my-5">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70">
                                <path
                                    d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                                <path
                                    d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                            </svg>
                            <input type="text" className="grow" placeholder="Email" value={emailId} onChange={(e) => { setEmailId(e.target.value) }} />
                        </label>
                        <label className="input input-bordered flex items-center gap-2 my-5">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70">
                                <path
                                    fillRule="evenodd"
                                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                    clipRule="evenodd" />
                            </svg>
                            <input type="password" className="grow" placeholder="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                        </label>
                    </div>
                    <p className="text-red-500">{loginError}</p>
                    <div className="card-actions justify-center">
                        <button className="btn btn-primary" onClick={login}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login