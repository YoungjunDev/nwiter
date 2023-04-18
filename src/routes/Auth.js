import React, {useState} from "react";
import {getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";

// Automatic import 방식
const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const onChange = (event) => {
        // console.log(event.target.name);
        // event로 부터 target으로 지정한 name과 value 가져오기
        const {target: {name, value}} = event;
        // console.log(value);
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    }
    const onSubmit = async (event) => {
        // 기본 새로고침(refresh) 행위를 생략
        event.preventDefault();
        try {
            let data;
            const auth = getAuth();
            if (newAccount) {
                // create account
                data = await createUserWithEmailAndPassword(auth, email, password);
            } else {
                // log in
                data = await signInWithEmailAndPassword(auth, email,password);
            }
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input name={"email"} type={"text"} placeholder={"Email"} required value={email} onChange={onChange} />
                <input name={"password"} type={"password"} placeholder={"Password"} required value={password} onChange={onChange} />
                <input type={"submit"} value={ newAccount ? "Create Account" : "Log In" } />
            </form>
            <div>
                <button>Continue with Google</button>
                <button>Continue with Github</button>
            </div>
        </div>
    );
}

    export default Auth;