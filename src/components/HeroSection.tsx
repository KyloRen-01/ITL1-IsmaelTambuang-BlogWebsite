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
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
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

          {/* Hero visual */}
          <div className="hidden lg:block relative">
            <div className="relative">
              {/* Floating cards */}
              <div className="absolute -top-4 -left-4 w-72 bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-xl p-5 shadow-2xl transform rotate-[-3deg] hover:rotate-0 transition-transform duration-500">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <BookOpen className="h-4 w-4 text-blue-400" />
                  </div>
                  <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                    Article
                  </span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full w-full mb-2" />
                <div className="h-2 bg-slate-700 rounded-full w-3/4 mb-2" />
                <div className="h-2 bg-slate-700 rounded-full w-1/2" />
              </div>

              <div className="ml-20 mt-20 w-80 bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-xl overflow-hidden shadow-2xl transform rotate-[2deg] hover:rotate-0 transition-transform duration-500">
                <img
                  src="https://images.unsplash.com/photo-1504711434969-e33886168d5c?w=600&h=300&fit=crop"
                  alt="Featured"
                  className="w-full h-40 object-cover"
                />
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 bg-amber-500/10 text-amber-400 text-xs font-semibold rounded-full">
                      News
                    </span>
                    <span className="text-slate-500 text-xs">2 min read</span>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full w-full mb-2" />
                  <div className="h-2 bg-slate-700 rounded-full w-2/3" />
                </div>
              </div>

              <div className="absolute bottom-0 -right-4 w-64 bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-xl p-5 shadow-2xl transform rotate-[4deg] hover:rotate-0 transition-transform duration-500">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <TrendingUp className="h-3 w-3 text-emerald-400" />
                  </div>
                  <span className="text-xs text-emerald-400 font-medium">
                    Trending
                  </span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full w-full mb-2" />
                <div className="h-2 bg-slate-700 rounded-full w-4/5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
