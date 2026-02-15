import React from "react";
import { ArrowRight, Sparkles, TrendingUp, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  totalPosts: number;
  onExplore: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ totalPosts, onExplore }) => {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950/50 to-slate-900" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-600/10 via-transparent to-transparent" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left side – Avatar & About Me */}
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-8">
              <div className="w-44 h-44 sm:w-52 sm:h-52 lg:w-56 lg:h-56 rounded-full overflow-hidden ring-4 ring-blue-500/30 shadow-2xl shadow-blue-600/20 bg-slate-800/80">
                <img
                  src="/Ismael-avatar.png"
                  alt="Ismael M. Tambuang"
                  className="w-full h-full object-contain object-bottom scale-110"
                />
              </div>
              {/* Decorative glow */}
              <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 blur-xl -z-10" />
            </div>

            <h2 className="text-2xl font-bold text-white mb-3">About Me</h2>
            <p className="text-base text-slate-300 leading-relaxed max-w-md mb-4">
              I am Ismael M. Tambuang, a third-year AB Political Science student
              at Ateneo de Davao University. I currently serve as the External
              Vice-President of SALAM: The Ateneo Muslim Society and as the
              Sectoral Representative of the Muslim Community in Ateneo.
            </p>
            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              For inquiries, collaborations, or concerns, you may reach me at{" "}
              <a
                href="mailto:imtambuang@addu.edu.ph"
                className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
              >
                imtambuang@addu.edu.ph
              </a>
            </p>
          </div>

          {/* Right side – Title, CTA, Stats */}
          <div className="text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8">
              <Sparkles className="h-4 w-4" />
              Your source for insights & breaking news
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              Introduction
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                To
              </span>{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-cyan-800 to-blue-700 bg-clip-text text-transparent">
                Law 1
              </span>
            </h1>

            <p className="text-lg text-white mb-8 max-w-lg leading-relaxed">
              This is the official blog site of Ismael Tambuang in compliance to
              the requirements of the Introduction to Law 1.{" "}
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Button
                onClick={onExplore}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 h-12 text-base font-semibold rounded-xl shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 transition-all"
              >
                Explore Posts
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                onClick={onExplore}
                className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white px-8 h-12 text-base rounded-xl"
              >
                Latest News
              </Button>
            </div>

            {/* Stats */}
            <div className="flex gap-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{totalPosts}+</p>
                  <p className="text-xs text-slate-500 uppercase tracking-wider">
                    Published
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">Daily</p>
                  <p className="text-xs text-slate-500 uppercase tracking-wider">
                    Updates
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
