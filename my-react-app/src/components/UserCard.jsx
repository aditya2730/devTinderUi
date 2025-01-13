const UserCard = ({ userInfo }) => {
    console.log(userInfo)
    const { firstName, lastName, photoUrl, age, bio, skills } = userInfo
    return (
        <div className="card bg-base-100 w-96 shadow-xl">
            <figure>
                <img
                    src={photoUrl}
                    alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">Shoes!</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Buy Now</button>
                </div>
            </div>
        </div>
    )
}

export default UserCard