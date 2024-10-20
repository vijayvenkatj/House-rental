import { CreatePropertyTable, FindProperty } from "@/DBfunctions/PropertyTable";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import { FindOwner } from "@/DBfunctions/OwnerTable";

export async function GET(request: NextRequest){

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
    const OwnerDetails = await FindOwner(decoded.Name);
    console.log(OwnerDetails,decoded)
    const owner_id = OwnerDetails.owner_id; 

    const Properties = await FindProperty('owner_id', owner_id);

    return NextResponse.json(Properties, { status: 200 });   
}