import { CreateWishlistTable,GetWishlistByName } from "@/DBfunctions/WishlistTable";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { FindProperty } from "@/DBfunctions/PropertyTable";

const JWT_SECRET = process.env.JWT_SECRET || '';

export async function GET(request: NextRequest) {
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

        const BuyerWishlist = await GetWishlistByName(decoded.Name);

        const Properties = [];
        for(const Object of BuyerWishlist){
            const property = await FindProperty("property_id", Object.property_id);
            Properties.push(property[0]);
        }
        console.log(Properties);

        return NextResponse.json(Properties);

    } catch (error) {
        console.error('Error in GET Wishlist:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

