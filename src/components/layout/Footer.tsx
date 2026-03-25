

import { Link } from "react-router-dom";
import {
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import { schoolInfo } from "@/data/schoolData";

const Footer = () => {
  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Academics", href: "/academics" },
    { name: "Admissions", href: "/admissions" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
  ];

  const importantLinks = [
    { name: "Fee Structure", href: "/fee-structure" },
    { name: "Online Application", href: "/apply-online" },
    { name: "Rules & Regulations", href: "/rules-and-regulations" },
    { name: "Academic Calendar", href: "/calendar" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/", label: "Facebook" },
    { icon: Twitter, href: "https://twitter.com/", label: "Twitter" },
    { icon: Instagram, href: "https://www.instagram.com/", label: "Instagram" },
    { icon: Linkedin, href: "https://www.linkedin.com/", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* School Info */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                <GraduationCap className="w-7 h-7 text-secondary-foreground" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold">
                  {schoolInfo.name}
                </h3>
                <p className="text-sm opacity-80">Himachal Pradesh</p>
              </div>
            </Link>

            <p className="text-sm opacity-80 leading-relaxed mb-6">
              {schoolInfo.tagline}. Providing quality education since{" "}
              {schoolInfo.founded}.
            </p>

            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  target="_blank"
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm opacity-80 hover:opacity-100 transition"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Important Links (NEW) */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">
              Important Links
            </h4>
            <ul className="space-y-3">
              {importantLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm opacity-80 hover:opacity-100 transition"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 opacity-80" />
                <span className="text-sm opacity-80">
                  {schoolInfo.address}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 opacity-80" />
                <span className="text-sm opacity-80">
                  {schoolInfo.phone}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 opacity-80" />
                <span className="text-sm opacity-80">
                  {schoolInfo.email}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm opacity-70">
              © {new Date().getFullYear()} {schoolInfo.name}. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                to="/privacy-policy"
                className="text-sm opacity-70 hover:opacity-100 transition"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-sm opacity-70 hover:opacity-100 transition"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
