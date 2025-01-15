import EditProfile from "./EditProfile"
import { useSelector } from "react-redux"

const Profile = () => {

    const userData = useSelector((store) => store.user)

    return (
        <div>
            {
                userData && <EditProfile userData={userData} />
            }
        </div>
    )
}

export default Profile