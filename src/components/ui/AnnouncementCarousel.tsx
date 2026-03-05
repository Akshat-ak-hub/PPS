import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Calendar, Megaphone } from "lucide-react";
import { announcements } from "@/data/schoolData";

const AnnouncementCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % announcements.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const next = () => {
    setIsAutoPlaying(false);
    setCurrent((prev) => (prev + 1) % announcements.length);
  };

  const prev = () => {
    setIsAutoPlaying(false);
    setCurrent((prev) => (prev - 1 + announcements.length) % announcements.length);
  };

  return (
    <div className="relative bg-card rounded-2xl shadow-card border border-border overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/50">
        <div className="flex items-center gap-2">
          <Megaphone className="w-5 h-5 text-secondary" />
          <h3 className="font-display font-semibold text-foreground">
            Latest Announcements
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={prev}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label="Previous announcement"
          >
            <ChevronLeft className="w-5 h-5 text-muted-foreground" />
          </button>
          <button
            onClick={next}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label="Next announcement"
          >
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </div>

      <div className="relative h-40 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 p-6"
          >
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Calendar className="w-4 h-4" />
              {announcements[current].date}
            </div>
            <h4 className="font-display text-lg font-semibold text-foreground mb-2">
              {announcements[current].title}
            </h4>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {announcements[current].description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center gap-2 pb-4">
        {announcements.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setIsAutoPlaying(false);
              setCurrent(index);
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              index === current ? "bg-primary w-6" : "bg-muted-foreground/30"
            }`}
            aria-label={`Go to announcement ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default AnnouncementCarousel;
