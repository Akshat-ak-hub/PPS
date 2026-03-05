import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Download, Calendar, Clock } from "lucide-react";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/SectionHeading";
import { admissionSteps, importantDates } from "@/data/schoolData";
import form from "@/assets/Priya_Public_School_Admission_Form (3).pdf";

const Admissions = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-24 lg:pt-32 pb-16 lg:pb-24 bg-hero-gradient text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-block px-4 py-2 bg-secondary text-secondary-foreground text-sm font-semibold rounded-full mb-6">
              Admissions Open
            </span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Begin Your Journey
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
              Join a community dedicated to nurturing excellence. We welcome
              families who share our commitment to education and character
              development.
            </p>
            <a
              href="#apply"
              className="inline-flex items-center gap-2 px-8 py-4 bg-secondary text-secondary-foreground font-semibold rounded-xl hover:opacity-90 transition-opacity"
            >
              Start Application
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Admission Process */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            badge="How to Apply"
            title="Admission Process"
            subtitle="A straightforward six-step process to help you join our community."
          />

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border hidden md:block" />

              {admissionSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative flex gap-6 mb-8 last:mb-0"
                >
                  {/* Step number */}
                  <div className="w-16 h-16 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold flex-shrink-0 z-10">
                    {step.step}
                  </div>

                  {/* Content */}
                  <div className="flex-1 bg-card rounded-2xl p-6 shadow-card border border-border">
                    <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <section className="py-16 lg:py-24 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-1.5 bg-secondary/20 text-secondary-foreground text-sm font-semibold rounded-full mb-4">
                Requirements
              </span>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-6">
                Eligibility Criteria
              </h2>
              <div className="space-y-4">
                <div className="bg-card rounded-xl p-5 shadow-card border border-border">
                  <h4 className="font-semibold text-foreground mb-2">
                    Age Requirements
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    Students must meet age requirements as of September 1st of
                    the enrollment year. Pre-K: 3-4 years, Kindergarten: 5 years.
                  </p>
                </div>
                <div className="bg-card rounded-xl p-5 shadow-card border border-border">
                  <h4 className="font-semibold text-foreground mb-2">
                    Academic Records
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    Previous academic transcripts and report cards for students
                    entering Grade 1 and above.
                  </p>
                </div>
                <div className="bg-card rounded-xl p-5 shadow-card border border-border">
                  <h4 className="font-semibold text-foreground mb-2">
                    Recommendation Letters
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    Two letters of recommendation from teachers or school
                    administrators (for Grade 6+).
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block px-4 py-1.5 bg-accent/20 text-accent text-sm font-semibold rounded-full mb-4">
                Important Dates
              </span>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-6">
                Key Deadlines
              </h2>
              <div className="space-y-3">
                {importantDates.map((item, index) => (
                  <motion.div
                    key={item.event}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-4 bg-card rounded-xl p-4 shadow-card border border-border"
                  >
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${item.type === "deadline"
                          ? "bg-destructive/10"
                          : item.type === "event"
                            ? "bg-accent/10"
                            : "bg-secondary/10"
                        }`}
                    >
                      {item.type === "event" ? (
                        <Calendar className="w-6 h-6 text-accent" />
                      ) : (
                        <Clock
                          className={`w-6 h-6 ${item.type === "deadline"
                              ? "text-destructive"
                              : "text-secondary"
                            }`}
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">
                        {item.event}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {item.date}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Apply Now */}
      <section id="apply" className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <SectionHeading
            badge="Take Action"
            title="Ready to Apply?"
            subtitle="Download the application form or start your online application today."
          />

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/apply-online">
              <button className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-card">
              Apply Online
              <ArrowRight className="w-5 h-5" />
            </button>
            </Link>
            <a
              href={form}
              download
            >
              <button className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-card text-foreground font-semibold rounded-xl border border-border hover:bg-muted transition-colors shadow-card">
                <Download className="w-5 h-5" />
                Download Form (PDF)
              </button>
            </a>

          </div>

          <p className="text-muted-foreground mt-6">
            Questions?{" "}
            <Link to="/contact" className="text-primary hover:underline">
              Contact our admissions team
            </Link>
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Admissions;
