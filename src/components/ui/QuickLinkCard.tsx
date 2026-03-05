import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LucideIcon, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuickLinkCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  color: "primary" | "accent" | "secondary";
  index: number;
}

const colorClasses = {
  primary: "bg-primary text-primary-foreground",
  accent: "bg-accent text-accent-foreground",
  secondary: "bg-secondary text-secondary-foreground",
};

const QuickLinkCard = ({
  title,
  description,
  icon: Icon,
  href,
  color,
  index,
}: QuickLinkCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Link
        to={href}
        className="group block p-6 lg:p-8 bg-card rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 border border-border hover:border-primary/20"
      >
        <div
          className={cn(
            "w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110",
            colorClasses[color]
          )}
        >
          <Icon className="w-7 h-7" />
        </div>
        <h3 className="font-display text-xl font-semibold text-foreground mb-2">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
          {description}
        </p>
        <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all">
          Learn More <ArrowRight className="w-4 h-4" />
        </span>
      </Link>
    </motion.div>
  );
};

export default QuickLinkCard;
