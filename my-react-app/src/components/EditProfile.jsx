import { useState } from "react"
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/contants";

const EditProfile = ({ userData }) => {

    const [firstName, setFirstName] = useState(userData.firstName)
    const [lastName, setLastName] = useState(userData.lastName)
    const [age, setAge] = useState(userData.age)
    const [gender, setGender] = useState(userData.gender)
    const [bio, setBio] = useState(userData.bio)
    const [photoUrl, setPhotoUrl] = useState(userData.photoUrl)

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            setPhotoUrl(objectUrl); // Set the image URL
        }
    };

    const handleEditProfile = async () => {
        const Url = BASE_URL + '/profile/edit'
        const payloadObj = {
            firstName: firstName,
            lastName: lastName,
            age: age,
            gender: gender,
            bio: bio,
            photoUrl: photoUrl
        }
        try {
            console.log(payloadObj)
            const res = await fetch(Url, {
                method: "PATCH",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payloadObj)
            })

            const editProfileSuccessResponse = await res.json()
            console.log(editProfileSuccessResponse)
        } catch (error) {
            console.log('cannot edit details......', error)
        }
    }


    return (
        <div className="flex justify-center my-5 max-h-[600px] ">
            <div className="flex justify-center mx-10">
                <div className="card bg-base-300 w-96 shadow-xl">
                    <div className="card-body">
                        <div className="flex justify-center">
                            <img className="" src="https://img.icons8.com/?size=50&id=19943&format=png" />
                            <h2 className="card-title justify-center">Edit Profile</h2>
                        </div>
                        <div>
                            <label className="input input-bordered flex items-center gap-2 my-5 justify-start">
                                <input type="text" className="grow" placeholder="First Name" value={firstName} onChange={(e) => { setFirstName(e.target.value) }} />
                            </label>
                            <label className="input input-bordered flex items-center gap-2 my-5">
                                <input type="text" className="grow" placeholder="Last Name" value={lastName} onChange={(e) => { setLastName(e.target.value) }} />
                            </label>
                            <label className="input input-bordered flex items-center gap-2 my-5">
                                <input type="text" defaultValue="" className="grow" placeholder="Age" value={age} onChange={(e) => { setAge(e.target.value) }} />
                            </label>
                            <label className="input input-bordered flex items-center gap-2 my-5">
                                <input type="text" className="grow" placeholder="Gender" value={gender} onChange={(e) => { setGender(e.target.value) }} />
                            </label>
                            <label className="input input-bordered flex items-center gap-2 my-5">
                                <input type="text" className="grow" placeholder="Bio" value={bio} onChange={(e) => { setBio(e.target.value) }} />
                            </label>
                            <label className="input input-bordered flex items-center gap-2 my-5">
                                <input type="file" className="grow" onChange={handleFileChange} />
                            </label>
                        </div>
                        <div className="card-actions justify-center">
                            <button className="btn btn-primary" onClick={handleEditProfile}>Save Details</button>
                        </div>
                    </div>
                </div>
            </div>
            <UserCard userInfo={{ firstName, lastName, age, gender, bio, photoUrl }} />
        </div>
    )
}

export default EditProfile