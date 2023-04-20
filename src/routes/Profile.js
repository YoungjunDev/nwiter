import React, {useEffect, useState} from "react";
import {authService, dbService} from "../fbase";
import {useHistory} from "react-router-dom";

const Profile = ({refreshUser, userObject}) => {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObject.displayName);
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    };
    useEffect(() => {
        const getMyNweets = async () => {
            const nweets = await dbService
                .collection("nweets")
                .where("creatorId", "==", userObject.uid)
                .orderBy("createdAt")
                .get();
            console.log(nweets.docs.map((doc) => doc.data()))
        }
        getMyNweets();
    }, []);
    const onChange = (event) => {
        const {
            target: {value},
        } = event;
        setNewDisplayName(value);
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        if (userObject.displayName !== newDisplayName) {
            // console.log(userObject.updateProfile());
            await userObject.updateProfile({
                displayName: newDisplayName,
            });
            refreshUser();
        }
    }
    return (
        <>
            <form onSubmit={onSubmit}>
                <input onChange={onChange} type={"text"} placeholder={"Display name"} value={newDisplayName} />
                <input type={"submit"} value={"Update Profile"} />
            </form>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    )
}
export default Profile;