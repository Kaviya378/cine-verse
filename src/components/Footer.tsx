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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,.10),transparent_45%),radial-gradient(circle_at_bottom_right,rgba(6,182,212,.06),transparent_40%)]" />

      <div className="relative container mx-auto max-w-5xl px-6 py-24">

        {/* Logo */}

        <div className="flex justify-center items-center gap-3">

          <Film
            size={34}
            className="text-brand-primary"
          />

          <h2 className="text-4xl font-black tracking-tight text-white">
            CINE
            <span className="text-brand-primary">
              VERSE
            </span>
          </h2>

        </div>

        {/* Description */}

        <div className="mt-8 text-center max-w-2xl mx-auto">

          <p className="text-lg text-white">
            Discover the best Tamil movies with AI-powered recommendations.
          </p>

          <p className="mt-2 text-brand-muted">
            Find classics, blockbusters, hidden gems, and timeless cinema.
          </p>

        </div>

        {/* CTA */}

        <div className="mt-16">

          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-lg p-10 text-center">

            <h3 className="text-3xl font-black text-white">
              🎬 Ready to Discover Your Next Favorite Movie?
            </h3>

            <button
              onClick={scrollToRecommendations}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-primary px-8 py-4 font-bold text-white transition duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(139,92,246,0.4)]"
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
            Discover timeless Tamil cinema through
            AI-powered recommendations,
            carefully curated collections,
            and unforgettable cinematic experiences.
          </p>

        </div>

        {/* Divider */}

        <div className="mt-20 h-px bg-gradient-to-r from-transparent via-brand-primary/40 to-transparent" />

        {/* Copyright */}

        <div className="mt-8 text-center">

          <p className="text-sm text-brand-muted">
            © {new Date().getFullYear()} <span className="text-white font-semibold">CineVerse</span>. Built with ❤️ for Tamil Cinema Lovers.
          </p>

        </div>

      </div>

    </footer>
  );
};

export default Footer;

// import React from 'react';
// import { Film } from 'lucide-react';

// const Footer: React.FC = () => {
//   const scrollToId = (id: string) => {
//     const el = document.getElementById(id);
//     if (el) {
//       el.scrollIntoView({ behavior: 'smooth' });
//     } else {
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     }
//   };

//   return (
//     <footer className="relative bg-brand-dark text-brand-muted py-20 mt-32 border-t border-white/5">
//       <div className="container mx-auto px-6">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 items-start">
//           {/* Logo & Brand Column */}
//           <div className="flex flex-col space-y-4">
//             <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
//               <Film size={28} className="text-brand-primary shadow-cinema group-hover:scale-105 transition-transform duration-300" />
//               <h2 className="text-2xl font-black font-heading text-white tracking-tighter uppercase">
//                 CINE<span className="text-brand-primary">TAMIL</span>
//               </h2>
//             </div>
//             <p className="text-[9px] uppercase font-bold tracking-widest text-brand-muted/40 mt-2">
//               Your gateway to discover Tamil cinema.
//             </p>
//           </div>

//           {/* Navigation Column */}
//           <div>
//             <h3 className="text-[10px] font-black text-white mb-6 uppercase tracking-[0.4em] border-l-2 border-brand-primary pl-3">
//               NAVIGATION
//             </h3>
//             <ul className="space-y-4 text-[10px] font-black uppercase tracking-[0.2em]">
//               {[
//                 { label: 'Home', target: 'root' },
//                 { label: '✨ Discover Movies', target: 'preferences' },
//                 { label: '🎬 Movie Vault', target: 'movie-vault' }
//               ].map(link => (
//                 <li key={link.label}>
//                   <button
//                     onClick={() => scrollToId(link.target)}
//                     className="hover:text-white text-brand-muted transition-colors duration-300 text-left"
//                   >
//                     {link.label}
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Categories Column */}
//           {/* <div>
//             <h3 className="text-[10px] font-black text-white mb-6 uppercase tracking-[0.4em] border-l-2 border-brand-primary pl-3">
//               CATEGORIES
//             </h3>
//             <ul className="space-y-4 text-[10px] font-black uppercase tracking-[0.2em]">
//               {['Action', 'Comedy', 'Drama', 'Thriller', 'Romance'].map(genre => (
//                 <li key={genre}>
//                   <button
//                     onClick={() => scrollToId('movie-vault')}
//                     className="hover:text-white text-brand-muted transition-colors duration-300 text-left"
//                   >
//                     {genre}
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </div> */}
//         </div>

//         {/* Copyright Footer */}
//         <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] text-brand-muted/40 font-black uppercase tracking-[0.5em]">
//           <p>&copy; {new Date().getFullYear()} CINETAMIL. ALL RIGHTS RESERVED.</p>
//           <p className="tracking-widest text-[8px]">Designed with excellence</p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;