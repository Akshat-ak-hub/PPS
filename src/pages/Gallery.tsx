import { useState } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/SectionHeading";
import GalleryGrid from "@/components/ui/GalleryGrid";

// Import gallery images
import scienceLab from "@/assets/gallery/science-lab.jpg";
import library from "@/assets/gallery/library.jpg";
import sportsDay from "@/assets/gallery/sports-day.jpg";
import graduation from "@/assets/gallery/graduation.jpg";
import artExhibition from "@/assets/gallery/art-exhibition.jpg";
import musicPerformance from "@/assets/gallery/music-performance.jpg";
import classroom from "@/assets/gallery/classroom.jpg";
import outdoorActivities from "@/assets/gallery/outdoor-activities.jpg";

const galleryImages = [
  { id: 1, title: "Science Lab", category: "Facilities", src: scienceLab },
  { id: 2, title: "Library", category: "Facilities", src: library },
  { id: 3, title: "Sports Day", category: "Events", src: sportsDay },
  { id: 4, title: "Graduation Ceremony", category: "Events", src: graduation },
  { id: 5, title: "Art Exhibition", category: "Activities", src: artExhibition },
  { id: 6, title: "Music Performance", category: "Activities", src: musicPerformance },
  { id: 7, title: "Classroom Learning", category: "Academics", src: classroom },
  { id: 8, title: "Outdoor Activities", category: "Campus Life", src: outdoorActivities },
];

const categories = ["All", "Facilities", "Events", "Activities", "Academics", "Campus Life"];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredImages =
    activeCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-24 lg:pt-32 pb-16 lg:pb-24 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            badge="Photo Gallery"
            title="Life at Priya Public School"
            subtitle="Explore our vibrant campus, exciting events, and the moments that make our school special."
          />

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-5 py-2.5 rounded-full font-medium text-sm transition-colors ${
                  activeCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-foreground border border-border hover:bg-muted"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <GalleryGrid images={filteredImages} />
        </div>
      </section>
    </Layout>
  );
};

export default Gallery;
