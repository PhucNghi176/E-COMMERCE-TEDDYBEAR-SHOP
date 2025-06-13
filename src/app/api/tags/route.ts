import { tagService } from "@/services/tagService";
import { NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
export async function GET(request: Request) {
    try {
        const response = await fetch(`${BASE_URL}/api/v1/tags`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return NextResponse.json(response);
    } catch (error) {
        console.error('Error fetching tags:', error);
        return NextResponse.json({ error: 'Failed to fetch tags' }, { status: 500 });
    }
}