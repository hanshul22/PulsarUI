import { motion } from 'framer-motion';

export default function CardSkeleton() {
  return (
    <div className="relative overflow-hidden">
      <div className="bg-space-dark/30 backdrop-blur-lg p-6 rounded-lg border border-white/10">
        <div className="aspect-video rounded-lg overflow-hidden mb-6 bg-white/5 animate-pulse" />
        
        <div className="space-y-4">
          <div className="h-7 bg-white/5 rounded-lg w-3/4 animate-pulse" />
          <div className="space-y-2">
            <div className="h-4 bg-white/5 rounded w-full animate-pulse" />
            <div className="h-4 bg-white/5 rounded w-5/6 animate-pulse" />
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-full bg-white/5 animate-pulse" />
            <div className="h-4 bg-white/5 rounded w-24 animate-pulse" />
          </div>
          
          <div className="flex items-center gap-3 pt-2">
            <div className="flex-1 h-10 bg-white/5 rounded-lg animate-pulse" />
            <div className="flex gap-2">
              <div className="w-10 h-10 bg-white/5 rounded-lg animate-pulse" />
              <div className="w-10 h-10 bg-white/5 rounded-lg animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}