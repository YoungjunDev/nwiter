import React, {useEffect, useState} from "react";
import {v4 as uuidv4 } from 'uuid';
import {dbService, storageService} from "../fbase";
import Nweet from "../components/Nweet";

// Automatic import 방식
const Home = ({ userObject }) => {
    // console.log(userObject);
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    const [attachment, setAttachment] = useState("");

    useEffect(() => {
        dbService.collection("nweets").onSnapshot((snapshot) => {
            const nweetArray = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setNweets(nweetArray);
        });
    }, []);
    const onSubmit = async (event) => {
        event.preventDefault();
        let attachmentURL = "";
        if (attachment !== "") {
            const attachmentRef = storageService.ref().child(`${userObject.uid}/${uuidv4()}`);
            const response = await attachmentRef.putString(attachment, "data_url");
            attachmentURL = await response.ref.getDownloadURL();
        }
        const nweetObj = {
            text: nweet,
            createdAt: Date.now(),
            creatorId: userObject.uid,
            attachmentURL,
        };
        await dbService.collection("nweets").add(nweetObj);
        setNweet("");
        setAttachment("");
    };
    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNweet(value);
    };
    const onFileChange = (event) => {
        // console.log(event.target.files);
        const {target:{files},} = event;
        // 파일을 갖고
        const  theFiles = files[0];
        // console.log(theFiles);
        //reader를 만든 후
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            console.log(finishedEvent);
            const {currentTarget: { result }, } = finishedEvent;
            setAttachment(result);
        }
        // readAsDataURL 사용해서 파일 읽기
        reader.readAsDataURL(theFiles);
    };
    const onClearAttachment = () => setAttachment(null);

    // console.log(nweets);
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={nweet} onChange={onChange} type={"text"} placeholder={"what's on your mind?"} maxLength={120} />
                <input type={"file"} accept={"image/*"} onChange={onFileChange} />
                <input type={"submit"} value={"Nweet"} />
                { attachment &&
                    <div>
                        <img src={attachment} width={"50px"} height={"50px"} />
                        <button onClick={onClearAttachment}>Clear</button>
                    </div>
                }
            </form>
            <div>
                {nweets.map((nweet) => (
                    <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObject.uid} />
                    )
                )}
            </div>
        </div>
    )
}
export default Home;