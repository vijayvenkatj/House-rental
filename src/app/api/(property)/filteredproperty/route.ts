import { FilterByPrice, FilterByArea, FilterByBhk, FilterByLocation } from "@/DBfunctions/filter";
import { CreatePropertyTable } from "@/DBfunctions/PropertyTable";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {

    await CreatePropertyTable();

    const { price, location, area, bedrooms } = await request.json();

    const priceResults = await FilterByPrice(price);
    const locationResults = await FilterByLocation(location);
    const areaResults = await FilterByArea(area);
    const bhkResults = await FilterByBhk(bedrooms);

    const commonProperties = priceResults
    .filter(property =>
        locationResults.map(p => p.property_id).includes(property.property_id) &&
        areaResults.map(p => p.property_id).includes(property.property_id) &&
        bhkResults.map(p => p.property_id).includes(property.property_id)
    );
    console.log(commonProperties);

    return NextResponse.json(commonProperties);
}
