import type { NextApiRequest, NextApiResponse } from "next";

const EXTERNAL_API =
  process.env.NEXT_PUBLIC_CHATBOT_API || "https://chatbot-4cn8.onrender.com/api/chat";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 15000);

    const apiRes = await fetch(EXTERNAL_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
      signal: controller.signal,
    });

    clearTimeout(id);

    const text = await apiRes.text().catch(() => "");
    const ct = apiRes.headers.get("content-type") || "";

    // Forward status and JSON if possible, otherwise return text under "response"
    if (ct.includes("application/json")) {
      const json = JSON.parse(text || "{}");
      return res.status(apiRes.status).json(json);
    } else {
      return res.status(apiRes.status).json({ response: text });
    }
  } catch (err) {
    const isAbort = (err as any)?.name === "AbortError";
    return res
      .status(500)
      .json({ error: isAbort ? "Upstream request timed out" : "Unable to reach upstream API" });
  }
}