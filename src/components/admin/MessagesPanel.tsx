"use client";

import { useMemo, useState } from "react";
import { Mail, MailOpen, Reply, Trash2, Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { AdminContactMessage } from "@/lib/contact";

type Filter = "all" | "new" | "read";

function formatDate(iso: string) {
  return new Date(iso).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function MessagesPanel({
  messages,
  setMessages,
  onError,
}: {
  messages: AdminContactMessage[];
  setMessages: (update: (current: AdminContactMessage[]) => AdminContactMessage[]) => void;
  onError: (message: string) => void;
}) {
  const [filter, setFilter] = useState<Filter>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const visible = useMemo(
    () => (filter === "all" ? messages : messages.filter((message) => message.status === filter)),
    [messages, filter],
  );
  const selected = messages.find((message) => message.id === selectedId) || null;
  const unread = messages.filter((message) => message.status === "new").length;

  async function setStatus(id: string, status: AdminContactMessage["status"]) {
    setMessages((current) => current.map((m) => (m.id === id ? { ...m, status } : m)));
    const response = await fetch(`/api/admin/messages/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) onError("Unable to update message status");
  }

  async function open(message: AdminContactMessage) {
    setSelectedId(message.id);
    if (message.status === "new") await setStatus(message.id, "read");
  }

  async function remove(id: string) {
    if (!window.confirm("Delete this message permanently?")) return;
    const response = await fetch(`/api/admin/messages/${id}`, { method: "DELETE" });
    if (!response.ok) {
      onError("Unable to delete message");
      return;
    }
    setMessages((current) => current.filter((m) => m.id !== id));
    if (selectedId === id) setSelectedId(null);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)]">
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold">Inbox</h2>
            <p className="text-sm text-muted-foreground">
              {messages.length} message{messages.length === 1 ? "" : "s"} · {unread} unread
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          {(["all", "new", "read"] as Filter[]).map((value) => (
            <Button
              key={value}
              size="sm"
              variant={filter === value ? "default" : "outline"}
              onClick={() => setFilter(value)}
              className="capitalize"
            >
              {value === "new" ? "Unread" : value}
            </Button>
          ))}
        </div>

        {visible.length === 0 && (
          <div className="rounded-xl border border-dashed border-border p-8 text-center text-muted-foreground">
            <Inbox className="mx-auto mb-2 h-8 w-8 opacity-60" />
            No messages here yet.
          </div>
        )}

        <ul className="space-y-2">
          {visible.map((message) => (
            <li key={message.id}>
              <button
                type="button"
                onClick={() => open(message)}
                className={`w-full rounded-xl border p-4 text-left transition-colors ${
                  selectedId === message.id
                    ? "border-primary/60 bg-primary/10"
                    : "border-border/60 bg-card/60 hover:border-primary/30"
                }`}
              >
                <div className="mb-1 flex items-center justify-between gap-2">
                  <span className={`truncate ${message.status === "new" ? "font-bold" : "font-medium"}`}>
                    {message.status === "new" && (
                      <span className="mr-2 inline-block h-2 w-2 rounded-full bg-primary align-middle" />
                    )}
                    {message.name}
                  </span>
                  <span className="shrink-0 text-xs text-muted-foreground">{formatDate(message.createdAt)}</span>
                </div>
                <p className={`truncate text-sm ${message.status === "new" ? "text-foreground" : "text-muted-foreground"}`}>
                  {message.subject}
                </p>
                <p className="truncate text-xs text-muted-foreground">{message.message}</p>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section>
        {selected ? (
          <article className="glass sticky top-6 space-y-5 rounded-2xl p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="font-display text-xl font-bold">{selected.subject}</h3>
                <p className="text-sm text-muted-foreground">
                  {selected.name} ·{" "}
                  <a href={`mailto:${selected.email}`} className="text-primary hover:underline">
                    {selected.email}
                  </a>
                </p>
                <p className="text-xs text-muted-foreground">{formatDate(selected.createdAt)}</p>
              </div>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={selected.status === "new" ? "Mark as read" : "Mark as unread"}
                  title={selected.status === "new" ? "Mark as read" : "Mark as unread"}
                  onClick={() => setStatus(selected.id, selected.status === "new" ? "read" : "new")}
                >
                  {selected.status === "new" ? <MailOpen className="h-4 w-4" /> : <Mail className="h-4 w-4" />}
                </Button>
                <Button variant="ghost" size="icon" aria-label="Delete message" onClick={() => remove(selected.id)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </div>
            <p className="whitespace-pre-wrap break-words rounded-xl bg-secondary/50 p-4 text-sm leading-relaxed">
              {selected.message}
            </p>
            <Button asChild>
              <a href={`mailto:${selected.email}?subject=${encodeURIComponent(`Re: ${selected.subject}`)}`}>
                <Reply className="mr-2 h-4 w-4" /> Reply by email
              </a>
            </Button>
          </article>
        ) : (
          <div className="hidden h-full min-h-60 items-center justify-center rounded-2xl border border-dashed border-border text-muted-foreground lg:flex">
            Select a message to read it.
          </div>
        )}
      </section>
    </div>
  );
}
