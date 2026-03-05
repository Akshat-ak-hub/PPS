import { motion } from "framer-motion";
import { BookOpen, GraduationCap } from "lucide-react";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/SectionHeading";
import FacultyCard from "@/components/ui/FacultyCard";
import { grades, curriculum, faculty } from "@/data/schoolData";

const Academics = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-24 lg:pt-32 pb-16 lg:pb-24 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            badge="Academics"
            title="Excellence in Education"
            subtitle="A comprehensive curriculum designed to challenge, inspire, and prepare students for success."
          />
        </div>
      </section>

      {/* Grades/Classes */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            badge="Grade Levels"
            title="Our Academic Programs"
            subtitle="From early childhood through high school, we offer a continuous path of growth and discovery."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {grades.map((grade, index) => (
              <motion.div
                key={grade.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl p-6 shadow-card border border-border hover:shadow-card-hover transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <GraduationCap className="w-6 h-6 text-accent-foreground" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-1">
                  {grade.name}
                </h3>
                <p className="text-secondary font-medium text-sm mb-3">
                  Ages {grade.ages}
                </p>
                <p className="text-muted-foreground text-sm">
                  {grade.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-16 lg:py-24 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            badge="What We Teach"
            title="Curriculum Overview"
            subtitle="A balanced program that develops academic skills, creative expression, and physical well-being."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {curriculum.map((subject, index) => (
              <motion.div
                key={subject.subject}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-card rounded-xl p-5 shadow-card border border-border hover:border-primary/30 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      {subject.subject}
                    </h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {subject.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Faculty */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            badge="Our Team"
            title="Meet Our Faculty"
            subtitle="Dedicated educators committed to bringing out the best in every student."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {faculty.map((member, index) => (
              <FacultyCard key={member.id} {...member} index={index} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Academics;
