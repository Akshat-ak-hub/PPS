import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/SectionHeading";
import { achievements, missionVision, schoolInfo } from "@/data/schoolData";

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-24 lg:pt-32 pb-16 lg:pb-24 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            badge="About Us"
            title="Our Story"
            subtitle={`Since ${schoolInfo.founded}, Priya Public School has been shaping young minds and building future leaders.`}
          />

          {/* History */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-card rounded-2xl p-8 lg:p-12 shadow-card border border-border">
              <h3 className="font-display text-2xl font-semibold text-foreground mb-6">
                A Legacy of Excellence
              </h3>
              <div className="prose prose-lg text-muted-foreground space-y-4">
                <p>
                Founded in 2002, Priya Public School has grown into a trusted institution of learning in the heart of rural Himachal Pradesh. What began as a small initiative to provide accessible education to local children has today become a beacon of academic excellence for the entire region. With a strong commitment to quality teaching and a student-centered approach, the school continues to uplift young learners and empower families through education.

                </p>
                <p>
                Surrounded by the peaceful hills of Himachal Pradesh, the school provides an ideal atmosphere for learning. With facilities like smart classrooms, science labs, and sports activities, Priya Public School aims to shape confident, responsible, and well-rounded students.
                </p>
                
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-primary text-primary-foreground rounded-2xl p-8 lg:p-10"
            >
              <h3 className="font-display text-2xl font-semibold mb-4">
                Our Mission
              </h3>
              <p className="text-lg leading-relaxed opacity-90">
                {missionVision.mission}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-accent text-accent-foreground rounded-2xl p-8 lg:p-10"
            >
              <h3 className="font-display text-2xl font-semibold mb-4">
                Our Vision
              </h3>
              <p className="text-lg leading-relaxed opacity-90">
                {missionVision.vision}
              </p>
            </motion.div>
          </div>

          {/* Core Values */}
          <SectionHeading
            badge="What We Stand For"
            title="Our Core Values"
            subtitle="The principles that guide everything we do at Priya Public School."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {missionVision.values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl p-6 text-center shadow-card border border-border hover:shadow-card-hover transition-shadow"
              >
                <div className="w-16 h-16 rounded-2xl bg-secondary/20 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-secondary" />
                </div>
                <h4 className="font-display text-lg font-semibold text-foreground mb-2">
                  {value.title}
                </h4>
                <p className="text-muted-foreground text-sm">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 lg:py-24 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            badge="Our Achievements"
            title="A Track Record of Success"
            subtitle="Recognition and milestones that reflect our commitment to excellence."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl p-6 shadow-card border border-border group hover:shadow-card-hover transition-all"
              >
                <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <achievement.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                  {achievement.year}
                </span>
                <h4 className="font-display text-lg font-semibold text-foreground mt-1 mb-2">
                  {achievement.title}
                </h4>
                <p className="text-muted-foreground text-sm">
                  {achievement.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
