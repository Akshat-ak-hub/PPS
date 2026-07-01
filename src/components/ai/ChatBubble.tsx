import { useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Copy, Check, FileDown, ImageDown, Volume2, VolumeX, Info } from "lucide-react";
import MarkdownRenderer from "./MarkdownRenderer";

interface ChatBubbleProps {
  role: "user" | "assistant";
  content: string;
  image?: string;
  links: { label: string; url: string }[];
}

const ChatBubble = ({ role, content, image, links }: ChatBubbleProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = content;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [content]);

  const handleDownloadPDF = useCallback(async () => {
    if (!cardRef.current) return;
    const { default: html2canvas } = await import("html2canvas");
    const { default: jsPDF } = await import("jspdf");

    const canvas = await html2canvas(cardRef.current, {
      scale: 2,
      backgroundColor: "#ffffff",
    });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("solution.pdf");
  }, []);

  const handleDownloadPNG = useCallback(async () => {
    if (!cardRef.current) return;
    const { default: html2canvas } = await import("html2canvas");

    const canvas = await html2canvas(cardRef.current, {
      scale: 2,
      backgroundColor: "#ffffff",
    });
    const link = document.createElement("a");
    link.download = "solution.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }, []);

  const handleSpeak = useCallback(() => {
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    const plainText = content.replace(/[#*`\[\]()>|\\$_{}~]/g, "").trim();
    if (!plainText) return;
    const utterance = new SpeechSynthesisUtterance(plainText);
    utterance.rate = 0.9;
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utterance);
    setSpeaking(true);
  }, [content, speaking]);

  return (
    <div className={`flex flex-col max-w-[92%] lg:max-w-[85%] ${role === "user" ? "self-end items-end" : "self-start items-start"}`}>
      <div
        ref={cardRef}
        className={`rounded-2xl text-sm leading-relaxed w-full ${
          role === "user"
            ? "bg-primary text-primary-foreground rounded-tr-none shadow-sm"
            : "bg-card border border-border text-foreground rounded-tl-none shadow-sm"
        }`}
      >
        <div className={`p-4 ${role === "assistant" ? "bg-gradient-to-b from-primary/[0.02] to-transparent" : ""}`}>
          {role === "user" ? (
            <div>
              {image && (
                <img src={image} alt="Uploaded" className="max-w-full rounded-lg mb-2 max-h-56 object-contain bg-black/5" />
              )}
              {content && <p className="text-sm">{content}</p>}
            </div>
          ) : (
            <div className="relative">
              <MarkdownRenderer content={content} />
            </div>
          )}
        </div>

        {role === "assistant" && (
          <div className="px-4 pb-3 flex flex-wrap items-center gap-1.5 border-t border-border/50 pt-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium bg-background/50 hover:bg-background border border-border rounded-lg text-muted-foreground hover:text-foreground transition-all cursor-pointer"
              aria-label="Copy text"
            >
              {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
              {copied ? "Copied" : "Copy"}
            </button>
            <button
              onClick={handleDownloadPDF}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium bg-background/50 hover:bg-background border border-border rounded-lg text-muted-foreground hover:text-foreground transition-all cursor-pointer"
              aria-label="Download as PDF"
            >
              <FileDown className="w-3 h-3" />
              PDF
            </button>
            <button
              onClick={handleDownloadPNG}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium bg-background/50 hover:bg-background border border-border rounded-lg text-muted-foreground hover:text-foreground transition-all cursor-pointer"
              aria-label="Download as PNG"
            >
              <ImageDown className="w-3 h-3" />
              PNG
            </button>
            <button
              onClick={handleSpeak}
              className={`inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium bg-background/50 hover:bg-background border border-border rounded-lg transition-all cursor-pointer ${
                speaking ? "text-primary border-primary/30 bg-primary/5" : "text-muted-foreground hover:text-foreground"
              }`}
              aria-label={speaking ? "Stop speaking" : "Read aloud"}
            >
              {speaking ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
              {speaking ? "Stop" : "Speak"}
            </button>
          </div>
        )}

        {links.length > 0 && (
          <div className="px-4 pb-3 flex flex-wrap gap-2 pt-0">
            {links.map((link) => (
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
  );
};

export default ChatBubble;