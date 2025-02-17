import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { AnalyzeEmailRequest, AnalyzeEmailResponse } from "./types";
import { analyzeEmailTone } from "@/lib/openai";

export async function POST(req: Request) {
  try {
    const token = await getToken({ req: req as any });
    if (!token) {
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const { content } = (await req.json()) as AnalyzeEmailRequest;

    if (!content) {
      return new NextResponse(JSON.stringify({ error: "Content is required" }), {
        status: 400,
      });
    }
    const { success, analysis, error } = await analyzeEmailTone(content);
    
    // console.log('conteng : '+content)
    if (!success || !analysis) {
      return new NextResponse(JSON.stringify({ error: error || 'Analysis failed' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new NextResponse(JSON.stringify(analysis), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Analysis error:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}