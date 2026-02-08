import React from "react";
import {
  Newspaper,
  Facebook,
  Instagram,
  Mail,
  Heart,
  ArrowUpRight,
} from "lucide-react";

interface FooterProps {
  onNavigate: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 border-t border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <Newspaper className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                ITL<span className="text-blue-400">1</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Ismael Tambuang's personal blog platform, sharing insights,
              stories, and updates on politics and life.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Navigation
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Home", page: "home" },
                { label: "Articles", page: "home" },
                { label: "News", page: "home" },
                { label: "Dashboard", page: "dashboard" },
              ].map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => onNavigate(item.page)}
                    className="text-slate-400 hover:text-blue-400 text-sm transition-colors flex items-center gap-1 group"
                  >
                    {item.label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              {["Documentation", "API Reference", "Changelog", "Support"].map(
                (item) => (
                  <li key={item}>
                    <button
                      onClick={() => {}}
                      className="text-slate-400 hover:text-blue-400 text-sm transition-colors flex items-center gap-1 group"
                    >
                      {item}
                      <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Stay Updated
            </h3>
            <p className="text-slate-400 text-sm mb-4">
              Subscribe to our newsletter for the latest updates.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const input = e.currentTarget.querySelector("input");
                if (input) {
                  alert("Thanks for subscribing!");
                  input.value = "";
                }
              }}
              className="flex gap-2"
            >
              <input
                type="email"
                placeholder="your@email.com"
                required
                className="flex-1 h-10 px-3 rounded-lg bg-slate-800 border border-slate-700 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="h-10 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-slate-800/50 flex flex-col sm:flex-row items-center justify-center gap-4">
          <p className="text-slate-500 text-sm">
            {currentYear} ITL1. All rights reserved to Ismael Tambuang.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
