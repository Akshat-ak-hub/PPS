import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/SectionHeading";
import { schoolInfo } from "@/data/schoolData";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you soon.",
    });

    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Address",
      content: schoolInfo.address,
    },
    {
      icon: Phone,
      title: "Phone",
      content: schoolInfo.phone,
    },
    {
      icon: Mail,
      title: "Email",
      content: schoolInfo.email,
    },
    {
      icon: Clock,
      title: "Office Hours",
      content: schoolInfo.hours,
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-24 lg:pt-32 pb-16 lg:pb-24 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            badge="Get in Touch"
            title="Contact Us"
            subtitle="We'd love to hear from you. Reach out with questions, feedback, or to schedule a visit."
          />
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-card rounded-2xl p-8 lg:p-10 shadow-card border border-border">
                <h3 className="font-display text-2xl font-semibold text-foreground mb-6">
                  Send Us a Message
                </h3>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      maxLength={100}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      placeholder="Your Name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      maxLength={255}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      placeholder="Your Email"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    >
                      <option value="">Select a Subject</option>
                      <option value="admissions">Admissions Inquiry</option>
                      <option value="tour">Schedule a Tour</option>
                      <option value="academics">Academic Programs</option>
                      <option value="fees">Tuition & Fees</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      maxLength={1000}
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>

            {/* Contact Info & Map */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Contact Info Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                {contactInfo.map((info, index) => (
                  <div
                    key={info.title}
                    className="bg-card rounded-xl p-5 shadow-card border border-border hover:shadow-lg transition-shadow"
                  >
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <info.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-semibold text-foreground mb-1 ">
                      {info.title}
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      {info.content}
                    </p>
                  </div>
                ))}
              </div>

              <div className="bg-card rounded-2xl p-6 shadow-card border border-border hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Why Visit Our Campus?
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  We welcome parents and students to visit Priya Public School and experience
                  our environment, teaching approach, and facilities. Schedule a tour to meet
                  our faculty and learn more about our academic programs.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li>• Explore classrooms & labs</li>
                  <li>• Meet teachers & staff</li>
                  <li>• Understand admission process</li>
                  <li>• Get personalized guidance</li>
                </ul>
              </div>

              {/* WhatsApp Quick Contact */}
              <a
                href="https://wa.me/919882062560"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white rounded-2xl p-5 shadow-card transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-8 h-8 fill-white flex-shrink-0">
                  <path d="M16 0C7.164 0 0 7.163 0 16c0 2.82.736 5.463 2.02 7.755L0 32l8.489-2.225A15.93 15.93 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.27 13.27 0 01-6.762-1.847l-.484-.287-5.037 1.321 1.344-4.905-.317-.503A13.267 13.267 0 012.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.26-9.906c-.397-.199-2.349-1.159-2.714-1.292-.364-.132-.63-.199-.895.199-.265.397-1.028 1.292-1.26 1.557-.232.265-.464.298-.861.1-.397-.199-1.674-.617-3.188-1.969-1.178-1.05-1.974-2.348-2.205-2.745-.232-.397-.025-.612.174-.809.178-.178.397-.464.596-.696.199-.232.265-.397.397-.662.132-.265.066-.497-.033-.696-.1-.199-.895-2.158-1.226-2.954-.323-.777-.65-.671-.895-.683l-.762-.013c-.265 0-.696.1-1.06.497-.364.397-1.39 1.359-1.39 3.313 0 1.955 1.424 3.843 1.623 4.108.199.265 2.803 4.278 6.791 5.996.95.41 1.69.654 2.268.838.952.303 1.819.26 2.504.158.763-.114 2.349-.96 2.68-1.887.332-.928.332-1.723.232-1.888-.099-.165-.364-.265-.762-.464z"/>
                </svg>
                <div>
                  <p className="font-semibold text-sm">Chat on WhatsApp</p>
                  <p className="text-xs opacity-90">+91 9882062560 — Quick reply during school hours</p>
                </div>
              </a>

              {/* Google Map */}
              <div className="rounded-2xl overflow-hidden shadow-card border border-border">
                <iframe
                  title="Priya Public School Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3421.8!2d77.018!3d31.048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sPanner%2C+Solan%2C+Himachal+Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="220"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="bg-card px-4 py-3">
                  <p className="text-sm text-muted-foreground">📍 Panner, Solan, Himachal Pradesh</p>
                </div>
              </div>

            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
