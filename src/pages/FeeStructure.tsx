import { useState } from "react";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  feeStructure,
  busTimings,
  busFees,
} from "@/data/schoolData";
import { motion } from "framer-motion";
import {
  GraduationCap,
  IndianRupee,
  Bus,
} from "lucide-react";

/* Color palette for fee cards */
const colors = [
  { bg: "bg-blue-100", text: "text-blue-600" },
  { bg: "bg-green-100", text: "text-green-600" },
  { bg: "bg-purple-100", text: "text-purple-600" },
  { bg: "bg-orange-100", text: "text-orange-600" },
  { bg: "bg-pink-100", text: "text-pink-600" },
  { bg: "bg-teal-100", text: "text-teal-600" },
];

const FeeStructure = () => {
  // Separate toggles
  const [feeView, setFeeView] = useState<"table" | "card">("table");
  const [busTimingView, setBusTimingView] =
    useState<"table" | "card">("table");
  const [busFeeView, setBusFeeView] =
    useState<"table" | "card">("table");

  return (
    <Layout>
      <section className="pt-24 pb-16 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">

          {/* ================= FEE STRUCTURE ================= */}
          <SectionHeading
            badge="Academics"
            title="Fee Structure"
            subtitle="Class-wise school fee details"
          />

          {/* Fee Toggle */}
          <div className="mt-8 flex justify-end gap-2">
            <button
              onClick={() => setFeeView("table")}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                feeView === "table"
                  ? "bg-primary text-primary-foreground"
                  : "border bg-muted"
              }`}
            >
              Table View
            </button>
            <button
              onClick={() => setFeeView("card")}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                feeView === "card"
                  ? "bg-primary text-primary-foreground"
                  : "border bg-muted"
              }`}
            >
              Card View
            </button>
          </div>

          {/* Fee Table */}
          {feeView === "table" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 overflow-x-auto rounded-2xl border bg-card shadow-card"
            >
              <table className="w-full text-sm">
                <thead className="bg-primary/90">
                  <tr>
                    <th className="px-6 py-4 text-left text-white font-semibold">
                      Class
                    </th>
                    <th className="px-6 py-4 text-left text-white font-semibold">
                      Admission Fee
                    </th>
                    <th className="px-6 py-4 text-left text-white font-semibold">
                      Tuition Fee (Monthly)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {feeStructure.map((fee, index) => (
                    <tr
                      key={index}
                      className="border-b last:border-none hover:bg-muted/40"
                    >
                      <td className="px-6 py-4 font-medium">
                        {fee.class}
                      </td>
                      <td className="px-6 py-4">
                        {fee.admission}
                      </td>
                      <td className="px-6 py-4 font-semibold text-primary">
                        {fee.tuition}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}

          {/* Fee Cards */}
          {feeView === "card" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {feeStructure.map((fee, index) => {
                const color = colors[index % colors.length];
                return (
                  <div
                    key={index}
                    className="rounded-2xl border bg-card p-6 shadow-card"
                  >
                    <div className="mb-4 flex items-center gap-3">
                      <div className={`rounded-xl p-2 ${color.bg}`}>
                        <GraduationCap
                          className={`h-5 w-5 ${color.text}`}
                        />
                      </div>
                      <h3
                        className={`text-lg font-semibold ${color.text}`}
                      >
                        {fee.class}
                      </h3>
                    </div>

                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="flex items-center gap-2 text-muted-foreground">
                          <IndianRupee className="h-4 w-4" />
                          Admission Fee
                        </span>
                        <span className="font-medium">
                          {fee.admission}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="flex items-center gap-2 text-muted-foreground">
                          <IndianRupee className="h-4 w-4" />
                          Tuition Fee
                        </span>
                        <span className="font-medium">
                          {fee.tuition}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          )}

          {/* ================= BUS TIMINGS ================= */}
          <div className="mt-20">
            <SectionHeading
              badge="Transport"
              title="School Bus Timings"
              subtitle="Pickup and drop timings"
            />

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setBusTimingView("table")}
                className={`rounded-lg px-4 py-2 text-sm font-medium ${
                  busTimingView === "table"
                    ? "bg-primary text-primary-foreground"
                    : "border bg-muted"
                }`}
              >
                Table View
              </button>
              <button
                onClick={() => setBusTimingView("card")}
                className={`rounded-lg px-4 py-2 text-sm font-medium ${
                  busTimingView === "card"
                    ? "bg-primary text-primary-foreground"
                    : "border bg-muted"
                }`}
              >
                Card View
              </button>
            </div>

            {busTimingView === "table" && (
              <div className="mt-8 overflow-x-auto rounded-2xl border bg-card shadow-card">
                <table className="w-full text-sm">
                  <thead className="bg-primary/90">
                    <tr>
                      <th className="px-6 py-4 text-white text-left">
                        Pickup Point
                      </th>
                      <th className="px-6 py-4 text-white text-left">
                        Morning
                      </th>
                      <th className="px-6 py-4 text-white text-left">
                        Afternoon
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {busTimings.map((bus, index) => (
                      <tr key={index} className="border-b">
                        <td className="px-6 py-4 font-medium">
                          {bus.place}
                        </td>
                        <td className="px-6 py-4">
                          {bus.morning}
                        </td>
                        <td className="px-6 py-4">
                          {bus.afternoon}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {busTimingView === "card" && (
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {busTimings.map((bus, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border bg-card p-6 shadow-card"
                  >
                    <h4 className="flex items-center gap-2 text-lg font-semibold text-primary mb-4">
                      <Bus className="h-5 w-5" />
                      {bus.place}
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Morning
                        </span>
                        <span>{bus.morning}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Afternoon
                        </span>
                        <span>{bus.afternoon}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ================= BUS FEES ================= */}
          <div className="mt-20">
            <SectionHeading
              badge="Transport"
              title="Bus Fee Structure"
              subtitle="Monthly and yearly transport charges"
            />

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setBusFeeView("table")}
                className={`rounded-lg px-4 py-2 text-sm font-medium ${
                  busFeeView === "table"
                    ? "bg-primary text-primary-foreground"
                    : "border bg-muted"
                }`}
              >
                Table View
              </button>
              <button
                onClick={() => setBusFeeView("card")}
                className={`rounded-lg px-4 py-2 text-sm font-medium ${
                  busFeeView === "card"
                    ? "bg-primary text-primary-foreground"
                    : "border bg-muted"
                }`}
              >
                Card View
              </button>
            </div>

            {busFeeView === "table" && (
              <div className="mt-8 overflow-x-auto rounded-2xl border bg-card shadow-card">
                <table className="w-full text-sm">
                  <thead className="bg-primary/90">
                    <tr>
                      <th className="px-6 py-4 text-white text-left">
                        Pickup Point
                      </th>
                      <th className="px-6 py-4 text-white text-left">
                        Monthly Fee
                      </th>
                      <th className="px-6 py-4 text-white text-left">
                        Yearly Fee
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {busFees.map((fee, index) => (
                      <tr key={index} className="border-b">
                        <td className="px-6 py-4 font-medium">
                          {fee.place}
                        </td>
                        <td className="px-6 py-4">
                          {fee.monthly}
                        </td>
                        <td className="px-6 py-4 font-semibold text-primary">
                          {fee.yearly}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {busFeeView === "card" && (
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {busFees.map((fee, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border bg-card p-6 shadow-card"
                  >
                    <h4 className="text-lg font-semibold text-primary mb-4">
                      {fee.place}
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Monthly Fee
                        </span>
                        <span>{fee.monthly}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Yearly Fee
                        </span>
                        <span className="font-semibold text-primary">
                          {fee.yearly}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </section>
    </Layout>
  );
};

export default FeeStructure;
