import { CreateWishlistTable,DeleteFromWishlist } from "@/DBfunctions/WishlistTable";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { FindProperty } from "@/DBfunctions/PropertyTable";
import { FindUserId } from "@/DBfunctions/UserTable";

const JWT_SECRET = process.env.JWT_SECRET || '';

export async function POST(request: NextRequest) {
    await CreateWishlistTable();

    try {
        const Buyertoken = request.cookies.get("Buyer")?.value || '';
        if (!Buyertoken) {
            return NextResponse.json('Authorization denied');
        }

        let decoded;
        try {
            decoded = jwt.verify(Buyertoken, JWT_SECRET) as jwt.JwtPayload;
        } catch (error) {
            console.error(error);
            return NextResponse.json('Authorization denied');
        }

        const {image} = await request.json();
        const Property: any = await FindProperty("image", image);
        if (!Property) {
            return NextResponse.json('Property not found');
        }

        const buyer = await FindUserId(decoded.Name);
        const property_id = Property[0].property_id;

        const res = await DeleteFromWishlist(buyer.buyer_id, property_id);
        return NextResponse.json(res);

    } catch (error) {
        console.error('Error in GET Wishlist:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

