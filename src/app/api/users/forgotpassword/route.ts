import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";


connect()


export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {email} = reqBody

        console.log(reqBody);

        //check if user already exists
        const user = await User.findOne({email})

        if(user){
            console.log("User Id", user._id)
            await sendEmail({email, emailType: "RESET", userId: user._id})
            return NextResponse.json({message: "Password reset email sent"}, {status: 200})
        }
        else {
            return NextResponse.json({error:"user not found"},{status:400})
        }
        
        


    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}