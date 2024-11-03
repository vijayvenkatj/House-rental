import { CreateWishlistTable } from "@/DBfunctions/WishlistTable";
import { NextRequest, NextResponse } from "next/server";
import { FindOwnerByImage } from "@/DBfunctions/OwnerTable";


export async function POST(request: NextRequest) {
    await CreateWishlistTable();

    try {
        const {image} = await request.json();
        const Owner = await FindOwnerByImage(image);
        if (!Owner) {
            return NextResponse.json('Authorization denied');
        }

        const OwnerDetails = {Name: Owner.name,Phone_Number: Owner.phone_no}

        return NextResponse.json(OwnerDetails);

    } catch (error) {
        console.error('Error in GET Wishlist:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

