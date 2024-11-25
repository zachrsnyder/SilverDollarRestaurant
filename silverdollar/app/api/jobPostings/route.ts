import { NextResponse } from "next/server";
import { adminDb } from "@/lib/auth/admin";


export async function GET(req: Request){
    try{
        const snapshot = await adminDb
    .collection('jobPostings')
    .orderBy('createdAt', 'desc')
    .select('title', 'status')
    .get();

    const initialPostings = snapshot.docs.map(doc => {
        var data = doc.data();
        return {
        id: doc.id,
        title: data?.title,
        status: data?.status
    }});

    // Cache-control allows caching of postings for five minutes (300 seconds) and revalidation. Public value allows storage in CDN and browser cache.
    return NextResponse.json(initialPostings, {
        headers: {
            'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=59',
          },
    })
    }catch(err: any){
        console.log("Error fetching job postings.");
        console.log(err);
        return NextResponse.json(
            { error: 'Failed to fetch job postings' },
      { 
        status: 500,
        headers: {
          // Don't cache errors
          'Cache-Control': 'no-store'
        }
      }
    )
    }
}

export async function POST(req: Request){
    try{
        const content = req.body;

    }catch(err : any){
        
    }
}