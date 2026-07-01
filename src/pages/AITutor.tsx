import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send, Sparkles, MessageCircle, History, Settings, Mic, MicOff,
  Home, Paperclip, Trash2, Plus, Bot, X, ChevronLeft
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import ChatBubble from "@/components/ai/ChatBubble";
import MarkdownRenderer from "@/components/ai/MarkdownRenderer";

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

interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
}

const WELCOME_MESSAGE =
  "Hello there! 👋\n\nWelcome to **Priya Public School**! I'm your friendly AI assistant and also an AI tutor for all subjects from Nursery to 8th grade.\n\nHow can I help you today? Feel free to ask me anything about the school or any academic questions you might have! 😊";

const quickTopics = [
  { label: "Admissions 📝", query: "What is the admission process for 2026-27?" },
  { label: "Fee Structure 💰", query: "What are the tuition fees for all classes?" },
  { label: "Bus Routes 🚌", query: "What are the bus routes and timings?" },
  { label: "School Rules 📜", query: "What are the school rules and regulations?" },
];

let sessionCounter = 0;

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good Morning";
  if (h < 17) return "Good Afternoon";
  return "Good Evening";
}

const AITutor = () => {
  const [sessions, setSessions] = useState<ChatSession[]>(() => {
    const saved = localStorage.getItem("ai-tutor-sessions");
    if (saved) { try { const p = JSON.parse(saved); sessionCounter = p.length; return p; } catch {} }
    return [];
  });
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [isWaiting, setIsWaiting] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{ file: File; preview: string } | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [streamingContent, setStreamingContent] = useState("");
  const [sidebarTab, setSidebarTab] = useState<"chat" | "history">("chat");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => { localStorage.setItem("ai-tutor-sessions", JSON.stringify(sessions)); }, [sessions]);
  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [sessions, activeSessionId, isWaiting, streamingContent]);

  const activeSession = sessions.find((s) => s.id === activeSessionId) || null;
  const messages = activeSession?.messages || [];
  const hasMessages = messages.length > 1;

  const createNewSession = useCallback(() => {
    sessionCounter++;
    const newSession: ChatSession = {
      id: crypto.randomUUID(),
      title: `Chat ${sessionCounter}`,
      messages: [{ id: "welcome", role: "assistant", content: WELCOME_MESSAGE, links: [] }],
    };
    setSessions((prev) => [newSession, ...prev]);
    setActiveSessionId(newSession.id);
  }, []);

  useEffect(() => {
    if (sessions.length === 0) createNewSession();
    else if (!activeSessionId) setActiveSessionId(sessions[0].id);
  }, [sessions.length, activeSessionId, createNewSession]);

  const deleteSession = (id: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
    if (activeSessionId === id) {
      const remaining = sessions.filter((s) => s.id !== id);
      if (remaining.length > 0) setActiveSessionId(remaining[0].id);
      else { setActiveSessionId(null); createNewSession(); }
    }
  };

  const clearAllSessions = () => {
    setSessions([]); setActiveSessionId(null); setStreamingContent(""); createNewSession();
  };

  const updateSessionMessages = (sessionId: string, newMessages: Message[]) => {
    setSessions((prev) => prev.map((s) => s.id === sessionId ? { ...s, messages: newMessages } : s));
    if (newMessages.length > 2) {
      const lastUserMsg = [...newMessages].reverse().find((m) => m.role === "user");
      if (lastUserMsg) {
        const title = lastUserMsg.content.length > 30 ? lastUserMsg.content.slice(0, 30) + "..." : lastUserMsg.content;
        setSessions((prev) => prev.map((s) => s.id === sessionId ? { ...s, title } : s));
      }
    }
  };

  const parseLinks = (content: string): { text: string; links: { label: string; url: string }[] } => {
    const links: { label: string; url: string }[] = [];
    const linkRegex = /Links:\s*[\s\S]*/i;
    const match = content.match(linkRegex);
    if (match) {
      const sect = match[0];
      const items = sect.match(/\[([^\]|]+)\|([^\]]+)\]/g);
      if (items) items.forEach((item) => { const p = item.slice(1, -1).split("|"); if (p.length === 2) links.push({ label: p[0].trim(), url: p[1].trim() }); });
      return { text: content.replace(linkRegex, "").trim(), links };
    }
    return { text: content, links };
  };

  const handleQuery = useCallback(async (userContent: string, imageData?: string, imageMimeType?: string) => {
    if (!activeSessionId) return;
    setIsWaiting(true);
    setStreamingContent("");

    const conversation: ConversationMessage[] = messages
      .filter((m) => m.id !== "welcome")
      .map((m) => ({ role: m.role, content: m.content }));
    const userMsg: ConversationMessage = { role: "user", content: userContent };
    if (imageData && imageMimeType) userMsg.image = { mimeType: imageMimeType, data: imageData };
    conversation.push(userMsg);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: conversation }),
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.detail || `Server error ${res.status}`);
      }
      const data = await res.json();
      const fullText = data.response;
      const { text, links } = parseLinks(fullText);
      const words = (text || fullText).split(" ");
      let idx = 0;
      const ti = setInterval(() => {
        if (idx < words.length) { setStreamingContent(words.slice(0, idx + 1).join(" ")); idx++; }
        else { clearInterval(ti); setStreamingContent(""); updateSessionMessages(activeSessionId, [...messages, { id: crypto.randomUUID(), role: "assistant", content: text || fullText, links }]); setIsWaiting(false); }
      }, 40);
    } catch (err) {
      const detail = err instanceof Error ? err.message : "Unknown error";
      updateSessionMessages(activeSessionId, [...messages, { id: crypto.randomUUID(), role: "assistant", content: detail, links: [] }]);
      setIsWaiting(false);
    } finally { inputRef.current?.focus(); }
  }, [activeSessionId, messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if ((!trimmed && !selectedImage) || isWaiting || !activeSessionId) return;
    let imageDataUrl: string | undefined, rawImageData: string | undefined, imageMimeType: string | undefined;
    if (selectedImage) {
      const dataUrl = await fileToBase64(selectedImage.file);
      imageDataUrl = dataUrl; rawImageData = dataUrl.split(",")[1]; imageMimeType = selectedImage.file.type;
      URL.revokeObjectURL(selectedImage.preview); setSelectedImage(null);
    }
    updateSessionMessages(activeSessionId, [...messages, { id: crypto.randomUUID(), role: "user", content: trimmed, links: [], image: imageDataUrl }]);
    setInput("");
    handleQuery(trimmed, rawImageData, imageMimeType);
  };

  const handleQuickReply = (label: string, query: string) => {
    if (isWaiting || !activeSessionId) return;
    updateSessionMessages(activeSessionId, [...messages, { id: crypto.randomUUID(), role: "user", content: label, links: [] }]);
    setInput("");
    handleQuery(query);
  };

  const startVoiceInput = () => {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) { alert("Voice input not supported. Try Chrome."); return; }
    if (isListening) { recognitionRef.current?.stop(); setIsListening(false); return; }
    const recognition = new SR();
    recognition.lang = "en-US"; recognition.interimResults = false;
    recognitionRef.current = recognition;
    recognition.onresult = (e: any) => setInput((p) => p + e.results[0][0].transcript);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);
    recognition.start(); setIsListening(true);
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { alert("Image must be under 5MB"); return; }
    if (!file.type.startsWith("image/")) { alert("Only images allowed"); return; }
    setSelectedImage({ file, preview: URL.createObjectURL(file) });
    e.target.value = "";
  };

  const currentStreaming = streamingContent || null;
  const greeting = getGreeting();

  const recentSessions = sessions.filter((s) => s.messages.length > 1).slice(0, 4);

  return (
    <Layout>
      <div className="min-h-[calc(100vh-16rem)] bg-[#F4F4F5] pt-24 pb-12">
        <div className="max-w-[1200px] mx-auto px-4 h-[calc(100vh-18rem)]">
          <div className="w-full h-full bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.06)] overflow-hidden flex">
          
          {/* ─── Sidebar ─── */}
          <aside className="w-[76px] shrink-0 bg-white border-r border-[#E5E7EB] flex flex-col items-center py-5 gap-1">
            <div className="w-9 h-9 rounded-xl bg-violet-600 flex items-center justify-center mb-6 shrink-0">
              <Bot className="w-5 h-5 text-white" />
            </div>

            <button
              onClick={() => setSidebarTab("chat")}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 cursor-pointer ${
                sidebarTab === "chat" ? "bg-violet-50 text-violet-600" : "text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              }`}
              title="Chat"
            >
              <MessageCircle className="w-5 h-5" />
            </button>

            <button
              onClick={() => setSidebarTab("history")}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 cursor-pointer ${
                sidebarTab === "history" ? "bg-violet-50 text-violet-600" : "text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              }`}
              title="History"
            >
              <History className="w-5 h-5" />
            </button>

            <div className="flex-1" />

            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-400 to-violet-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
              P
            </div>
          </aside>

          {/* ─── Main Content ─── */}
          <div className="flex-1 flex flex-col min-w-0">
            
            {/* History panel overlay */}
            <AnimatePresence>
              {sidebarTab === "history" && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-[76px] top-0 bottom-0 w-72 bg-white border-r border-[#E5E7EB] z-10 shadow-lg flex flex-col"
                >
                  <div className="flex items-center justify-between p-4 border-b border-[#E5E7EB]">
                    <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                      <History className="w-4 h-4 text-violet-600" />
                      History
                    </h3>
                    <div className="flex items-center gap-1">
                      <button onClick={clearAllSessions} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-red-500 transition-colors cursor-pointer" title="Clear all">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => setSidebarTab("chat")} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
                    {sessions.length === 0 && (
                      <p className="text-xs text-gray-400 text-center py-8">No chats yet</p>
                    )}
                    {sessions.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => { setActiveSessionId(s.id); setSidebarTab("chat"); }}
                        className={`w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all duration-300 cursor-pointer group ${
                          s.id === activeSessionId ? "bg-violet-50 text-violet-700" : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="truncate text-xs font-medium flex items-center gap-2">
                            <MessageCircle className="w-3 h-3 shrink-0" />
                            {s.title}
                          </span>
                          <button
                            onClick={(e) => { e.stopPropagation(); deleteSession(s.id); }}
                            className="p-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-gray-400 hover:text-red-500 shrink-0"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="p-3 border-t border-[#E5E7EB]">
                    <button
                      onClick={createNewSession}
                      className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-violet-600 text-white text-xs font-semibold rounded-xl hover:bg-violet-700 transition-all duration-300 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      New Chat
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ─── Messages Area ─── */}
            <div className="flex-1 overflow-y-auto p-6 lg:p-8">
              <div className="max-w-[740px] mx-auto">
                
                {/* Landing view (no messages yet) */}
                {!hasMessages && !streamingContent && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center text-center pt-8 lg:pt-12"
                  >
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-violet-400 to-violet-600 flex items-center justify-center text-white text-xl font-bold mb-6 shadow-lg shadow-violet-200">
                      P
                    </div>
                    <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 tracking-tight">
                      {greeting}
                    </h1>
                    <p className="text-gray-400 mt-2 text-base">
                      How can I help you today?
                    </p>

                    {/* Quick topics */}
                    <div className="flex flex-wrap justify-center gap-2 mt-6">
                      {quickTopics.map((item) => (
                        <button
                          key={item.label}
                          onClick={() => handleQuickReply(item.label, item.query)}
                          disabled={isWaiting}
                          className="px-4 py-2 text-sm bg-gray-50 hover:bg-violet-50 hover:text-violet-700 disabled:opacity-50 text-gray-600 rounded-xl transition-all duration-300 border border-[#E5E7EB] cursor-pointer"
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>

                    {/* Recent chats */}
                    {recentSessions.length > 0 && (
                      <div className="w-full mt-10">
                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider text-left mb-3">
                          Your recent chats
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {recentSessions.map((s) => {
                            const lastMsg = [...s.messages].reverse().find((m) => m.role === "user");
                            const preview = lastMsg ? (lastMsg.content.length > 60 ? lastMsg.content.slice(0, 60) + "..." : lastMsg.content) : "";
                            return (
                              <button
                                key={s.id}
                                onClick={() => setActiveSessionId(s.id)}
                                className="text-left p-4 bg-gray-50 hover:bg-violet-50 border border-[#E5E7EB] rounded-xl transition-all duration-300 cursor-pointer group"
                              >
                                <div className="flex items-center gap-2 text-sm font-medium text-gray-800">
                                  <MessageCircle className="w-4 h-4 text-violet-500 shrink-0" />
                                  <span className="truncate">{s.title}</span>
                                </div>
                                {preview && (
                                  <p className="text-xs text-gray-400 mt-1.5 line-clamp-2">{preview}</p>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Chat messages */}
                {(hasMessages || currentStreaming) && (
                  <div className="flex flex-col gap-4 pb-4">
                    {messages.filter((m) => m.id !== "welcome").map((msg) => (
                      <ChatBubble key={msg.id} role={msg.role} content={msg.content} image={msg.image} links={msg.links} />
                    ))}
                    {isWaiting && currentStreaming && (
                      <div className="flex flex-col self-start items-start max-w-[88%] lg:max-w-[80%]">
                        <div className="bg-card border border-[#E5E7EB] text-gray-800 rounded-2xl rounded-tl-none shadow-sm p-4 w-full">
                          <div className="prose prose-sm max-w-none dark:prose-invert">
                            <MarkdownRenderer content={currentStreaming + " ●"} />
                          </div>
                        </div>
                      </div>
                    )}
                    {isWaiting && !currentStreaming && (
                      <div className="flex items-center gap-2 self-start ml-1">
                        <div className="flex items-center gap-1.5 bg-white border border-[#E5E7EB] px-4 py-3 rounded-2xl shadow-sm">
                          <span className="w-1.5 h-1.5 bg-violet-600/60 rounded-full animate-bounce" />
                          <span className="w-1.5 h-1.5 bg-violet-600/60 rounded-full animate-bounce [animation-delay:0.15s]" />
                          <span className="w-1.5 h-1.5 bg-violet-600/60 rounded-full animate-bounce [animation-delay:0.3s]" />
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </div>
            </div>

            {/* ─── Input Area ─── */}
            <div className="px-6 lg:px-8 pb-6 pt-2">
              <div className="max-w-[740px] mx-auto">
                {selectedImage && (
                  <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-xl mb-3 border border-[#E5E7EB]">
                    <img src={selectedImage.preview} alt="" className="w-10 h-10 object-cover rounded-lg border border-[#E5E7EB]" />
                    <span className="text-xs text-gray-500 flex-1 truncate">{selectedImage.file.name}</span>
                    <button onClick={() => { URL.revokeObjectURL(selectedImage.preview); setSelectedImage(null); }} className="p-1 hover:bg-gray-200 rounded-lg text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
                <form onSubmit={handleSend} className="flex items-center gap-2 bg-gray-50 border border-[#E5E7EB] rounded-[18px] px-4 py-2 focus-within:border-violet-300 focus-within:ring-2 focus-within:ring-violet-100 transition-all duration-300">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    hidden
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isWaiting}
                    className="p-1.5 text-gray-400 hover:text-violet-600 disabled:opacity-40 transition-colors duration-300 cursor-pointer shrink-0"
                    title="Attach image"
                  >
                    <Paperclip className="w-5 h-5" />
                  </button>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask me anything..."
                    disabled={isWaiting}
                    className="flex-1 bg-transparent py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none font-sans disabled:opacity-50"
                  />
                  <button
                    type="button"
                    onClick={startVoiceInput}
                    disabled={isWaiting}
                    className={`p-1.5 transition-colors duration-300 cursor-pointer shrink-0 ${
                      isListening ? "text-violet-600" : "text-gray-400 hover:text-violet-600 disabled:opacity-40"
                    }`}
                    title={isListening ? "Stop recording" : "Voice input"}
                  >
                    {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  </button>
                  <button
                    type="submit"
                    disabled={(!input.trim() && !selectedImage) || isWaiting}
                    className="p-2.5 bg-violet-600 hover:bg-violet-700 disabled:opacity-40 text-white rounded-xl transition-all duration-300 cursor-pointer shrink-0 shadow-sm hover:shadow-md"
                    aria-label="Send"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default AITutor;