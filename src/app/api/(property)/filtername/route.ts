import { FilterByName } from "@/DBfunctions/filter";
import { CreatePropertyTable } from "@/DBfunctions/PropertyTable";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {

    await CreatePropertyTable();

    const {name} =  await request.json();

    const properties = await FilterByName(name);

    return NextResponse.json(properties);
}
