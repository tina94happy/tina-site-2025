"use client";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import IntroText from "@/components/ui/intro-text";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { useTranslation } from "@/hooks/use-translation";

export default function EnglishHome() {
  const { t } = useTranslation();
  
  return (
    <div className="font-poppins w-full min-h-screen bg-black">
      {/* Navbar */}
      <nav className="flex flex-col sm:flex-row justify-between items-center px-4 sm:px-6 py-4 pt-8 sm:pt-4">
        <div className="hidden sm:block px-4 sm:px-10 mb-4 sm:mb-0">
          <Link href="/en" className="text-2xl sm:text-3xl font-bold font-poppins text-lofi-purple hover:scale-105 transition-all duration-300">TINA</Link>
        </div>
        <div className="flex gap-2 sm:gap-4 space-x-4 sm:space-x-8 font-bold text-sm sm:text-md px-4 sm:px-10 items-center">
          <Link href="/en" className="text-lofi-purple transition-colors border-b-2 border-lofi-purple" >{t('home')}</Link>
          <Link href="/en/me" className="text-white hover:text-lofi-purple transition-colors" >{t('me')}</Link>
          <Link href="/en/coding" className="text-white hover:text-lofi-purple transition-colors" >{t('coding')}</Link>
          <Link href="/en/learning" className="text-white hover:text-lofi-purple transition-colors" >{t('learning')}</Link>
          <LanguageSwitcher />
        </div>
      </nav>
      
      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row items-center justify-center text-white px-4 sm:px-10 py-10 pt-18 sm:py-10 pr-6 sm:pr-12 lg:pr-16">
        <div className="w-full lg:w-1/2 flex justify-center mb-8 lg:mb-0">
          <Image
            className="hover:scale-105 transition-all duration-300 hover:rotate-12 hover:invert rounded-[20px] w-[200px] h-80 sm:w-80 sm:h-96 lg:w-96 lg:h-[600px] lg:mt-4"
            src="/logo.gif"
            alt="Tina's logo"
            width={100}
            height={800}
            priority
          />
        </div>
        <div className="w-full lg:w-1/2 space-y-4 text-center lg:text-left">
          {/* Name and Description */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold">
            {t('greeting')} <span className="text-lofi-purple">Tina</span>
          </h1>
          <p className="text-xl sm:text-2xl lg:text-3xl py-4">
            {t('introText')}
          </p>

          {/* Socials Links */}
          <div className="flex gap-4 text-lg sm:text-xl lg:text-2xl justify-center lg:justify-start">
            <a href="https://github.com/tina94happy" className="text-base sm:text-lg flex items-center gap-2 hover:text-blue-600 transition-colors">
              <FaGithub size={18} className="sm:w-5 sm:h-5" />
              {t('github')}
            </a>
            <a href="https://www.linkedin.com/in/tina-su-01b139210/" className="text-base sm:text-lg flex items-center gap-2 hover:text-blue-600 transition-colors">
              <FaLinkedin size={18} className="sm:w-5 sm:h-5" />
              {t('linkedin')}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
