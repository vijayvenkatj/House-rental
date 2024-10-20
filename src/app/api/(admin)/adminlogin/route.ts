import { NextRequest, NextResponse } from "next/server";
import {CreateOwnerTable,VerifyOwner,FindOwner}from "@/DBfunctions/OwnerTable";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest){
    await CreateOwnerTable();

    const UserDetails = await request.json();
    const res = await VerifyOwner(UserDetails.Name,UserDetails.Password);

    if(res){
        
        const JWT_SECRET = process.env.JWT_SECRET || '';
        const User = await FindOwner(UserDetails.Name)
        const token = jwt.sign({Name: User.name}, JWT_SECRET);
        const response = NextResponse.redirect(new URL('/owner', request.url),302);
        response.cookies.set("Owner", token, {  
            sameSite: "lax", 
            path: '/'
        });
        return response;
    }
    else{
        return NextResponse.json('Invalid email or password', { status: 200 });
    }

    
}