import {connect} from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcryptjs from 'bcryptjs';



connect()


export async function POST(request: NextRequest){

    try {
        const reqBody = await request.json()
        const {token,password,confpassword} = reqBody
        console.log("Data",[token,password,confpassword]);

        const user = await User.findOne({forgotPasswordToken: token, forgotPasswordTokenExpiry: {$gt: Date.now()}});

        if (!user) {
            return NextResponse.json({error: "Invalid token"}, {status: 400})
        }
        console.log(user);
        if(password===confpassword){
            
            console.log("Password Match")
            //hash password
            const salt = await bcryptjs.genSalt(10)
            const hashedPassword = await bcryptjs.hash(password, salt)
            user.password = hashedPassword
            
            user.forgotPasswordToken = undefined;
            user.forgotPasswordTokenExpiry = undefined;
            await user.save();
            console.log("Password Updated succefully")
            return NextResponse.json({
                message: "Email verified successfully",
                success: true
            })
        }
        else {
            return NextResponse.json({message:"Password not same"},{status:400})
        }
        

    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }

}