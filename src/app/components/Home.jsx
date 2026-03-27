"use client";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import axios from "axios";

function Home({ email }) {

  // Navigation
  const navigate = useRouter();

  // Go to login Page
  const handleLogin = () => {
    window.location.href = "/api/auth/login";
  };

  // Logout Handle 
  const handleLogout = async () =>{
    try {
        const result = await axios.get("/api/auth/logout");
        window.location.href = "/";
    } catch (error) {
        console.log(error)
    }
  }


  const [open, setOpen] = useState(false);
  const popUpRef = useRef(null);
  useEffect(() => {
    const handler = (e) => {
      if (popUpRef.current && !popUpRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const firstLetter = email ? email[0].toUpperCase() : "";

  // Array for Features

  const features = [
    {
      title: "Plug & Play",
      description: "Add the chatbot to your site with a single script tag.",
    },
    {
      title: "Admin Controlled",
      description: "You control exactly what the AI knows and answers.",
    },
    {
      title: "Always Online",
      description: "Your customers get instant support 24/7",
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-white to-zinc-50 text-zinc-900 overflow-x-hidden">
        
        {/* Navbar */}
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
              <div
                ref={popUpRef}
                className="relative w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-semibold hover:scale-105 transition"
              >
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
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="absolute text-black right-0 top-13 w-44 bg-white rounded-xl shadow-xl border border-zinc-200 overflow-hidden"
                    >
                      <button
                        className="w-full text-left px-4 py-3 text-sm md:text-lg hover:bg-zinc-100"
                        onClick={()=>{ navigate.push("/dashboard") }}
                      >
                        Dashboard
                      </button>
                      <button
                        className="block px-4 py-3 text-sm md:text-lg text-red-600 hover:bg-zinc-100"
                        onClick={handleLogout}
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

        {/* Main */}

        <section className="pt-36 pb-28 px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            {/* Left Section */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className=""
            >
              <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
                AI Customer Support <br /> Build for Modern Websites{" "}
              </h1>
              <p className="mt-6 text-lg text-zinc-600 max-w-xl">
                Add a powerful AI chatbot to your website in minutes. Let your
                customers get instant answers using your own business knowledge.
              </p>

              <div className="flex mt-10 gap-4">
                {email ? (
                  <button className=" px-5 md:px-7 py-3 rounded-xl bg-black text-white font-medium hover:bg-zinc-800 transition disabled:opacity-60"
                  onClick={()=>{ navigate.push("/dashboard") }}
                  >
                    <span className="hidden md:block">Go to Dashboard</span>
                    <span className="md:hidden">Dashboard</span>
                  </button>
                ) : (
                  <button
                    className=" px-5 md:px-7 py-3 rounded-xl bg-black text-white font-medium hover:bg-zinc-800 transition disabled:opacity-60"
                    onClick={handleLogin}
                  >
                    Get Started
                  </button>
                )}
                <button
                  className="px-5 md:px-7 py-3 rounded-xl border border-zinc-300 text-zinc-700 hover:bg-zinc-100 transition"
                  onClick={() => {
                    window.location.href = "#features";
                  }}
                >
                  Learn More
                </button>
              </div>
            </motion.div>

            {/* Right Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <div className="rounded-2xl bg-white shadow-2xl border border-zinc-200 p-6">
                <div className="text-sm text-zinc-500 mb-3">
                  Live Chat Preview
                </div>

                {/* Chats user with AI */}
                <div className="space-y-3">
                  <div className="bg-black text-white rounded-lg px-4 py-2 text-sm ml-auto w-fit">
                    Do you offer cash on delivery?
                  </div>
                  <div className="bg-zinc-100 rounded-lg px-4 py-2 text-sm w-fit">
                    Yes, Cash On Delivery is available
                  </div>
                  <motion.div
                    animate={{ y: [0, -12, 0] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                    className="absolute -bottom-6 -right-4 md:-right-6  w-12 h-12 md:h-13 md:w-13 rounded-full bg-black text-white text-lg flex items-center justify-center shadow-xl"
                  >
                    🗨️
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section
          className="bg-zinc-50 py-28 px-6 border-t border-zinc-200"
          id="features"
        >
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5 }}
              className="text-2xl md:text-4xl font-semibold text-center"
            >
              Why Businesses Choose SupportAI
            </motion.h2>

            {/* Cards */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
              {features.map((feature, index) => {
                return (
                  <motion.div
                    className="bg-white rounded-2xl p-8 shadow-lg border border-zinc-200"
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.3 }}
                    viewport={{ once: false }}
                  >
                    <h1 className="text-lg font-medium ">{feature.title}</h1>
                    <p className="mt-3 text-zinc-600 text-sm ">
                      {feature.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;
