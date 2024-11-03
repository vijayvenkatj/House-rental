import { AllReviews } from "@/DBfunctions/ReviewTable";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){
    const { propertyId } = await request.json();
    const res = await AllReviews(propertyId as number);
    return NextResponse.json(res);
}