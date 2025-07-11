"use client";
import Image from "next/image";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import IntroText from "@/app/src/components/intro-text";

export default function Home() {
  return (
    <div className="font-poppins w-full min-h-screen">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4">
        <div className="px-10">
          <a href="" className="text-3xl font-bold font-poppins text-lofi-purple hover:scale-605 transition-all duration-800">Tina</a>
        </div>
        <div className="flex gap-4 space-x-8 font-bold text-md px-10">
          <a href="" className="text-lofi-purple transition-colors border-b-2 border-lofi-purple" >Home</a>
          <a href="" className="text-white hover:text-lofi-purple transition-colors" >Me</a>
          <a href="" className="text-white hover:text-lofi-purple transition-colors" >Coding</a>
          <a href="" className="text-white hover:text-lofi-purple transition-colors" >Learning</a>
        </div>
      </nav>
      {/* Hero Section */}
      <section className="flex items-center justify-center text-white px-10 py-10">
        <div className="w-1/2 flex justify-center">
          <Image
            className="hover:scale-105 transition-all duration-300 hover:rotate-12 hover:invert rounded-[20px]"
            src="/logo.gif"
            alt="Next.js logo"
            width={400}
            height={400}
            priority
          />
        </div>
        <div className="w-1/2 space-y-4">
          {/* Name and Description */}
          <h1 className="text-7xl font-bold">Hi, I'm <span className="text-lofi-purple">Tina</span></h1>
          <p className="text-3xl py-4">I'm <span className="text-lofi-purple inline-block"><IntroText /></span></p>

          {/* Socials Links */}
          <div className="flex gap-4 text-2xl">
            <a href="https://github.com/tina94happy" className="text-lg flex items-center gap-2 hover:text-blue-600 transition-colors">
              <FaGithub size={20} />
              Github
            </a>
            <a href="https://www.linkedin.com/in/tina-su-01b139210/" className="text-lg flex items-center gap-2 hover:text-blue-600 transition-colors">
              <FaLinkedin size={20} />
              LinkedIn
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
