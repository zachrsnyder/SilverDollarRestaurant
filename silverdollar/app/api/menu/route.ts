import { getMenu } from "@/lib/util/getMenu";
import { NextResponse } from "next/server";

export async function GET(req: Request){
    // keeping this simple!!!
    const menuUrls = await getMenu();
    return NextResponse.json(menuUrls);
}