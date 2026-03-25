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
    color: "bg-blue-500/10 text-blue-600",
    rules: [
      "Students must complete all homework and assignments on time.",
      "Classwork notebooks must be maintained neatly and brought to school daily.",
      "Cheating or copying during any examination will result in disciplinary action.",
      "Students are expected to participate actively in class discussions.",
      "Submitting another student's work as your own (plagiarism) is strictly prohibited.",
      "All unit tests, mid-terms, and annual examinations are compulsory.",
    ],
  },
  {
    icon: Clock,
    title: "Attendance & Punctuality",
    color: "bg-amber-500/10 text-amber-600",
    rules: [
      "School begins at 7:30 AM. Students must be seated before the bell rings.",
      "A minimum of 75% attendance is required to appear in annual examinations.",
      "Late arrivals must report to the office before entering the classroom.",
      "Planned leave must be applied for in writing by the parent/guardian in advance.",
      "Three consecutive unexplained absences will result in a notice to parents.",
      "Leaving school premises during school hours without permission is not allowed.",
    ],
  },
  {
    icon: Shirt,
    title: "Uniform & Appearance",
    color: "bg-purple-500/10 text-purple-600",
    rules: [
      "Wearing the prescribed school uniform is mandatory on all school days.",
      "Uniform must be clean, pressed, and properly worn at all times.",
      "School shoes and socks as per school guidelines must be worn every day.",
      "Hair must be neatly combed; boys should keep short hair.",
      "Jewellery, nail polish, and fancy accessories are not permitted.",
      "The school ID card must be worn around the neck on school premises.",
    ],
  },
  {
    icon: ShieldCheck,
    title: "General Conduct",
    color: "bg-green-500/10 text-green-600",
    rules: [
      "Students must show respect to all teachers, staff, and fellow students.",
      "Use of abusive language or bullying in any form will not be tolerated.",
      "Mobile phones and electronic devices are strictly prohibited on campus.",
      "Students must maintain silence in corridors, library, and during assembly.",
      "Littering on school premises is strictly prohibited — use dustbins.",
      "Any form of ragging or harassment will lead to immediate suspension.",
    ],
  },
  {
    icon: AlertTriangle,
    title: "Discipline & Consequences",
    color: "bg-red-500/10 text-red-600",
    rules: [
      "Repeated misconduct may result in detention, suspension, or expulsion.",
      "Damage to school property must be compensated for by the student's family.",
      "Participation in strikes, protests, or disruptions inside school is prohibited.",
      "Theft or possession of others' belongings will result in serious action.",
      "Spreading rumours or false information about peers or staff is a punishable offence.",
      "Parents will be called to school for serious disciplinary matters.",
    ],
  },
  {
    icon: IndianRupee,
    title: "Fee & Financial Rules",
    color: "bg-orange-500/10 text-orange-600",
    rules: [
      "School fees must be paid by the 10th of every month.",
      "A fine of ₹20 per day will be charged for late fee submission.",
      "Fee receipts must be kept safely; duplicate receipts incur a nominal charge.",
      "No student will be allowed to sit in examinations if fees are outstanding.",
      "Fee once paid is non-refundable except under exceptional circumstances.",
      "Any discrepancy in fee must be reported to the office within 7 days.",
    ],
  },
  {
    icon: Wrench,
    title: "Use of School Property",
    color: "bg-teal-500/10 text-teal-600",
    rules: [
      "Students must handle school furniture, equipment, and books with care.",
      "Library books must be returned within the due date to avoid fines.",
      "Lab equipment must be used only under teacher supervision.",
      "Do not write on desks, walls, or any school infrastructure.",
      "Sports equipment must be returned after use in the same condition.",
      "Lost school property must be reported to the class teacher immediately.",
    ],
  },
  {
    icon: HeartPulse,
    title: "Health & Safety",
    color: "bg-pink-500/10 text-pink-600",
    rules: [
      "Students with contagious illnesses must stay at home and inform school.",
      "Any medical condition or allergy must be disclosed to the school at admission.",
      "Students must follow all safety instructions during fire drills and emergency exercises.",
      "Bringing any sharp object, flammable material, or weapon to school is strictly forbidden.",
      "Students must maintain personal hygiene and wash hands regularly.",
      "Any injury on school premises must be reported to staff immediately.",
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
            subtitle="To maintain a safe, respectful, and productive learning environment, all students and parents are expected to follow these guidelines."
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
            These rules apply to all students from Class 1 to Class 10. Ignorance of any rule
            shall not be accepted as an excuse. Parents are requested to ensure their child is
            aware of all policies listed below.
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
              By enrolling your child at Priya Public School, parents and guardians agree to
              abide by all the rules and regulations set forth by the school administration.
              The school reserves the right to update these policies at any time. Parents will
              be notified of any significant changes through official communication.
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
