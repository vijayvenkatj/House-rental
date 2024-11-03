import { AllWishlist, CreateWishlistTable } from "@/DBfunctions/WishlistTable";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { FindOwner } from "@/DBfunctions/OwnerTable";
import { FindOwnerId } from "@/DBfunctions/PropertyTable";
import { FindUserById} from "@/DBfunctions/UserTable";

const JWT_SECRET = process.env.JWT_SECRET || '';

export async function GET(request: NextRequest) {
    await CreateWishlistTable();

    try {
        const ownertoken = request.cookies.get("Owner")?.value || '';
        if (!ownertoken) {
            return NextResponse.json('Authorization denied');
        }

        let decoded;
        try {
            decoded = jwt.verify(ownertoken, JWT_SECRET) as jwt.JwtPayload;
        } catch (error) {
            console.error(error);
            return NextResponse.json('Authorization denied');
        }
        
        const OwnerDetails = await FindOwner(decoded.Name);
        if (!OwnerDetails) {
            return NextResponse.json('Authorization denied');
        }

        const owner_id = OwnerDetails.owner_id;
        console.log(owner_id);

        const WishlistDetails = await AllWishlist();

        const BuyerDetails: any[] = [];

        
        for (const wishlist of WishlistDetails) {
            const res: any = await FindOwnerId(wishlist.property_id);
            const wishlist_owner_id = res[0]?.owner_id; 
            if (wishlist_owner_id === owner_id) {
                const buyer: User = await FindUserById(wishlist.buyer_id);
                const buyer_contact: buyers = {
                    name: buyer.name,
                    phone_no: buyer.phone_no,
                    marital_status: buyer.marital_status,
                    family_size: buyer.family_size
                  };                  
                BuyerDetails.push(buyer_contact);
            }
        }

        return NextResponse.json(BuyerDetails);

    } catch (error) {
        console.error('Error in GET Wishlist:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

interface buyers{
    name: string;
    phone_no: string;
    marital_status: string;
    family_size: number;
}
interface User {
    buyer_id: number;
    name: string;
    password: string;
    id_proof: string;
    phone_no: string;
    marital_status: string;
    family_size: number;
}
