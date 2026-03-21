"use client";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

function Home({ email }) {
  const handleLogin = () => {
    window.location.href = "/api/auth/login";
  };

  const [open, setOpen] = useState(false);
  const popUpRef = useRef(null);
  useEffect(()=>{
    const handler = (e) =>{
      if(popUpRef.current && !popUpRef.current.contains(e.target))
      {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
    
  }, [])

  const firstLetter = email ? email[0].toUpperCase() : "";

  useEffect(()=>{
    const handler = (e) => {
      if (popUpRef.current && !popUpRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-white to-zinc-50 text-zinc-900 overflow-x-hidden">
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

            {email ? (
              <div ref={popUpRef} className="relative w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-semibold hover:scale-105 transition">
                
                <button
                  onClick={() => {
                    setOpen(!open);
                  }}
                >
                  {firstLetter}
                </button>
                <AnimatePresence>
                  {open && (
                    <motion.div
                      initial={{opacity:0, y:-6}}
                      animate={{opacity:1, y:0}}
                      exit={{opacity:0, y:-6}}
                      className="absolute text-black right-0 top-13 w-44 bg-white rounded-xl shadow-xl border border-zinc-200 overflow-hidden"
                    >
                      <button
                        onClick={() => setOpen(false)}
                        className="w-full text-left px-4 py-3 text-sm md:text-lg hover:bg-zinc-100"
                      >
                        Dashboard
                      </button>
                      <button
                        onClick={() => setOpen(false)}
                        className="block px-4 py-3 text-sm md:text-lg text-red-600 hover:bg-zinc-100"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button
                onClick={handleLogin}
                className="btn text-lg md:text-xl px-5 py-2 rounded-full bg-black text-white text-sm font-medium hover:bg-zinc-800 transition disabled:opacity-60 flex items-center gap-2 "
              >
                Login
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default Home;
