import { useMemo, useState } from "react";
import { Bot, Send, Mic, Volume2 } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
}

export default function BotPage() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      text: "Welcome to Propellect Bot. Ask a question or describe a lead task and I’ll help you accelerate your workflow.",
    },
  ]);

  const canSend = query.trim().length > 0;

  const handleSend = () => {
    const trimmed = query.trim();
    if (!trimmed) return;

    setMessages((current) => [
      ...current,
      { id: `user-${Date.now()}`, role: "user", text: trimmed },
      {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        text: `Got it. I’m thinking through: ${trimmed}`,
      },
    ]);
    setQuery("");
  };

  const chatHistory = useMemo(
    () => messages.map((message) => (
      <div
        key={message.id}
        className={`rounded-2xl p-4 mb-3 ${
          message.role === "assistant"
            ? "bg-slate-900 text-slate-100"
            : "bg-slate-100 text-slate-900"
        }`}
      >
        <div className="text-xs uppercase tracking-[0.2em] mb-2 text-slate-500">
          {message.role === "assistant" ? "Propellect Bot" : "You"}
        </div>
        <p className="whitespace-pre-line text-sm leading-6">{message.text}</p>
      </div>
    )),
    [messages]
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3 text-slate-50">
          <div className="w-11 h-11 rounded-2xl bg-emerald-500 grid place-items-center">
            <Bot size={20} />
          </div>
          <div>
            <p className="text-lg font-semibold">Propellect AI Bot</p>
            <p className="text-sm text-slate-400 max-w-2xl">
              Get intelligent sales assistant support, chat history, and voice-ready responses.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-700 bg-slate-900 p-6 shadow-lg shadow-slate-900/10">
        <div className="flex flex-col gap-4 max-h-[60vh] overflow-y-auto pb-3">{chatHistory}</div>

        <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto]">
          <div className="relative rounded-2xl bg-slate-950 border border-slate-800 px-4 py-3">
            <textarea
              rows={3}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Ask the Propellect bot anything about leads, campaigns, or voice workflows..."
              className="w-full resize-none border-0 bg-transparent p-0 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
            />
            <div className="absolute right-4 top-4 text-slate-500">
              <Mic size={16} />
            </div>
          </div>
          <button
            type="button"
            onClick={handleSend}
            disabled={!canSend}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:bg-slate-700"
          >
            <Send size={16} />
            Send
          </button>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-400">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-950 px-3 py-2">
            <Volume2 size={14} />
            Voice assistant ready
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-950 px-3 py-2">
            <Bot size={14} />
            Conversation is saved in your session
          </div>
        </div>
      </div>
    </div>
  );
}
