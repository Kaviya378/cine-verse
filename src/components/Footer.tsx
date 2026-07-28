import React from "react";
import { Film, ArrowRight } from "lucide-react";

const Footer: React.FC = () => {
  const scrollToRecommendations = () => {
    const section = document.getElementById("preferences");

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <footer className="relative mt-32 border-t border-white/5 bg-brand-dark overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(229,9,20,0.06),transparent_45%),radial-gradient(circle_at_bottom_right,rgba(178,7,16,0.06),transparent_45%)] pointer-events-none" />

      <div className="relative container mx-auto max-w-5xl px-6 py-24 z-10">
        {/* Logo */}
        <div className="flex justify-center items-center gap-3">
          <Film
            size={34}
            className="text-brand-primary shadow-cinema"
          />
          <h2 className="text-4xl font-black tracking-tight text-white uppercase font-heading">
            CINE<span className="text-brand-primary">VERSE</span>
          </h2>
        </div>

        {/* Description */}
        <div className="mt-8 text-center max-w-2xl mx-auto">
          <p className="text-lg text-white">
            Discover the best movies with AI-powered recommendations.
          </p>
          <p className="mt-2 text-brand-muted">
            Find classics, blockbusters, hidden gems, and timeless cinema.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-16">
          <div className="rounded-[2rem] border border-white/[0.05] bg-white/[0.02] backdrop-blur-xl p-10 text-center shadow-[0_20px_50px_rgba(229,9,20,0.05)]">
            <h3 className="text-3xl font-black text-white">
              🎬 Ready to Discover Your Next Favorite Movie?
            </h3>
            <button
              onClick={scrollToRecommendations}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-ai-gradient px-8 py-4 font-black uppercase tracking-wider text-white transition duration-300 hover:scale-105 hover:shadow-[0_0_35px_rgba(229,9,20,0.55)] shadow-cinema"
            >
              Discover Movies
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Quote */}
        <div className="mt-20 text-center max-w-2xl mx-auto">
          <div className="text-5xl mb-5">
            🎥
          </div>
          <blockquote className="text-2xl italic font-medium text-white">
            "Cinema is the mirror of our society."
          </blockquote>
          <p className="mt-6 text-brand-muted leading-8">
            Discover timeless cinema through
            AI-powered recommendations,
            carefully curated collections,
            and unforgettable cinematic experiences.
          </p>
        </div>

        {/* Divider */}
        <div className="mt-20 h-px bg-gradient-to-r from-transparent via-brand-secondary/40 to-transparent" />

        {/* Copyright */}
        <div className="mt-8 text-center">
          <p className="text-sm text-brand-muted">
            &copy; {new Date().getFullYear()} <span className="text-white font-semibold">CineVerse</span>. Built with ❤️ for Cinema Lovers.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;