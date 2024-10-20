import { NextRequest, NextResponse } from "next/server";
import {CreateOwnerTable,AddOwner}from "@/DBfunctions/OwnerTable";
import jwt from "jsonwebtoken";

interface Owner {
    Name: string;
    Password: string;
    Phone_no: string;
    ID_proof: string;
}

export async function POST(request: NextRequest){
    await CreateOwnerTable();

    const OwnerDetails: Owner = await request.json();
    await AddOwner(OwnerDetails);

    const JWT_SECRET = process.env.JWT_SECRET || '';
    const token = jwt.sign({Name: OwnerDetails.Name}, JWT_SECRET);
    

    const response = NextResponse.redirect(new URL('/owner', request.url),302);
    response.cookies.set("Owner", token, {  
        sameSite: "lax", 
        path: '/'
    });
    return response;
}