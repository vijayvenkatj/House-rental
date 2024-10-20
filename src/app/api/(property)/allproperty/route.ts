import { CreatePropertyTable,AllProperty } from "@/DBfunctions/PropertyTable";
import { NextResponse } from "next/server";

export async function GET(){
    await CreatePropertyTable();
    const properties = await AllProperty();
    return NextResponse.json(properties, { status: 200 }); 
}