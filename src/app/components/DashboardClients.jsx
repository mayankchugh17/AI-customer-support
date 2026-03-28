"use client";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import DoneIcon from "@mui/icons-material/Done";

export default function DashboardClient({ ownerId }) {
  const navigate = useRouter();

  const [businessName, setBusinessName] = useState("");
  const [supportEmail, setSupportEmail] = useState("");
  const [knowledge, setKnowledge] = useState("");
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  // POST API
  const handleSettings = async () => {
    // Set Loader
    setLoading(true);
    try {
      const result = await axios.post("/api/settings", {
        ownerId,
        businessName,
        supportEmail,
        knowledge,
      });

      console.log(result.data);
      setSaved(true);
      setLoading(false);
      setTimeout(() => setSaved(false), 3000);

    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Calling Get Api
  useEffect(()=>{
    const handleGetDetails = async (params) => {
    try {
      const result = await axios.get("/api/settings", { params: { ownerId } });
      console.log("Result is ",result.data);
      
      setBusinessName(result.data.businessName);
      setKnowledge(result.data.knowledge);
      setSupportEmail(result.data.supportEmail);

    } catch (error) {
      console.log(error);
      // setLoading(false);
    }
    }

    // Calling function
    handleGetDetails();
  },[ownerId]);

  return (
    <>
      <div className="min-h-screen bg-zinc-50 text-zinc-900">
        {/* Navbar */}
        <motion.div
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ duration: 1 }}
          className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-zinc-200 "
        >
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <div
              className="font-semibold text-lg md:text-2xl tracking-tight cursor-pointer"
              onClick={() => {
                navigate.push("/");
              }}
            >
              Support <span className="text-zinc-400">AI</span>
            </div>
            <button className="px-4 py-2  rounded-lg border border-zinc-300 text-sm md:text-[18px] hover:bg-zinc-100 transition">
              Embed ChatBot
            </button>
          </div>
        </motion.div>

        {/* Main Section */}
        <div className="flex justify-center px-3 sm:px-6 py-10 sm:py-14 mt-[60px]">
          <motion.div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-5 sm:p-8 md:p-10">
            {/* Header */}
            <div className="mb-8 sm:mb-10">
              <h1 className="text-lg sm:text-xl md:text-2xl font-semibold">
                Chatbot Settings
              </h1>
              <p className="text-xs sm:text-sm md:text-base text-zinc-500 mt-1">
                Manage your AI chatbot knowledge and business details
              </p>
            </div>

            {/* Business Details */}
            <div className="mb-8 sm:mb-10">
              <h2 className="text-sm sm:text-base font-medium mb-4">
                Business Details
              </h2>

              <div className="space-y-3 sm:space-y-4">
                <input
                  type="text"
                  className="w-full rounded-xl border border-zinc-300 px-3 py-2 sm:px-4 sm:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/80"
                  placeholder="Business Name"
                  onChange={(e) => setBusinessName(e.target.value)}
                  value={businessName}
                />

                <input
                  type="text"
                  className="w-full rounded-xl border border-zinc-300 px-3 py-2 sm:px-4 sm:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/80"
                  placeholder="Support Email"
                  onChange={(e) => setSupportEmail(e.target.value)}
                  value={supportEmail}
                />
              </div>
            </div>

            {/* Knowledge Base */}
            <div className="mb-8 sm:mb-10">
              <h2 className="text-sm sm:text-base font-medium mb-3">
                Knowledge Base
              </h2>

              <p className="text-xs sm:text-sm text-zinc-500 mb-4">
                Add FAQs, policies, delivery info, refunds, etc.
              </p>

              <textarea
                className="w-full min-h-[140px] sm:min-h-[180px] md:min-h-[220px] rounded-xl border border-zinc-300 px-3 sm:px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-black/80"
                placeholder={`Example:
• Refund policy: 7 days return available
• Delivery time: 3-5 working days
• Cash on Delivery available
• Support hours`}
                onChange={(e) => setKnowledge(e.target.value)}
                value={knowledge}
              />

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 mt-4">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  disabled={loading}
                  onClick={handleSettings}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-black text-white text-sm font-medium hover:bg-zinc-700 transition disabled:opacity-60"
                >
                  {loading ? "Saving..." : "Save"}
                </motion.button>

                {saved && (
                  <motion.span
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm font-medium text-emerald-600 flex items-center gap-2"
                  >
                    <DoneIcon /> Settings saved
                  </motion.span>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
