"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";



export default function VerifyEmailPage() {

    const router = useRouter()
    const [token, setToken] = useState("");
    const [password, setPassword] = useState("");
    const [confpassword, setconfPassword] = useState("");
    const [error, setError] = useState(false);

    const onSubmit = async () => {
        try {
            await axios.post('/api/users/resetpassword', {token,password,confpassword})
            // setVerified(true);
            router.push('/login')
        } catch (error:any) {
            setError(true);
            console.log(error);
            
        }

    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
        setPassword(password);
        setconfPassword(confpassword)
    }, []);


    // useEffect(() => {
    //     if(token.length > 0) {
    //         verifyUserEmail();
    //     }
    // }, [token]);

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">

            <h1 className="text-4xl">Verify Email</h1>
            <h2 className="p-2 bg-orange-500 text-black">{token ? `${token}` : "no token"}</h2>
            <label htmlFor="password">Password</label>
            <input 
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            type="password" name="password" id="password" value={password}
            onChange={e=>setPassword(e.target.value)} />

            <label htmlFor="confpassword">Confirm Password</label>
            <input 
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            type="password" name="confpassword" id="confpassword" value={confpassword}
            onChange={e=>setconfPassword(e.target.value)} />

            <button onClick={onSubmit}>Submit</button>
        </div>
    )

}