import { AddWishlist, CreateWishlistTable } from "@/DBfunctions/WishlistTable";
import { FindUser } from "@/DBfunctions/UserTable";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { FindProperty } from "@/DBfunctions/PropertyTable";

const JWT_SECRET = process.env.JWT_SECRET || '';

export async function POST(request: NextRequest) {
    await CreateWishlistTable()
    try {
        const { image } = await request.json();

        if (!image) {
            return NextResponse.json('Image is required', { status: 400 });
        }

        const rows = await FindProperty("Image", image); 
        if (rows.length === 0) {
            return NextResponse.json('Property not found', { status: 404 });
        }

        const property_id = rows[0].property_id;

        const buyertoken = request.cookies.get("Buyer")?.value || '';
        if (!buyertoken) {
            return NextResponse.json('Authorisation denied');
        }

        let decoded;
        try {
            decoded = jwt.verify(buyertoken, JWT_SECRET) as jwt.JwtPayload;
        } catch (error) {
            console.error(error)
            return NextResponse.json('Authorisation denied');
        }

        const BuyerDetails: Wishlist = await FindUser(decoded.Name);
        const buyer_id = BuyerDetails.buyer_id; 
        if (!BuyerDetails) {
            return NextResponse.json('Buyer not found', { status: 404 });
        }

        const WishlistDetails: Wishlist = {
            buyer_id,
            property_id
        };

        await AddWishlist(WishlistDetails);
        return NextResponse.json("Added to Wishlist", { status: 200 });

    } catch (error) {
        console.error('Error in POST Wishlist:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

interface Wishlist {
    buyer_id: number;
    property_id: number;
}
