import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { MessageSquare } from "lucide-react";
import { auth } from "@/lib/auth";
import { getUserConversations } from "@/db/queries";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { timeAgo } from "@/lib/utils";

export const metadata: Metadata = { title: "Ziņojumi" };

export default async function MessagesPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/login");

  const convs = await getUserConversations(session.user.id);

  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 md:px-6 py-8">
        <h1 className="text-xl font-semibold tracking-tight mb-6">Ziņojumi</h1>

        {convs.length === 0 ? (
          <div className="text-center py-24 bg-white border border-[#E8E6DF] rounded-2xl">
            <MessageSquare size={40} className="text-[#C9C6BC] mx-auto mb-3" />
            <p className="text-[#6B6B68] mb-1 font-medium">Nav ziņojumu</p>
            <p className="text-sm text-[#9C9A92]">Sarakste parādīsies šeit, kad sazināsies ar pārdevēju.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {convs.map((conv) => {
              const otherName = session.user.id === conv.buyerId ? conv.sellerName : conv.buyerName;
              return (
                <Link
                  key={conv.id}
                  href={`/messages/${conv.id}`}
                  className="flex items-center gap-4 bg-white border border-[#E8E6DF] rounded-xl p-4 hover:border-[#C9C6BC] hover:shadow-sm transition-all"
                >
                  {/* Listing thumbnail */}
                  <div className="w-12 h-12 rounded-lg bg-[#F3F2EE] overflow-hidden shrink-0">
                    {conv.listingImage ? (
                      <Image src={conv.listingImage} alt={conv.listingTitle ?? ""} width={48} height={48} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#C9C6BC]">
                        <MessageSquare size={20} />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-medium truncate">{otherName ?? "Lietotājs"}</p>
                      <span className="text-xs text-[#9C9A92] shrink-0">{timeAgo(conv.lastMessageAt)}</span>
                    </div>
                    <p className="text-xs text-[#6B6B68] truncate mt-0.5">{conv.listingTitle}</p>
                    {conv.lastBody && (
                      <p className="text-xs text-[#9C9A92] truncate mt-0.5">{conv.lastBody}</p>
                    )}
                  </div>

                  {/* Unread badge */}
                  {conv.unreadCount > 0 && (
                    <div className="shrink-0 w-5 h-5 rounded-full bg-[#B8651E] text-white text-[10px] font-semibold flex items-center justify-center">
                      {conv.unreadCount > 9 ? "9+" : conv.unreadCount}
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
