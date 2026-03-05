import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/SectionHeading";

const OnlineApplication = () => {
  return (
    <Layout>
      <section className="pt-24 lg:pt-32 pb-16 lg:pb-20 bg-muted">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <SectionHeading
            badge="Apply Online"
            title="Student Application Form"
            subtitle="Please fill out all required fields to submit your child's admission application."
          />
        </div>

        <div className="container mx-auto px-4 lg:px-8">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border shadow-card rounded-2xl p-8 max-w-3xl mx-auto space-y-8"
          >
            {/* Student Information */}
            <div>
              <h2 className="text-xl font-semibold mb-4 text-foreground">
                Student Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">First Name *</label>
                  <input
                    type="text"
                    className="w-full p-3 bg-muted/40 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1">Last Name *</label>
                  <input
                    type="text"
                    className="w-full p-3 bg-muted/40 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm mb-1">Date of Birth *</label>
                  <input
                    type="date"
                    className="w-full p-3 bg-muted/40 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm mb-1">Applying For Grade *</label>
                  <select
                    className="w-full p-3 bg-muted/40 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  >
                    <option>Select Grade</option>
                    <option>Pre-Primary</option>
                    <option>Kindergarten</option>
                    <option>Grade 1</option>
                    <option>Grade 2</option>
                    <option>Grade 3</option>
                    <option>Grade 4</option>
                    <option>Grade 5</option>
                    <option>Grade 6</option>
                    <option>Grade 7</option>
                    <option>Grade 8</option>
                    <option>Grade 9</option>
                    <option>Grade 10</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Parent Information */}
            <div>
              <h2 className="text-xl font-semibold mb-4 text-foreground">
                Parent / Guardian Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">Parent Name *</label>
                  <input
                    type="text"
                    className="w-full p-3 bg-muted/40 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1">Relationship *</label>
                  <input
                    type="text"
                    placeholder="Father / Mother / Guardian"
                    className="w-full p-3 bg-muted/40 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    className="w-full p-3 bg-muted/40 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1">Email *</label>
                  <input
                    type="email"
                    className="w-full p-3 bg-muted/40 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm mb-1">Address *</label>
                  <textarea
                    rows={3}
                    className="w-full p-3 bg-muted/40 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Previous School */}
            <div>
              <h2 className="text-xl font-semibold mb-4 text-foreground">
                Previous School Details (if applicable)
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-1">School Name</label>
                  <input
                    type="text"
                    className="w-full p-3 bg-muted/40 rounded-lg border border-border"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1">Last Grade Completed</label>
                  <input
                    type="text"
                    className="w-full p-3 bg-muted/40 rounded-lg border border-border"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center pt-4">
              <button
                type="submit"
                className="px-10 py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-card"
              >
                Submit Application
              </button>
            </div>
          </motion.form>
        </div>
      </section>
    </Layout>
  );
};

export default OnlineApplication;
