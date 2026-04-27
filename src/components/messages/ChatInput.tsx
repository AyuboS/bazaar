"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Send } from "lucide-react";

type Props = { conversationId: number };

export function ChatInput({ conversationId }: Props) {
  const router        = useRouter();
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);
  const textareaRef   = useRef<HTMLTextAreaElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!body.trim()) return;
    setLoading(true); setError(null);

    const res = await fetch("/api/messages", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify({ conversationId, body: body.trim() }),
    });

    setLoading(false);
    if (res.ok) {
      setBody("");
      router.refresh();
    } else {
      setError("Kļūda nosūtot ziņu.");
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="border-t border-[#E8E6DF] pt-4">
      {error && <p className="text-xs text-[#E24B4A] mb-2">{error}</p>}
      <div className="flex items-end gap-2">
        <textarea
          ref={textareaRef}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Raksti ziņu… (Enter — nosūtīt, Shift+Enter — jauna rinda)"
          rows={2}
          maxLength={2000}
          className="flex-1 border border-[#E8E6DF] rounded-xl px-4 py-3 text-sm focus:border-[#B8651E] focus:ring-1 focus:ring-[#B8651E] outline-none resize-none bg-white"
        />
        <button
          type="submit"
          disabled={loading || !body.trim()}
          className="w-10 h-10 rounded-xl bg-[#B8651E] text-white flex items-center justify-center hover:bg-[#9A5219] transition-colors disabled:opacity-50 shrink-0"
        >
          <Send size={16} />
        </button>
      </div>
    </form>
  );
}
