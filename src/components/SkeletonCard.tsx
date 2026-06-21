import React from 'react';

const SkeletonCard: React.FC = () => {
  return (
    <div className="relative bg-brand-surface border border-white/5 rounded-[1.5rem] overflow-hidden h-full flex flex-col min-h-[450px] animate-pulse">
      {/* Thumbnail Aspect Ratio Area */}
      <div className="relative aspect-[2/3] w-full bg-white/5 animate-shimmer overflow-hidden">
        {/* Glow Bottom Indicator */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-brand-surface to-transparent"></div>
      </div>

      {/* Details Box */}
      <div className="p-6 flex flex-col flex-grow space-y-6">
        {/* Title and Rating Line */}
        <div className="flex justify-between items-center gap-4">
          <div className="h-6 w-2/3 bg-white/10 rounded-lg animate-shimmer"></div>
          <div className="h-6 w-12 bg-white/10 rounded-full animate-shimmer"></div>
        </div>

        {/* Director Line */}
        <div className="h-4 w-1/2 bg-white/5 rounded-md animate-shimmer"></div>

        {/* Description Lines */}
        <div className="space-y-2">
          <div className="h-3 w-full bg-white/5 rounded-sm animate-shimmer"></div>
          <div className="h-3 w-4/5 bg-white/5 rounded-sm animate-shimmer"></div>
        </div>

        {/* Tags Block */}
        <div className="flex gap-2 pt-2">
          <div className="h-6 w-14 bg-white/5 rounded-md animate-shimmer"></div>
          <div className="h-6 w-16 bg-white/5 rounded-md animate-shimmer"></div>
          <div className="h-6 w-12 bg-white/5 rounded-md animate-shimmer"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
