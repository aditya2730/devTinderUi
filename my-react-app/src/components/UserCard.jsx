const UserCard = ({ userInfo }) => {
    const { photoUrl, firstName, lastName, bio, age, gender } = userInfo
    return (
        <div className="card bg-base-300 w-96 shadow-xl">
            <figure>
                <img
                    className="w-screen"
                    src={photoUrl}
                    alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstName + " " + lastName}</h2>
                {age && gender && <p>{age + " " + gender}</p>}
                <p className="break-words">{bio}</p>
                <div className="card-actions justify-center my-4">
                    <button className="btn btn-primary">Ignore</button>
                    <button className="btn btn-secondary">Interested</button>
                </div>
            </div>
        </div>
    )
}

export default UserCard