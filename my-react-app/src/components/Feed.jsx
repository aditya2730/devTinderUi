import { BASE_URL } from "../utils/contants"
import { addFeed } from "../store/feedSlice"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";
import UserCard from "./UserCard";

const Feed = () => {
    const dispatch = useDispatch();

    const feed = useSelector((store) => store.feed);

    const getFeed = async () => {
        try {
            if (feed) return;
            const res = await fetch(BASE_URL + '/feed', {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const feedData = await res.json();
            dispatch(addFeed(feedData));
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getFeed()
    }, [])

    return feed && (
        <div className="flex justify-center my-10">
            <UserCard userInfo={feed.message[0]} />
        </div>
    )
}

export default Feed