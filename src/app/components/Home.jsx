"use client";
import React from "react";
import { motion } from "motion/react";


function Home() {
  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-white to-zinc-50 text-zinc-900 overflow-x-hidden">
        <motion.div initial={{y:-50}} animate={{y:0}} transition={{duration:1}} className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-zinc-200 ">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="font-semibold text-lg md:text-2xl tracking-tight">
              Support <span className="text-zinc-400">AI</span>
            </div>
            <button onClick={()=> (window.location.href = "/api/auth/login")} className="btn text-lg md:text-2xl px-5 py-2 rounded-full bg-black text-white text-sm font-medium hover:bg-zinc-800 transition disabled:opacity-60 flex items-center gap-2 ">
              Login
            </button>
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default Home;
