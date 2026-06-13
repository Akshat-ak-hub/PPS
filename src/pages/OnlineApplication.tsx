import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/SectionHeading";
import { schoolInfo } from "@/data/schoolData";

const emailjsConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
};

const isEmailJsConfigured =
  emailjsConfig.serviceId && emailjsConfig.templateId && emailjsConfig.publicKey;

const OnlineApplication = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isEmailJsConfigured) {
      toast({
        title: "Email not configured",
        description: "Please set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY in your .env file.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      await emailjs.send(
        emailjsConfig.serviceId!,
        emailjsConfig.templateId!,
        {
          first_name: data.get("firstName"),
          last_name: data.get("lastName"),
          dob: data.get("dob"),
          grade: data.get("grade"),
          parent_name: data.get("parentName"),
          relationship: data.get("relationship"),
          phone: data.get("phone"),
          email: data.get("email"),
          address: data.get("address"),
          prev_school: data.get("prevSchool"),
          prev_grade: data.get("prevGrade"),
        },
        emailjsConfig.publicKey!
      );

      toast({
        title: "Application Submitted!",
        description: "We have received your application and will contact you soon.",
      });
      form.reset();
    } catch {
      toast({
        title: "Submission Failed",
        description: "Email service error. Please contact us at " + schoolInfo.phone,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
            onSubmit={handleSubmit}
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
                  <label className="block text-sm mb-1" htmlFor="firstName">First Name *</label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    className="w-full p-3 bg-muted/40 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1" htmlFor="lastName">Last Name *</label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    className="w-full p-3 bg-muted/40 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm mb-1" htmlFor="dob">Date of Birth *</label>
                  <input
                    id="dob"
                    name="dob"
                    type="date"
                    className="w-full p-3 bg-muted/40 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm mb-1" htmlFor="grade">Applying For Grade *</label>
                  <select
                    id="grade"
                    name="grade"
                    className="w-full p-3 bg-muted/40 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  >
                    <option value="">Select Grade</option>
                    <option value="Pre-Primary">Pre-Primary</option>
                    <option value="Kindergarten">Kindergarten</option>
                    <option value="Grade 1">Grade 1</option>
                    <option value="Grade 2">Grade 2</option>
                    <option value="Grade 3">Grade 3</option>
                    <option value="Grade 4">Grade 4</option>
                    <option value="Grade 5">Grade 5</option>
                    <option value="Grade 6">Grade 6</option>
                    <option value="Grade 7">Grade 7</option>
                    <option value="Grade 8">Grade 8</option>
                    <option value="Grade 9">Grade 9</option>
                    <option value="Grade 10">Grade 10</option>
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
                  <label className="block text-sm mb-1" htmlFor="parentName">Parent Name *</label>
                  <input
                    id="parentName"
                    name="parentName"
                    type="text"
                    className="w-full p-3 bg-muted/40 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1" htmlFor="relationship">Relationship *</label>
                  <input
                    id="relationship"
                    name="relationship"
                    type="text"
                    placeholder="Father / Mother / Guardian"
                    className="w-full p-3 bg-muted/40 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1" htmlFor="phone">Phone Number *</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    className="w-full p-3 bg-muted/40 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1" htmlFor="email">Email *</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="w-full p-3 bg-muted/40 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm mb-1" htmlFor="address">Address *</label>
                  <textarea
                    id="address"
                    name="address"
                    rows={3}
                    className="w-full p-3 bg-muted/40 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                    required
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
                  <label className="block text-sm mb-1" htmlFor="prevSchool">School Name</label>
                  <input
                    id="prevSchool"
                    name="prevSchool"
                    type="text"
                    className="w-full p-3 bg-muted/40 rounded-lg border border-border"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1" htmlFor="prevGrade">Last Grade Completed</label>
                  <input
                    id="prevGrade"
                    name="prevGrade"
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
                disabled={isSubmitting}
                className="px-10 py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-card disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </button>
            </div>
          </motion.form>
        </div>
      </section>
    </Layout>
  );
};

export default OnlineApplication;
