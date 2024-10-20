import { NextRequest, NextResponse } from "next/server";
import {CreateUserTable,AddUser}from "@/DBfunctions/UserTable";
import jwt from "jsonwebtoken";

interface Buyer {
    Name: string;
    Password: string;
    Phone_no: string;
    ID_proof: string;
    Marital_status: string;
    Family_size: number;
}

export async function POST(request: NextRequest){
    await CreateUserTable();

    const UserDetails: Buyer = await request.json();
    await AddUser(UserDetails);

    const JWT_SECRET = process.env.JWT_SECRET || '';
    const token = jwt.sign({Name: UserDetails.Name}, JWT_SECRET);
    

    const response = NextResponse.redirect(new URL('/', request.url),302);
    response.cookies.set("Buyer", token, {  
        sameSite: "lax", 
        path: '/'
    });
    return response;
}