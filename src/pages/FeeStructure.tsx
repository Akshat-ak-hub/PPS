import { useState } from "react";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/SectionHeading";
import { feeStructure, busTimings, busFees } from "@/data/schoolData";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, IndianRupee, Bus } from "lucide-react";

type ViewMode = "table" | "card";

const colors = [
  { bg: "bg-primary/10", text: "text-primary" },
  { bg: "bg-secondary/10", text: "text-secondary-foreground" },
  { bg: "bg-accent/10", text: "text-accent" },
  { bg: "bg-primary/20", text: "text-primary" },
  { bg: "bg-secondary/20", text: "text-secondary-foreground" },
  { bg: "bg-accent/20", text: "text-accent" },
];

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -18 },
  transition: { duration: 0.3 },
};

type ViewToggleProps = {
  value: ViewMode;
  onChange: (view: ViewMode) => void;
};

const ViewToggle = ({ value, onChange }: ViewToggleProps) => {
  return (
    <div className="mt-6 flex justify-end gap-2">
      <button
        onClick={() => onChange("table")}
        aria-pressed={value === "table"}
        className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
          value === "table"
            ? "bg-primary text-primary-foreground shadow-sm"
            : "border border-border bg-background text-muted-foreground hover:bg-accent hover:text-foreground"
        }`}
      >
        Table View
      </button>
      <button
        onClick={() => onChange("card")}
        aria-pressed={value === "card"}
        className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
          value === "card"
            ? "bg-primary text-primary-foreground shadow-sm"
            : "border border-border bg-background text-muted-foreground hover:bg-accent hover:text-foreground"
        }`}
      >
        Card View
      </button>
    </div>
  );
};

const FeeStructure = () => {
  const [feeView, setFeeView] = useState<ViewMode>("table");
  const [busTimingView, setBusTimingView] = useState<ViewMode>("table");
  const [busFeeView, setBusFeeView] = useState<ViewMode>("table");

  return (
    <Layout>
      {/* Fee Structure */}
      <section className="pt-24 pb-16 lg:pb-24 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            badge="Academics"
            title="Fee Structure"
            subtitle="View class-wise admission and monthly tuition fee details."
          />

          <ViewToggle value={feeView} onChange={setFeeView} />

          <AnimatePresence mode="wait">
            {feeView === "table" ? (
              <motion.div
                key="fee-table"
                {...fadeUp}
                className="mt-8 overflow-x-auto rounded-2xl border border-border bg-card shadow-card"
              >
                <table className="w-full text-sm">
                  <thead className="bg-primary/90">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold text-white">
                        Class
                      </th>
                      <th className="px-6 py-4 text-left font-semibold text-white">
                        Admission Fee
                      </th>
                      <th className="px-6 py-4 text-left font-semibold text-white">
                        Tuition Fee (Monthly)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {feeStructure.map((fee, index) => (
                      <tr
                        key={index}
                        className="border-b border-border last:border-none hover:bg-muted/40 transition-colors"
                      >
                        <td className="px-6 py-4 font-medium">{fee.class}</td>
                        <td className="px-6 py-4">{fee.admission}</td>
                        <td className="px-6 py-4 font-semibold text-primary">
                          {fee.tuition}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            ) : (
              <motion.div
                key="fee-card"
                {...fadeUp}
                className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {feeStructure.map((fee, index) => {
                  const color = colors[index % colors.length];
                  return (
                    <div
                      key={index}
                      className="rounded-2xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    >
                      <div className="mb-4 flex items-center gap-3">
                        <div className={`rounded-xl p-2 ${color.bg}`}>
                          <GraduationCap className={`h-5 w-5 ${color.text}`} />
                        </div>
                        <h3 className={`text-lg font-semibold ${color.text}`}>
                          {fee.class}
                        </h3>
                      </div>

                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between gap-4">
                          <span className="flex items-center gap-2 text-muted-foreground">
                            <IndianRupee className="h-4 w-4" />
                            Admission Fee
                          </span>
                          <span className="font-medium">{fee.admission}</span>
                        </div>

                        <div className="flex justify-between gap-4">
                          <span className="flex items-center gap-2 text-muted-foreground">
                            <IndianRupee className="h-4 w-4" />
                            Tuition Fee
                          </span>
                          <span className="font-medium">{fee.tuition}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Bus Timings */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            badge="Transport"
            title="School Bus Timings"
            subtitle="Check school bus pickup and drop timings."
          />

          <ViewToggle value={busTimingView} onChange={setBusTimingView} />

          <AnimatePresence mode="wait">
            {busTimingView === "table" ? (
              <motion.div
                key="bus-timing-table"
                {...fadeUp}
                className="mt-8 overflow-x-auto rounded-2xl border border-border bg-card shadow-card"
              >
                <table className="w-full text-sm">
                  <thead className="bg-primary/90">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold text-white">
                        Pickup Point
                      </th>
                      <th className="px-6 py-4 text-left font-semibold text-white">
                        Morning
                      </th>
                      <th className="px-6 py-4 text-left font-semibold text-white">
                        Afternoon
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {busTimings.map((bus, index) => (
                      <tr
                        key={index}
                        className="border-b border-border last:border-none hover:bg-muted/40 transition-colors"
                      >
                        <td className="px-6 py-4 font-medium">{bus.place}</td>
                        <td className="px-6 py-4">{bus.morning}</td>
                        <td className="px-6 py-4">{bus.afternoon}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            ) : (
              <motion.div
                key="bus-timing-card"
                {...fadeUp}
                className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {busTimings.map((bus, index) => {
                  const color = colors[index % colors.length];
                  return (
                    <div
                      key={index}
                      className="rounded-2xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    >
                      <h4 className="mb-4 flex items-center gap-2 text-lg font-semibold text-primary">
                        <div className={`rounded-xl p-2 ${color.bg}`}>
                          <Bus className={`h-5 w-5 ${color.text}`} />
                        </div>
                        {bus.place}
                      </h4>

                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between gap-4">
                          <span className="text-muted-foreground">Morning</span>
                          <span className="font-medium">{bus.morning}</span>
                        </div>
                        <div className="flex justify-between gap-4">
                          <span className="text-muted-foreground">Afternoon</span>
                          <span className="font-medium">{bus.afternoon}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Bus Fees */}
      <section className="py-16 lg:py-24 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            badge="Transport"
            title="Bus Fee Structure"
            subtitle="See monthly and yearly transport fee details."
          />

          <ViewToggle value={busFeeView} onChange={setBusFeeView} />

          <AnimatePresence mode="wait">
            {busFeeView === "table" ? (
              <motion.div
                key="bus-fee-table"
                {...fadeUp}
                className="mt-8 overflow-x-auto rounded-2xl border border-border bg-card shadow-card"
              >
                <table className="w-full text-sm">
                  <thead className="bg-primary/90">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold text-white">
                        Pickup Point
                      </th>
                      <th className="px-6 py-4 text-left font-semibold text-white">
                        Monthly Fee
                      </th>
                      <th className="px-6 py-4 text-left font-semibold text-white">
                        Yearly Fee
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {busFees.map((fee, index) => (
                      <tr
                        key={index}
                        className="border-b border-border last:border-none hover:bg-muted/40 transition-colors"
                      >
                        <td className="px-6 py-4 font-medium">{fee.place}</td>
                        <td className="px-6 py-4">{fee.monthly}</td>
                        <td className="px-6 py-4 font-semibold text-primary">
                          {fee.yearly}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            ) : (
              <motion.div
                key="bus-fee-card"
                {...fadeUp}
                className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {busFees.map((fee, index) => {
                  const color = colors[index % colors.length];
                  return (
                    <div
                      key={index}
                      className="rounded-2xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    >
                      <div className="mb-4 flex items-center gap-3">
                        <div className={`rounded-xl p-2 ${color.bg}`}>
                          <IndianRupee className={`h-5 w-5 ${color.text}`} />
                        </div>
                        <h4 className="text-lg font-semibold text-primary">
                          {fee.place}
                        </h4>
                      </div>

                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between gap-4">
                          <span className="flex items-center gap-2 text-muted-foreground">
                            <IndianRupee className="h-4 w-4" />
                            Monthly Fee
                          </span>
                          <span className="font-medium">{fee.monthly}</span>
                        </div>

                        <div className="flex justify-between gap-4">
                          <span className="flex items-center gap-2 text-muted-foreground">
                            <IndianRupee className="h-4 w-4" />
                            Yearly Fee
                          </span>
                          <span className="font-semibold text-primary">
                            {fee.yearly}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </Layout>
  );
};

export default FeeStructure;