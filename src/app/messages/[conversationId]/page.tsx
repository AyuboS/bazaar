import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { auth } from "@/lib/auth";
import { getConversationById, getConversationMessages } from "@/db/queries";
import { db } from "@/db";
import { messages } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { Navbar } from "@/components/layout/Navbar";
import { ChatInput } from "@/components/messages/ChatInput";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "Saruna" };

type Props = { params: Promise<{ conversationId: string }> };

export default async function ChatPage({ params }: Props) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const { conversationId: convIdStr } = await params;
  const convId = parseInt(convIdStr, 10);
  if (isNaN(convId)) notFound();

  const conv = await getConversationById(convId);
  if (!conv) notFound();

  const { buyerId, sellerId } = conv;
  if (session.user.id !== buyerId && session.user.id !== sellerId) notFound();

  // Mark messages as read
  await db
    .update(messages)
    .set({ readAt: new Date() })
    .where(and(eq(messages.conversationId, convId), eq(messages.receiverId, session.user.id)));

  const msgs       = await getConversationMessages(convId);
  const otherName  = session.user.id === buyerId ? conv.sellerName : conv.buyerName;

  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 md:px-6 py-6 flex flex-col" style={{ minHeight: "calc(100vh - 112px)" }}>

        {/* Back + header */}
        <div className="flex items-center gap-3 mb-4">
          <Link href="/messages" className="text-[#6B6B68] hover:text-[#0A0A0A] transition-colors">
            <ChevronLeft size={20} />
          </Link>
          <div>
            <p className="font-semibold text-sm">{otherName ?? "Lietotājs"}</p>
          </div>
        </div>

        {/* Listing card */}
        <Link
          href={`/listing/${conv.listingId}`}
          className="flex items-center gap-3 bg-white border border-[#E8E6DF] rounded-xl p-3 mb-4 hover:border-[#C9C6BC] transition-colors"
        >
          {conv.listingImage && (
            <Image src={conv.listingImage} alt={conv.listingTitle ?? ""} width={48} height={48} className="w-12 h-12 rounded-lg object-cover shrink-0" />
          )}
          <div className="min-w-0">
            <p className="text-sm font-medium line-clamp-1">{conv.listingTitle}</p>
            <p className="text-xs text-[#9C9A92]">{conv.listingCity}</p>
          </div>
          <ChevronLeft size={14} className="rotate-180 text-[#9C9A92] ml-auto shrink-0" />
        </Link>

        {/* Messages */}
        <div className="flex-1 space-y-3 mb-4">
          {msgs.length === 0 && (
            <p className="text-center text-sm text-[#9C9A92] py-8">Sāc sarunu!</p>
          )}
          {msgs.map((msg) => {
            const isMine = msg.senderId === session.user.id;
            return (
              <div key={msg.id} className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    isMine
                      ? "bg-[#0A0A0A] text-white rounded-br-sm"
                      : "bg-white border border-[#E8E6DF] text-[#0A0A0A] rounded-bl-sm"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.body}</p>
                  <p className={`text-[10px] mt-1 ${isMine ? "text-white/50" : "text-[#9C9A92]"}`}>
                    {formatDate(msg.createdAt)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Message input */}
        <ChatInput conversationId={convId} />
      </div>
    </>
  );
}
