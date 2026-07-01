import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send, Sparkles, Bot, MessageCircle, History, Trash2, Mic, MicOff, Menu, X
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/SectionHeading";
import ChatBubble from "@/components/ai/ChatBubble";
import ImageUploader from "@/components/ai/ImageUploader";

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
  { label: "Contact 📞", query: "What are the school contact details?" },
  { label: "Events 🎉", query: "What are the upcoming school events?" },
  { label: "Faculty 👨‍🏫", query: "Who are the teachers and staff members?" },
  { label: "Facilities 🏫", query: "What facilities does the school offer?" }
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

const AITutor = () => {
  const [sessions, setSessions] = useState<ChatSession[]>(() => {
    const saved = localStorage.getItem("ai-tutor-sessions");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        sessionCounter = parsed.length;
        return parsed;
      } catch { /* ignore */ }
    }
    return [];
  });
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [isWaiting, setIsWaiting] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{ file: File; preview: string } | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [streamingContent, setStreamingContent] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    localStorage.setItem("ai-tutor-sessions", JSON.stringify(sessions));
  }, [sessions]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [sessions, activeSessionId, isWaiting, streamingContent]);

  const activeSession = sessions.find((s) => s.id === activeSessionId) || null;
  const messages = activeSession?.messages || [];

  const createNewSession = useCallback(() => {
    sessionCounter++;
    const newSession: ChatSession = {
      id: crypto.randomUUID(),
      title: `Chat ${sessionCounter}`,
      messages: [
        { id: "welcome", role: "assistant", content: WELCOME_MESSAGE, links: [] }
      ],
    };
    setSessions((prev) => [newSession, ...prev]);
    setActiveSessionId(newSession.id);
    setShowSidebar(false);
  }, []);

  useEffect(() => {
    if (sessions.length === 0) {
      createNewSession();
    } else if (!activeSessionId) {
      setActiveSessionId(sessions[0].id);
    }
  }, [sessions.length, activeSessionId, createNewSession]);

  const deleteSession = (id: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
    if (activeSessionId === id) {
      const remaining = sessions.filter((s) => s.id !== id);
      if (remaining.length > 0) {
        setActiveSessionId(remaining[0].id);
      } else {
        setActiveSessionId(null);
        createNewSession();
      }
    }
  };

  const clearAllSessions = () => {
    setSessions([]);
    setActiveSessionId(null);
    setStreamingContent("");
    createNewSession();
  };

  const updateSessionMessages = (sessionId: string, newMessages: Message[]) => {
    setSessions((prev) =>
      prev.map((s) => (s.id === sessionId ? { ...s, messages: newMessages } : s))
    );
    if (newMessages.length > 2) {
      const lastUserMsg = [...newMessages].reverse().find((m) => m.role === "user");
      if (lastUserMsg) {
        const title = lastUserMsg.content.length > 30
          ? lastUserMsg.content.slice(0, 30) + "..."
          : lastUserMsg.content;
        setSessions((prev) =>
          prev.map((s) => (s.id === sessionId ? { ...s, title } : s))
        );
      }
    }
  };

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

  const handleQuery = useCallback(async (userContent: string, imageData?: string, imageMimeType?: string) => {
    if (!activeSessionId) return;
    setIsWaiting(true);
    setStreamingContent("");

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

      if (!res.ok) throw new Error(`Server error ${res.status}`);

      const data = await res.json();
      const fullText = data.response;
      const { text, links } = parseLinks(fullText);

      const words = (text || fullText).split(" ");
      let idx = 0;
      const typeInterval = setInterval(() => {
        if (idx < words.length) {
          setStreamingContent(words.slice(0, idx + 1).join(" "));
          idx++;
        } else {
          clearInterval(typeInterval);
          setStreamingContent("");
          const newMsgs = [
            ...messages,
            { id: crypto.randomUUID(), role: "assistant" as const, content: text || fullText, links }
          ];
          updateSessionMessages(activeSessionId, newMsgs);
          setIsWaiting(false);
        }
      }, 40);
    } catch (err) {
      console.error("Chatbot error:", err);
      const newMsgs = [
        ...messages,
        {
          id: crypto.randomUUID(),
          role: "assistant" as const,
          content: "Sorry, I'm currently unable to answer. Please try again later.",
          links: []
        }
      ];
      updateSessionMessages(activeSessionId, newMsgs);
      setIsWaiting(false);
    } finally {
      inputRef.current?.focus();
    }
  }, [activeSessionId, messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if ((!trimmed && !selectedImage) || isWaiting || !activeSessionId) return;

    let imageDataUrl: string | undefined;
    let rawImageData: string | undefined;
    let imageMimeType: string | undefined;

    if (selectedImage) {
      const dataUrl = await fileToBase64(selectedImage.file);
      imageDataUrl = dataUrl;
      rawImageData = dataUrl.split(",")[1];
      imageMimeType = selectedImage.file.type;
      URL.revokeObjectURL(selectedImage.preview);
      setSelectedImage(null);
    }

    const userMsg: Message = {
      id: crypto.randomUUID(), role: "user", content: trimmed, links: [], image: imageDataUrl
    };
    const newMsgs = [...messages, userMsg];
    updateSessionMessages(activeSessionId, newMsgs);
    setInput("");
    handleQuery(trimmed, rawImageData, imageMimeType);
  };

  const handleQuickReply = (label: string, query: string) => {
    if (isWaiting || !activeSessionId) return;
    const userMsg: Message = {
      id: crypto.randomUUID(), role: "user", content: label, links: []
    };
    const newMsgs = [...messages, userMsg];
    updateSessionMessages(activeSessionId, newMsgs);
    setInput("");
    handleQuery(query);
  };

  const startVoiceInput = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice input is not supported in your browser. Try Chrome or Edge.");
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognitionRef.current = recognition;

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput((prev) => prev + transcript);
    };
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognition.start();
    setIsListening(true);
  };

  const handleImageSelect = (file: File) => {
    const preview = URL.createObjectURL(file);
    setSelectedImage({ file, preview });
  };

  const handleImageRemove = () => {
    if (selectedImage) {
      URL.revokeObjectURL(selectedImage.preview);
      setSelectedImage(null);
    }
  };

  const currentStreaming = streamingContent || null;

  return (
    <Layout>
      <div className="min-h-[calc(100vh-4rem)] flex flex-col lg:flex-row pt-16">
        {/* Sidebar */}
        <AnimatePresence mode="wait">
          {showSidebar && (
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="w-full lg:w-72 shrink-0 bg-muted/50 border-b lg:border-b-0 lg:border-r border-border flex flex-col"
            >
              <div className="p-4 border-b border-border flex items-center justify-between">
                <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
                  <History className="w-4 h-4 text-primary" />
                  Chat History
                </h2>
                <div className="flex items-center gap-1">
                  <button
                    onClick={clearAllSessions}
                    className="p-1.5 hover:bg-background rounded-lg text-muted-foreground hover:text-destructive transition-colors cursor-pointer"
                    aria-label="Clear all chats"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setShowSidebar(false)}
                    className="p-1.5 hover:bg-background rounded-lg text-muted-foreground hover:text-foreground transition-colors lg:hidden cursor-pointer"
                    aria-label="Close sidebar"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-2 space-y-1">
                {sessions.map((session) => (
                  <button
                    key={session.id}
                    onClick={() => { setActiveSessionId(session.id); setShowSidebar(false); }}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all cursor-pointer group ${
                      session.id === activeSessionId
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-foreground hover:bg-background"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="truncate font-medium flex items-center gap-2">
                        <MessageCircle className="w-3.5 h-3.5 shrink-0" />
                        {session.title}
                      </span>
                      <button
                        onClick={(e) => { e.stopPropagation(); deleteSession(session.id); }}
                        className={`p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shrink-0 ${
                          session.id === activeSessionId
                            ? "hover:bg-white/20 text-white/80"
                            : "hover:bg-muted text-muted-foreground"
                        }`}
                        aria-label="Delete chat"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  </button>
                ))}
              </div>
              <div className="p-3 border-t border-border">
                <button
                  onClick={createNewSession}
                  className="w-full px-4 py-2.5 bg-primary text-primary-foreground font-semibold text-sm rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  New Chat
                </button>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* Mobile sidebar toggle */}
          <div className="flex items-center gap-2 p-3 border-b border-border bg-card lg:hidden">
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="p-1.5 hover:bg-muted rounded-lg text-foreground transition-colors cursor-pointer"
              aria-label="Toggle sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="text-sm font-semibold text-foreground truncate">
              {activeSession?.title || "AI Tutor"}
            </span>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 lg:p-6 bg-background/40">
            <div className="max-w-4xl mx-auto flex flex-col gap-4">
              {messages.map((msg) => (
                <ChatBubble
                  key={msg.id}
                  role={msg.role}
                  content={msg.content}
                  image={msg.image}
                  links={msg.links}
                />
              ))}

              {/* Streaming / thinking indicator */}
              {isWaiting && (
                <div className="flex flex-col self-start items-start max-w-[92%] lg:max-w-[85%]">
                  <div className="bg-card border border-border text-foreground rounded-2xl rounded-tl-none shadow-sm p-4 w-full">
                    {currentStreaming ? (
                      <div className="prose prose-sm max-w-none dark:prose-invert">
                        <ChatBubble
                          role="assistant"
                          content={currentStreaming + " ●"}
                          links={[]}
                        />
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm text-muted-foreground font-medium">Thinking</span>
                        <span className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce" />
                        <span className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce [animation-delay:0.15s]" />
                        <span className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce [animation-delay:0.3s]" />
                      </div>
                    )}
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <div className="border-t border-border bg-card p-4 lg:p-5">
            <div className="max-w-4xl mx-auto">
              {selectedImage && (
                <div className="mb-3">
                  <ImageUploader
                    onImageSelect={handleImageSelect}
                    onImageRemove={handleImageRemove}
                    selectedImage={selectedImage}
                    disabled={isWaiting}
                  />
                </div>
              )}
              <form onSubmit={handleSend} className="flex gap-2">
                {!selectedImage && (
                  <ImageUploader
                    onImageSelect={handleImageSelect}
                    onImageRemove={handleImageRemove}
                    selectedImage={null}
                    disabled={isWaiting}
                  />
                )}
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything about the school... (images supported)"
                  disabled={isWaiting}
                  className="flex-1 px-4 py-2.5 text-sm bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-foreground font-sans disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={startVoiceInput}
                  disabled={isWaiting}
                  className={`p-2.5 rounded-xl flex items-center justify-center transition-all cursor-pointer border ${
                    isListening
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card hover:bg-muted disabled:opacity-50 text-foreground border-border"
                  }`}
                  aria-label={isListening ? "Stop recording" : "Voice input"}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>
                <button
                  type="submit"
                  disabled={(!input.trim() && !selectedImage) || isWaiting}
                  className="p-2.5 bg-primary hover:opacity-90 disabled:opacity-50 text-white rounded-xl flex items-center justify-center transition-all cursor-pointer"
                  aria-label="Send Message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AITutor;