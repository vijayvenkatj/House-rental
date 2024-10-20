import { AddProperty, CreatePropertyTable } from "@/DBfunctions/PropertyTable";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import { FindOwner } from "@/DBfunctions/OwnerTable";

export async function POST(request: NextRequest){

    await CreatePropertyTable();
    const JWT_SECRET = process.env.JWT_SECRET || '';

    const ownertoken = request.cookies.get("Owner")?.value || '';
    if (!ownertoken) {
        return NextResponse.json('Authorisation denied');
    }

    let decoded;
    try {
        decoded = jwt.verify(ownertoken,JWT_SECRET) as jwt.JwtPayload;
    } catch (error) {
        console.error(error)
        return NextResponse.json('Authorisation denied');
    }
    console.log(decoded);
    const OwnerDetails = await FindOwner(decoded.Name);
    console.log(OwnerDetails);
    const owner_id = OwnerDetails.owner_id; 


    const PropertyDetails = await request.json();
    PropertyDetails.owner_id = owner_id;

    const res = await AddProperty(PropertyDetails);
    return NextResponse.json(res, { status: 200 });   
}