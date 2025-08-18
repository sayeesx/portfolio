import { NextResponse } from "next/server";


const EXTERNAL_API =
  process.env.NEXT_PUBLIC_CHATBOT_API ??
  "https://chatbot-4cn8.onrender.com/api/chat";

export async function POST(request: Request) {
  const controller = new AbortController();
  const timeout = 15000;
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    // forward client's body as-is (text/json)
    const bodyText = await request.text().catch(() => "");
    // Log incoming request body for debugging
    // (will appear in your dev server / Vercel function logs)
    console.log("[proxy] incoming body:", bodyText);

    const apiRes = await fetch(EXTERNAL_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: bodyText || JSON.stringify({}),
      signal: controller.signal,
    });

    clearTimeout(id);

    const text = await apiRes.text().catch(() => "");
    console.log("[proxy] upstream status:", apiRes.status, "content-type:", apiRes.headers.get("content-type"), "body:", text);

    const ct = apiRes.headers.get("content-type") || "";

    if (ct.includes("application/json")) {
      // safe parse
      try {
        const json = text ? JSON.parse(text) : {};
        return NextResponse.json(json, { status: apiRes.status });
      } catch {
        return NextResponse.json({ response: text }, { status: apiRes.status });
      }
    } else {
      return NextResponse.json({ response: text }, { status: apiRes.status });
    }
  } catch (err: unknown) {
    clearTimeout(id);
    const isAbort =
      typeof err === "object" &&
      err !== null &&
      "name" in err &&
      (err as { name: unknown }).name === "AbortError";

    console.error("[proxy] upstream error:", err);

    return NextResponse.json(
      { error: isAbort ? "Upstream request timed out" : "Unable to reach upstream API" },
      { status: isAbort ? 504 : 502 }
    );
  }
}