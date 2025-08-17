"use client";

import { JSX, useEffect, useRef, useState } from "react";

type Sender = "user" | "bot";
interface Message {
  text: string;
  sender: Sender;
}

interface ChatWidgetProps {
  onClose?: () => void;
}

export default function ChatWidget({ onClose }: ChatWidgetProps): JSX.Element {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hi! I'm Sayees's AI assistant. How can I help you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState<string>("");
  const [isSending, setIsSending] = useState<boolean>(false);
  const [isBotTyping, setIsBotTyping] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const bodyRef = useRef<HTMLDivElement | null>(null);

  // Use local proxy route to avoid CORS issues
  const API_URL = "/api/chat";

  interface ChatApiResponse {
    response?: string;
    error?: string;
    [key: string]: unknown;
  }

  // Helper to fetch with timeout
  const fetchWithTimeout = async (url: string, options: RequestInit = {}, timeout = 15000): Promise<Response> => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    try {
      const res = await fetch(url, { ...options, signal: controller.signal });
      return res;
    } finally {
      clearTimeout(id);
    }
  };

  useEffect(() => {
    // Auto-scroll to bottom on new message
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages]);

  const onSend = async (): Promise<void> => {
    const content = input.trim();
    if (!content || isSending) return;

    setError("");
    setIsSending(true);
    setIsBotTyping(true);
    setMessages((prev) => [...prev, { text: content, sender: "user" }]);
    setInput("");

    try {
      console.log("Sending to bot proxy:", API_URL, content);

      const res = await fetchWithTimeout(
        API_URL,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: content }),
        },
        15000
      );

      if (!res.ok) {
        const txt = await res.text().catch(() => "");
        throw new Error(`HTTP ${res.status}: ${txt}`);
      }

      let data: ChatApiResponse | null = null;
      try {
        data = (await res.json()) as ChatApiResponse;
      } catch {
        const txt = await res.text().catch(() => "");
        data = { response: txt || undefined };
      }

      if (data?.error) {
        throw new Error(String(data.error));
      }

      const reply = data?.response || "Sorry, I couldn't understand that.";
      setMessages((prev) => [...prev, { text: reply, sender: "bot" }]);
    } catch (e: unknown) {
      console.error("Chat send error:", e);
      const isAbort = (e as any)?.name === "AbortError";
      const msg = isAbort
        ? "The server took too long to respond. Please try again later."
        : (e instanceof Error ? e.message : "Unable to reach the chatbot right now. Please try again.");
      setError(msg);
      setMessages((prev) => [...prev, { text: msg, sender: "bot" }]);
    } finally {
      setIsSending(false);
      setIsBotTyping(false);
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void onSend();
  };

  return (
    <div className="chat-card modern">
      <div className="chat-header">
        <button className="close-btn" aria-label="Close" onClick={onClose} type="button">×</button>
        <div className="title">
          <div className="h2">Sayees Assistant</div>
        </div>
      </div>
      <div className="chat-body" ref={bodyRef}>
        {messages.map((m, idx) => (
          <div key={idx} className={`row ${m.sender}`}>
            {m.sender === 'bot' && (
              <div className="avatar-msg">
                <div className="spinner still"><div className="spinnerin" /></div>
              </div>
            )}
            <div className={`message ${m.sender}`}>
              <p>{m.text}</p>
            </div>
          </div>
        ))}
        {isBotTyping && (
          <div className="row bot typing-row">
            <div className="avatar-msg">
              <div className="spinner"><div className="spinnerin" /></div>
            </div>
          </div>
        )}
      </div>

      {/* show last error (if any) */}
      {error && <div style={{ padding: 8, color: "#ffb3b3", fontSize: 12, textAlign: "center" }}>{error}</div>}

      <div className="chat-footer">
        <form onSubmit={onSubmit} className="chat-form">
          <input
            placeholder={isSending ? "Sending..." : "Type your message"}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isSending}
          />
          <button type="submit" disabled={!input.trim() || isSending} aria-busy={isSending}>
            {isSending ? (
              <span className="btn-loader" aria-hidden>
                <div className="btn-load1" />
                <div className="btn-load2" />
                <div className="btn-load3" />
              </span>
            ) : (
              "Send"
            )}
          </button>
        </form>
      </div>

      <style jsx>{`
        .chat-card {
          width: 300px;
          background: #0b1221; /* deep slate backdrop for contrast */
          border-radius: 14px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.35);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          max-height: 80vh; /* increased desktop height */
          border: 1px solid rgba(61,91,224,0.35);
          backdrop-filter: blur(4px);
        }
        .chat-header {
          position: relative;
          padding: 14px 14px 14px 38px; /* leave space for close btn; taller header */
          background: linear-gradient(90deg, #1f37c7, #3d5be0 60%, #7aa2ff);
          color: #fff;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .close-btn {
          position: absolute;
          left: 10px;
          top: 50%;
          transform: translateY(-50%);
          width: 24px;
          height: 24px;
          border-radius: 6px;
          background: transparent;
          color: #ffffff;
          border: 1px solid rgba(255,255,255,0.35);
          line-height: 20px;
          font-size: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background .2s, border-color .2s, transform .12s;
        }
        .close-btn:hover { background: rgba(255,255,255,0.12); border-color: rgba(255,255,255,0.6); }
        .close-btn:active { transform: translateY(-50%) scale(0.98); }
        .avatar { font-size: 18px; display: flex; align-items: center; justify-content: center; }
        .title .h2 { font-size: 16px; font-weight: 700; line-height: 1.2; letter-spacing: .2px; }
        .title .sub { font-size: 12px; opacity: 0.95; }
        .chat-body {
          padding: 14px;
          overflow-y: auto;
          flex: 1;
          background: radial-gradient(1200px 400px at 100% 0%, rgba(61,91,224,0.12), transparent 50%), #0b1221;
        }
        .row { display: flex; margin-bottom: 10px; gap: 8px; }
        .row.user { justify-content: flex-end; }
        .row.bot { justify-content: flex-start; align-items: flex-start; }
        .row.bot { justify-content: flex-start; }
        .message { max-width: 82%; padding: 10px 12px; border-radius: 12px; animation: chatAnimation 0.25s ease both; border: 1px solid transparent; }
        .message.user { background: #1d4ed8; color: #fff; border-bottom-right-radius: 4px; border-color: rgba(255,255,255,0.08); }
        .message.bot { background: #0e172a; color: #e6e9ff; border-top-left-radius: 4px; border-color: rgba(61,91,224,0.35); }
        .message p { margin: 0; font-size: 14px; line-height: 1.5; }
        .avatar-msg { width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; margin-top: 2px; }
        .typing { display: inline-flex; align-items: center; gap: 8px; }
        .typing-row { margin-bottom: 8px; }
        /* Spinner based on user's design */
        .spinner { position: relative; width: 1.0em; height: 1.0em; border-radius: 50%; border: 2px solid #2a2f45; box-shadow: -8px -8px 10px #6359f8, 0px -8px 10px 0px #9c32e2, 8px -8px 10px #f36896, 8px 0 10px #ff0b0b, 8px 8px 10px 0px #ff5500, 0 8px 10px 0px #ff9500, -8px 8px 10px 0px #ffb700; animation: rot55 0.8s linear infinite; }
        .spinner.still { animation: none; /* keep border in still state */ }
        .spinner:not(.still) { border: none; }
        .spinner:not(.still) .spinnerin { display: none; }
        .spinnerin { border: 2px solid #2a2f45;border-radius: 50%; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); }
        /* Send button loader (3-dot brighten) */
        .btn-loader { display: inline-flex; align-items: center; gap: 8px; transition: all .4s; }
        .btn-loader div { background-color: rgba(255,255,255,0.9); border-radius: 50%; width: 8px; height: 8px; box-shadow: inset 2px 2px 6px rgba(0,0,0,0.4); }
        .btn-load1 { animation: brighten 1.2s infinite; }
        .btn-load2 { animation: brighten 1.2s infinite; animation-delay: .2s; }
        .btn-load3 { animation: brighten 1.2s infinite; animation-delay: .4s; }
        @keyframes brighten { 100% { background-color: rgba(255,255,255,0.6); box-shadow: none; } }
        @keyframes rot55 { to { transform: rotate(360deg); } }
        .chat-footer { padding: 10px; background: #0b1221; border-top: 1px solid rgba(61,91,224,0.35); }
        .chat-form { display: flex; gap: 8px; }
        .chat-form input[type="text"] { flex: 1; padding: 10px 12px; border: 1px solid rgba(122,162,255,0.35); border-radius: 10px; outline: none; transition: box-shadow .2s, border-color .2s, background .2s; background: #0e172a; color: #e6e9ff; font-size: 14px; }
        .chat-form input[type="text"]::placeholder { color: rgba(230,233,255,0.55); }
        .chat-form input[type="text"]:focus { border-color: #7aa2ff; box-shadow: 0 0 0 3px rgba(122,162,255,0.2); background: #0e172a; }
        .chat-form button { padding: 10px 12px; border: 1px solid rgba(122,162,255,0.45); border-radius: 10px; background: linear-gradient(90deg, #1f37c7, #3d5be0); color: #fff; font-weight: 700; cursor: pointer; transition: transform .15s, background .2s, opacity .2s, box-shadow .2s, border-color .2s; font-size: 14px; }
        .chat-form button:hover { background: linear-gradient(90deg, #1c31b3, #2d4bd0); transform: translateY(-1px); box-shadow: 0 10px 30px rgba(61,91,224,0.25); }
        .chat-form button:disabled { opacity: .6; cursor: not-allowed; transform: none; }
        @keyframes chatAnimation { 0% { opacity: 0; transform: translateY(6px);} 100% { opacity: 1; transform: translateY(0);} }
        @keyframes typing { 0%, 80%, 100% { transform: scale(.8); opacity: .6;} 40% { transform: scale(1); opacity: 1;} }

        /* Desktop sizing tweaks */
        @media (min-width: 99vh) {
          .chat-card { height: 65vh; max-height: none; }
          .chat-form input[type="text"] { padding: 10px 10px; font-size: 14px; }
          .chat-form button { padding: 10px 12px; font-size: 14px; }
        }

        /* Mobile optimization */
        @media (max-width: 480px) {
          .chat-card { width: 88vw; height: 60vh; max-height: none; border-radius: 12px; }
          .chat-header { padding: 22px 12px 14px 34px; }
          .close-btn { left: 8px; width: 22px; height: 22px; }
          .avatar { font-size: 16px; }
          .title .h2 { font-size: 13px; }
          .title .sub { font-size: 11px; }
          .chat-body { padding: 10px; }
          .row { gap: 6px; }
          .avatar-msg { width: 20px; height: 20px; }
          .message { max-width: 86%; padding: 8px 10px; }
          .message p { font-size: 13px; }
          .chat-footer { padding: 8px; }
          .chat-form { gap: 6px; }
          .chat-form input[type="text"] { padding: 10px; font-size: 14px; }
          .chat-form button { padding: 10px 12px; font-size: 14px; }
        }
      `}</style>
    </div>
  );
}