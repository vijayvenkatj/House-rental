import { NextRequest, NextResponse } from "next/server";
import {CreateUserTable,FindUser,VerifyUser}from "@/DBfunctions/UserTable";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest){
    await CreateUserTable();

    const UserDetails = await request.json();
    const res = await VerifyUser(UserDetails.Name,UserDetails.Password);

    if(res){
        
        const JWT_SECRET = process.env.JWT_SECRET || '';
        const User = await FindUser(UserDetails.Name)
        console.log(User)
        const token = jwt.sign({Name: User.name}, JWT_SECRET);
        const response = NextResponse.redirect(new URL('/', request.url),302);
        response.cookies.set("Buyer", token, {  
            sameSite: "lax", 
            path: '/'
        });
        return response;
    }
    else{
        return NextResponse.json('Invalid email or password', { status: 200 });
    }

    
}