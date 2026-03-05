import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Play, Users, Trophy, Clock } from "lucide-react";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/SectionHeading";
import QuickLinkCard from "@/components/ui/QuickLinkCard";
import AnnouncementCarousel from "@/components/ui/AnnouncementCarousel";
import { quickLinks, schoolInfo } from "@/data/schoolData";
import heroCampus from "@/assets/hero-campus.jpg";
import principalImg from "@/assets/principal.jpg";

const stats = [
  { icon: Users, value: "100+", label: "Happy Students" },
  { icon: Trophy, value: "100%", label: "Value Based Education" },
  { icon: Clock, value: "20+", label: "Years of Excellence" },
];

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={heroCampus}
            alt="Priya Public School Campus"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 lg:px-8 py-32 lg:py-40">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 bg-secondary text-secondary-foreground text-sm font-semibold rounded-full mb-6">
                Established {schoolInfo.founded}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary-foreground leading-tight mb-6"
            >
              {schoolInfo.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl lg:text-2xl text-primary-foreground/90 mb-8 leading-relaxed"
            >
              {schoolInfo.tagline}. Where every student discovers their potential
              and becomes a leader of tomorrow.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                to="/admissions"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-secondary text-secondary-foreground font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-lg"
              >
                Apply Now
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-foreground/10 text-primary-foreground font-semibold rounded-xl border border-primary-foreground/20 hover:bg-primary-foreground/20 transition-colors"
              >
                <Play className="w-5 h-5" />
                Take a Virtual Tour
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="absolute bottom-0 left-0 right-0 bg-card/95 backdrop-blur-md border-t border-border"
        >
          <div className="container mx-auto px-4 lg:px-8 py-6">
            <div className="grid grid-cols-3 gap-4 lg:gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <stat.icon className="w-5 h-5 text-secondary hidden sm:block" />
                    <span className="font-display text-2xl lg:text-3xl font-bold text-foreground">
                      {stat.value}
                    </span>
                  </div>
                  <p className="text-xs lg:text-sm text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16 lg:py-24 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            badge="Get Started"
            title="How Can We Help You?"
            subtitle="Whether you're a prospective student, current parent, or curious visitor, we're here to guide you."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {quickLinks.map((link, index) => (
              <QuickLinkCard key={link.title} {...link} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Announcements & Principal Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            {/* Announcements */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <AnnouncementCarousel />
            </motion.div>

            {/* Principal's Welcome */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-2xl shadow-card border border-border overflow-hidden"
            >
              <div className="flex flex-col md:flex-row h-full">
                <div className="md:w-2/5 relative">
                  <img
                    src={principalImg}
                    alt="Mr. Gurdev Singh - Principal"
                    className="w-full h-48 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-3/5 p-6 flex flex-col justify-center">
                  <span className="text-xs font-semibold text-accent uppercase tracking-wider mb-2">
                    Principal's Message
                  </span>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                    Welcome to Our Community
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    "At Priya Public School, we believe in nurturing not only academic excellence but also discipline, values, and holistic growth. Every child who enters our school is guided with care, respect, and encouragement to discover their true potential. We take pride in creating a learning environment where students grow with confidence, compassion, and a strong sense of responsibility."
                  </p>
                  <div>
                    <p className="font-semibold text-foreground">
                      Mr. Gurdev Singh
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Principal, Priya Public School
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-hero-gradient text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Ready to Join Our Family?
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
              Take the first step towards an exceptional education. Applications
              for the upcoming academic year are now open.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/admissions"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-secondary text-secondary-foreground font-semibold rounded-xl hover:opacity-90 transition-opacity"
              >
                Start Your Application
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-foreground/10 text-primary-foreground font-semibold rounded-xl border border-primary-foreground/20 hover:bg-primary-foreground/20 transition-colors"
              >
                Schedule a Visit
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
