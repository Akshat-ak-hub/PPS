import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import {
  MessageCircle, X, Send, Sparkles, Info, School, ImagePlus
} from "lucide-react";
import { useChatBot } from "@/contexts/ChatBotContext";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  links: { label: string; url: string }[];
  image?: string;
}

interface ConversationMessage {
  role: "user" | "assistant";
  content: string;
  image?: { mimeType: string; data: string };
}

const WELCOME_MESSAGE =
  "Hello there! 👋\n\nWelcome to **Priya Public School**! I'm your friendly AI assistant and also an AI tutor for all subjects from Nursery to 8th grade.\n\nHow can I help you today? Feel free to ask me anything about the school or any academic questions you might have! 😊";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function ChatBot() {
  const { isOpen, toggle, close } = useChatBot();
  const location = useLocation();
  if (location.pathname === "/ask-ai" || location.pathname === "/ai") return null;

  const [messages, setMessages] = useState<Message[]>([
    { id: "welcome", role: "assistant", content: WELCOME_MESSAGE, links: [] }
  ]);
  const [input, setInput] = useState("");
  const [isWaiting, setIsWaiting] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{ file: File; preview: string } | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isWaiting]);

  const parseLinks = (content: string): { text: string; links: { label: string; url: string }[] } => {
    const links: { label: string; url: string }[] = [];
    const linkRegex = /Links:\s*[\s\S]*/i;
    const match = content.match(linkRegex);

    if (match) {
      const linksSection = match[0];
      const items = linksSection.match(/\[([^\]|]+)\|([^\]]+)\]/g);
      if (items) {
        items.forEach((item) => {
          const parts = item.slice(1, -1).split("|");
          if (parts.length === 2) {
            links.push({ label: parts[0].trim(), url: parts[1].trim() });
          }
        });
      }
      return { text: content.replace(linkRegex, "").trim(), links };
    }

    return { text: content, links };
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_IMAGE_SIZE) {
      alert("Image must be under 5MB");
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("Only image files are allowed");
      return;
    }

    const preview = URL.createObjectURL(file);
    setSelectedImage({ file, preview });
    e.target.value = "";
  };

  const removeSelectedImage = () => {
    if (selectedImage) {
      URL.revokeObjectURL(selectedImage.preview);
      setSelectedImage(null);
    }
  };

  const handleQuery = useCallback(async (userContent: string, imageData?: string, imageMimeType?: string) => {
    setIsWaiting(true);

    const conversation: ConversationMessage[] = messages
      .filter((m) => m.id !== "welcome")
      .map((m) => ({ role: m.role, content: m.content }));

    const userMsg: ConversationMessage = { role: "user", content: userContent };
    if (imageData && imageMimeType) {
      userMsg.image = { mimeType: imageMimeType, data: imageData };
    }
    conversation.push(userMsg);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: conversation }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.detail || `Server error ${res.status}`);
      }

      const data = await res.json();
      const { text, links } = parseLinks(data.response);

      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "assistant", content: text || data.response, links }
      ]);
    } catch (err) {
      console.error("Chatbot error:", err);
      const friendly =
        err instanceof Error && err.message
          ? err.message
          : "Sorry, I'm currently unable to answer. Please try again later.";
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: friendly,
          links: []
        }
      ]);
    } finally {
      setIsWaiting(false);
      inputRef.current?.focus();
    }
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if ((!trimmed && !selectedImage) || isWaiting) return;

    setHasStarted(true);

    let imageDataUrl: string | undefined;
    let rawImageData: string | undefined;
    let imageMimeType: string | undefined;

    if (selectedImage) {
      const dataUrl = await fileToBase64(selectedImage.file);
      imageDataUrl = dataUrl;
      rawImageData = dataUrl.split(",")[1];
      imageMimeType = selectedImage.file.type;
      removeSelectedImage();
    }

    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), role: "user", content: trimmed, links: [], image: imageDataUrl }
    ]);
    setInput("");
    handleQuery(trimmed, rawImageData, imageMimeType);
  };

  const handleQuickReply = (label: string, query: string) => {
    if (isWaiting) return;
    setHasStarted(true);
    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), role: "user", content: label, links: [] }
    ]);
    setInput("");
    handleQuery(query);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend(e as unknown as React.FormEvent);
    }
  };

  return (
    <div className="relative text-foreground">
      <motion.button
        onClick={toggle}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-[999] w-14 h-14 bg-gradient-to-br from-primary to-accent text-white rounded-full flex items-center justify-center shadow-lg border border-white/20 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        aria-label="Toggle Chatbot Assistant"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <MessageCircle className="w-6 h-6 text-white" />
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" />
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-secondary" />
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-24 right-6 z-[999] w-[380px] max-w-[calc(100vw-2rem)] h-[600px] max-h-[calc(100vh-8rem)] bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col font-sans"
          >
            <div className="p-4 bg-gradient-to-r from-primary to-accent text-white flex items-center justify-between shadow-sm relative">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center border border-white/25">
                  <School className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm tracking-wide">PPS AI Assistant</h3>
                  <p className="text-xs text-white/80 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                    Powered by Gemini AI
                  </p>
                </div>
              </div>
              <button
                onClick={close}
                className="p-1.5 hover:bg-white/10 rounded-lg text-white transition-colors"
                aria-label="Close Chat"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 flex flex-col min-h-0 bg-background/40">
              <div className="flex-1 flex flex-col gap-3 overflow-y-auto mb-4 scrollbar-thin">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col max-w-[90%] ${
                      msg.role === "user" ? "self-end items-end" : "self-start items-start"
                    }`}
                  >
                      <div
                        className={`p-3 text-sm leading-relaxed ${
                          msg.role === "user"
                            ? "bg-primary text-primary-foreground rounded-2xl rounded-tr-none shadow-sm"
                            : "bg-card border border-border/80 text-foreground rounded-2xl rounded-tl-none shadow-md border-l-4 border-l-primary/40"
                        }`}
                      >
                      {msg.role === "user" ? (
                        <div>
                          {msg.image && (
                            <img src={msg.image} alt="Uploaded" className="max-w-full rounded-lg mb-2 max-h-48 object-contain bg-black/5" />
                          )}
                          {msg.content && <p>{msg.content}</p>}
                        </div>
                      ) : (
                        <div className="prose prose-sm max-w-none dark:prose-invert prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-ul:text-foreground prose-ol:text-foreground prose-code:text-foreground prose-pre:bg-muted prose-pre:text-foreground [&_.katex-display]:my-3 [&_.katex]:text-foreground">
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm, remarkMath]}
                            rehypePlugins={[rehypeKatex]}
                          >
                            {msg.content}
                          </ReactMarkdown>
                        </div>
                      )}
                      {msg.links.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2 pt-2 border-t border-border">
                          {msg.links.map((link) => (
                            <Link
                              key={link.label}
                              to={link.url}
                              className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 hover:bg-primary/20 text-primary text-xs font-semibold rounded-lg transition-colors border border-primary/20"
                            >
                              <Info className="w-3 h-3" />
                              {link.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {isWaiting && (
                  <div className="flex items-center gap-1 bg-card border border-border p-3.5 rounded-2xl rounded-tl-none self-start max-w-[80%] shadow-sm">
                    <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {!hasStarted && (
                <div className="mb-2">
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider mb-1.5 px-1 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-secondary" />
                    Quick Topics
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { label: "Admissions 📝", query: "What is the admission process for 2026-27?" },
                      { label: "Fee Structure 💰", query: "What are the tuition fees for all classes?" },
                      { label: "Bus Routes 🚌", query: "What are the bus routes and timings?" },
                      { label: "School Rules 📜", query: "What are the school rules and regulations?" },
                      { label: "Contact 📞", query: "What are the school contact details?" },
                      { label: "Events 🎉", query: "What are the upcoming school events?" },
                      { label: "Faculty 👨‍🏫", query: "Who are the teachers and staff members?" },
                      { label: "Facilities 🏫", query: "What facilities does the school offer?" }
                    ].map((item) => (
                      <button
                        key={item.label}
                        onClick={() => handleQuickReply(item.label, item.query)}
                        disabled={isWaiting}
                        className="px-2.5 py-1 text-xs bg-muted hover:bg-primary hover:text-white disabled:opacity-50 disabled:cursor-not-allowed text-foreground/80 rounded-full transition-all border border-border shadow-sm cursor-pointer"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {selectedImage && (
                <div className="flex items-center gap-2 p-2 bg-muted rounded-lg mb-2 border border-border">
                  <img src={selectedImage.preview} alt="Selected" className="w-10 h-10 object-cover rounded border border-border" />
                  <span className="text-xs text-muted-foreground flex-1 truncate">{selectedImage.file.name}</span>
                  <button
                    type="button"
                    onClick={removeSelectedImage}
                    className="p-1 hover:bg-background rounded-lg text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                    aria-label="Remove image"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
              <form onSubmit={handleSend} className="flex gap-2 pt-2 border-t border-border">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  hidden
                />
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me anything about the school... (images supported)"
                  disabled={isWaiting}
                  className="flex-1 px-3.5 py-2 text-sm bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-foreground font-sans disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isWaiting}
                  className="p-2 bg-card hover:bg-muted disabled:opacity-50 text-foreground border border-border rounded-xl flex items-center justify-center transition-all cursor-pointer"
                  aria-label="Attach image"
                >
                  <ImagePlus className="w-4 h-4" />
                </button>
                <button
                  type="submit"
                  disabled={(!input.trim() && !selectedImage) || isWaiting}
                  className="p-2 bg-primary hover:opacity-90 disabled:opacity-50 text-white rounded-xl flex items-center justify-center transition-all cursor-pointer"
                  aria-label="Send Message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
