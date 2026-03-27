"use client";
import { motion } from "motion/react";
export default function DashboardClient({ownerId})
{
    return(
        <>
            <div className="min-h-screen bg-zinc-50 text-zinc-900">
                <motion.div
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ duration: 1 }}
          className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-zinc-200 "
        >
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="font-semibold text-lg md:text-2xl tracking-tight">
              Support <span className="text-zinc-400">AI</span>
            </div>
          </div>
        </motion.div>
            </div>
        </>
    )
}