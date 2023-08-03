"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";




export default function ForgotPassword() {
    const router = useRouter();
    const [email, setEmail] = React.useState("")
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onForgotPassword = async () => {
        try {
            setLoading(true);
            console.log(email)
            const response = await axios.post("/api/users/forgotpassword", {email});
            // console.log("Signup success", response.data);
            router.push("/login");
            
        } catch (error:any) {
            console.log("Forgot Password failed", error.message);
            
            toast.error(error.message);
        }finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if(email.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [email]);


    return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>{loading ? "Processing" : "Forgot Password"}</h1>
        <hr />
        <label htmlFor="email">email</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
            />
            <button
            onClick={onForgotPassword}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">
                {buttonDisabled ? "No Forgot Password" : "Forgot Password"}</button>
            <Link href="/login">Visit login page</Link>
        </div>
    )

}