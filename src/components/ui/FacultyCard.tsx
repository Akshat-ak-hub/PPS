import { motion } from "framer-motion";
import { Mail, User } from "lucide-react";

interface FacultyCardProps {
  name: string;
  position: string;
  department: string;
  email: string;
  bio: string;
  index: number;
}

const FacultyCard = ({
  name,
  position,
  department,
  email,
  bio,
  index,
}: FacultyCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 border border-border"
    >
      <div className="relative h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
        <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
          <User className="w-12 h-12 text-primary" />
        </div>
      </div>
      <div className="p-6">
        <span className="text-xs font-semibold text-accent uppercase tracking-wider">
          {department}
        </span>
        <h3 className="font-display text-xl font-semibold text-foreground mt-1 mb-1">
          {name}
        </h3>
        <p className="text-secondary font-medium text-sm mb-3">{position}</p>
        <p className="text-muted-foreground text-sm leading-relaxed mb-4">{bio}</p>
        <a
          href={`mailto:${email}`}
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 text-sm font-medium transition-colors"
        >
          <Mail className="w-4 h-4" />
          {email}
        </a>
      </div>
    </motion.div>
  );
};

export default FacultyCard;
