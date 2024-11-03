import { AddReview, CreateReviewTable } from "@/DBfunctions/ReviewTable";
import { NextRequest, NextResponse } from "next/server";
import { FindProperty } from "@/DBfunctions/PropertyTable";
import { FindUser } from "@/DBfunctions/UserTable";
import jwt from "jsonwebtoken";


const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(request: NextRequest){
    await CreateReviewTable();
    try{
    const { rating, reviewText, image } = await request.json();
    const rows = await FindProperty("Image", image); 
    if (rows.length === 0) {
        return NextResponse.json('Property not found', { status: 404 });
    }

    const property_id = rows[0].property_id;

    const buyertoken = request.cookies.get("Buyer")?.value || '';
    if (!buyertoken) {
        return NextResponse.json('Authorisation denied', { status: 401 });
    }

    let decoded;
    try {
        decoded = jwt.verify(buyertoken, JWT_SECRET) as jwt.JwtPayload;
    } catch (error) {
        console.error(error)
        return NextResponse.json('Authorisation denied', { status: 401 });
    }

    const BuyerDetails = await FindUser(decoded.Name);
    const buyer_id = BuyerDetails.buyer_id; 

    const res = await AddReview(rating, reviewText, property_id, buyer_id);

    if(res){
        console.log("Review added successfully");
        return NextResponse.json("Review added successfully");
    }
    else{
        console.log("Failed to add review");
        return NextResponse.json("Failed to add review",{status: 500});
    }
    }

    catch(error){
        return NextResponse.json(error);
    }
}
