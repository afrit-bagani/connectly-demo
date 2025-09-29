"use client";

import AppNavbar from "@/components/AppNavbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useMemo, useState } from "react";
import { Search, Send } from "lucide-react";

const sampleConversations = [
  {
    id: "c1",
    name: "Neha Gupta",
    avatar: "/profile-photo/Neha-Gupta.jpg",
    lastMessage: "Let's sync this weekend.",
    lastMessageTime: "10:02 AM",
    unread: 2,
    messages: [
      {
        id: "m1",
        from: "them",
        text: "Hey! Are you attending the workshop?",
        at: "09:42",
      },
      { id: "m2", from: "me", text: "Yes! See you there.", at: "09:45" },
      { id: "m3", from: "them", text: "Let's sync this weekend.", at: "10:02" },
    ],
  },
  {
    id: "c2",
    name: "Aarav Mehta",
    avatar: "/profile-photo/Aarav-Mehta.png",
    lastMessage: "Shared the repo link.",
    lastMessageTime: "Yesterday",
    unread: 0,
    messages: [
      {
        id: "m4",
        from: "them",
        text: "Shared the repo link.",
        at: "Yesterday",
      },
    ],
  },
  {
    id: "c3",
    name: "Alumni Group",
    lastMessage: "New event posted.",
    avatar: "/logo.png",
    lastMessageTime: "8:15 AM",
    unread: 5,
    messages: [
      { id: "m5", from: "them", text: "New event posted.", at: "08:15" },
    ],
  },
];

export default function MessagePage() {
  const [q, setQ] = useState("");
  const [conversations, setConversations] = useState(sampleConversations);
  const [activeId, setActiveId] = useState(conversations[0]?.id);
  const [draft, setDraft] = useState("");

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return conversations;
    return conversations.filter((c) => c.name.toLowerCase().includes(s));
  }, [q, conversations]);

  const active = conversations.find((c) => c.id === activeId);

  function sendMessage(e) {
    e.preventDefault();
    if (!draft.trim() || !active) return;
    setConversations((prev) =>
      prev.map((c) =>
        c.id === active.id
          ? {
              ...c,
              lastMessage: draft.trim(),
              messages: [
                ...c.messages,
                {
                  id: crypto.randomUUID(),
                  from: "me",
                  text: draft.trim(),
                  at: "now",
                },
              ],
            }
          : c
      )
    );
    setDraft("");
  }

  return (
    <>
      <AppNavbar />
      <main className="flex border-t h-[calc(100vh-5rem)]">
        {/* Sidebar */}
        <div className="w-full md:w-1/3 lg:w-1/4 border-r flex flex-col">
          <div className="p-4 border-b">
            <h2 className="text-xl font-semibold">Messages</h2>
            <div className="relative mt-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations"
                className="pl-10"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            <div className="p-2 space-y-1">
              {filtered.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveId(c.id)}
                  className={`w-full text-left rounded-md p-3 transition-colors hover:bg-accent ${
                    activeId === c.id ? "bg-accent" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={c.avatar} alt={c.name} />
                      <AvatarFallback>
                        {c.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 overflow-hidden">
                      <div className="flex items-baseline justify-between">
                        <p className="font-semibold truncate">{c.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {c.lastMessageTime}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-sm text-muted-foreground truncate">
                          {c.lastMessage}
                        </p>
                        {c.unread > 0 && (
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                            {c.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Chat Window */}
        <div className="flex-1 flex flex-col">
          {active ? (
            <>
              <div className="flex items-center gap-3 p-4 border-b">
                <Avatar>
                  <AvatarImage src={active.avatar} alt={active.name} />
                  <AvatarFallback>
                    {active.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-semibold">{active.name}</h3>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {active.messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex items-end gap-2 ${
                      m.from === "me" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs md:max-w-md lg:max-w-lg rounded-xl px-4 py-2 text-sm ${
                        m.from === "me"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <p>{m.text}</p>
                      <p className="text-[10px] opacity-70 mt-1 text-right">
                        {m.at}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t bg-background">
                <form
                  onSubmit={sendMessage}
                  className="flex items-center gap-2"
                >
                  <Input
                    placeholder="Type a message..."
                    className="flex-1"
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                  />
                  <Button type="submit" size="icon" disabled={!draft.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center">
              <div className="text-center">
                <h3 className="text-xl font-semibold">Select a conversation</h3>
                <p className="text-muted-foreground">
                  Choose a chat from the left to start messaging.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
