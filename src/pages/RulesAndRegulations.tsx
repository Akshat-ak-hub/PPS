import { motion } from "framer-motion";
import {
  BookOpen,
  Clock,
  ShieldCheck,
  Shirt,
  AlertTriangle,
  IndianRupee,
  Wrench,
  HeartPulse,
  ChevronRight,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/SectionHeading";

const sections = [
  {
    icon: BookOpen,
    title: "Academic Rules",
    color: "bg-primary/10 text-primary",
    rules: [
      "Students should complete homework and assignments on time.",
      "Notebooks should be kept neat and brought to school regularly.",
      "Copying in exams or classwork is not allowed.",
      "Students should take part in class activities and discussions.",
      "Students must do their own work honestly.",
      "All tests and exams are important and should be attended.",
    ],
  },
  {
    icon: Clock,
    title: "Attendance & Punctuality",
    color: "bg-secondary/10 text-secondary-foreground",
    rules: [
      "Students should arrive at school on time every day.",
      "Regular attendance is important for good learning.",
      "Late students should first report to the school office.",
      "Parents should inform the school in advance if leave is planned.",
      "If a student is absent for many days without notice, the school may contact the parents.",
      "Students cannot leave the school during school hours without permission.",
    ],
  },
  {
    icon: Shirt,
    title: "Uniform & Appearance",
    color: "bg-accent/10 text-accent",
    rules: [
      "Students must wear the proper school uniform on school days.",
      "The uniform should be clean and worn properly.",
      "School shoes and socks should be worn as per school rules.",
      "Hair should be neat and tidy.",
      "Heavy jewellery, nail polish, and fancy accessories are not allowed.",
      "Students should wear their school ID card in the campus.",
    ],
  },
  {
    icon: ShieldCheck,
    title: "General Conduct",
    color: "bg-primary/20 text-primary",
    rules: [
      "Students should respect teachers, staff, and other students.",
      "Bullying, rude behavior, or bad language is not allowed.",
      "Mobile phones and unnecessary electronic items are not allowed in school.",
      "Students should maintain discipline in classrooms, corridors, library, and assembly.",
      "Students should keep the school clean and use dustbins.",
      "Students should behave well and help maintain a friendly school environment.",
    ],
  },
  {
    icon: AlertTriangle,
    title: "Discipline",
    color: "bg-destructive/10 text-destructive",
    rules: [
      "Repeated misbehavior may lead to disciplinary action.",
      "Students should not damage school property.",
      "Taking someone else's belongings without permission is not allowed.",
      "Spreading false information or creating trouble in school is not acceptable.",
      "For serious matters, parents may be asked to visit the school.",
    ],
  },
  {
    icon: IndianRupee,
    title: "Fee Rules",
    color: "bg-secondary/20 text-secondary-foreground",
    rules: [
      "School fees should be paid on time.",
      "Parents should keep fee receipts safely for future use.",
      "Any fee-related issue should be reported to the school office.",
      "Fees once paid will follow the school fee policy.",
    ],
  },
  {
    icon: Wrench,
    title: "Use of School Property",
    color: "bg-accent/20 text-accent",
    rules: [
      "Students should use school furniture, books, and equipment carefully.",
      "Library books should be returned on time.",
      "Lab equipment should be used only under teacher guidance.",
      "Students should not write on desks, walls, or school property.",
      "Sports items should be returned properly after use.",
      "Any lost or damaged school item should be reported to the teacher.",
    ],
  },
  {
    icon: HeartPulse,
    title: "Health & Safety",
    color: "bg-primary/5 text-primary",
    rules: [
      "Students who are unwell should stay at home and inform the school.",
      "Parents should inform the school about any medical condition or allergy.",
      "Students should follow safety rules during drills and emergencies.",
      "Sharp objects or dangerous items are not allowed in school.",
      "Students should maintain personal hygiene and cleanliness.",
      "Any injury or health problem in school should be reported to a teacher immediately.",
    ],
  },
];

const RulesAndRegulations = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-24 lg:pt-32 pb-16 lg:pb-24 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            badge="School Policy"
            title="Rules & Regulations"
            subtitle="These rules help us maintain a safe, respectful, and positive learning environment for all students."
          />
        </div>
      </section>

      {/* Important Note Banner */}
      <section className="py-8 bg-primary">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-primary-foreground text-sm lg:text-base font-medium"
          >
            These rules are made to help maintain a safe, respectful, and positive learning environment for all students. Parents are requested to guide their children to follow these school rules.
          </motion.p>
        </div>
      </section>

      {/* Rules Sections */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-card rounded-2xl p-7 shadow-card border border-border hover:shadow-lg transition-shadow"
              >
                {/* Section Header */}
                <div className="flex items-center gap-4 mb-5">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${section.color}`}
                  >
                    <section.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    {section.title}
                  </h3>
                </div>

                {/* Rules List */}
                <ul className="space-y-3">
                  {section.rules.map((rule, ruleIndex) => (
                    <li key={ruleIndex} className="flex items-start gap-3">
                      <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground leading-relaxed">
                        {rule}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Acknowledgement Note */}
      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto bg-card rounded-2xl p-8 shadow-card border border-border text-center"
          >
            <ShieldCheck className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              Parental Acknowledgement
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              By enrolling their child at Priya Public School, parents and guardians agree to support the school rules and discipline policy. The school may update these rules when needed, and parents will be informed through official communication.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              For queries, contact us at{" "}
              <a
                href="mailto:kakshat349@gmail.com"
                className="text-primary hover:underline font-medium"
              >
                kakshat349@gmail.com
              </a>
            </p>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default RulesAndRegulations;