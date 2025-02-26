import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { RiGithubLine, RiExternalLinkLine, RiCodeLine } from 'react-icons/ri';

export default function CodeCard({ code }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ 
        duration: 0.3,
        y: {
          type: "spring",
          stiffness: 300,
          damping: 15
        }
      }}
      className="group relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-space-accent/20 to-space-highlight/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative bg-space-dark/30 backdrop-blur-lg p-6 rounded-lg border border-white/10 shadow-lg
                      group-hover:border-space-accent/50 transition-all duration-300">
        {code.image && (
          <div className="relative aspect-video rounded-lg overflow-hidden mb-6 group">
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-space-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
            <motion.img
              src={code.image}
              alt={code.title}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
            />
          </div>
        )}
        
        <div className="space-y-4">
          <motion.h3 
            className="text-xl font-bold gradient-text"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {code.title}
          </motion.h3>
          
          <p className="text-sm text-space-text/75 line-clamp-2 group-hover:text-space-text transition-colors duration-300">
            {code.description}
          </p>
          
          <div className="flex items-center text-sm space-x-2 opacity-75 group-hover:opacity-100 transition-opacity duration-300">
            <motion.img
              whileHover={{ scale: 1.1 }}
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${code.author}`}
              alt={code.author}
              className="w-6 h-6 rounded-full ring-2 ring-space-accent/20 group-hover:ring-space-accent transition-colors duration-300"
            />
            <span>{code.author}</span>
          </div>
          
          <div className="flex items-center gap-3 pt-2">
            <Link
              to={`/code/${code._id}`}
              className="flex-1"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 py-2 rounded-lg
                         bg-gradient-to-r from-space-accent to-space-highlight
                         hover:opacity-90 transition-opacity group"
              >
                <RiCodeLine className="text-white" />
                <span className="text-white font-medium">View Code</span>
              </motion.div>
            </Link>

            <div className="flex items-center gap-2">
              {code.githubUrl && (
                <motion.a
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  href={code.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  title="View on GitHub"
                >
                  <RiGithubLine size={20} />
                </motion.a>
              )}
              {code.deployedUrl && (
                <motion.a
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  whileTap={{ scale: 0.9 }}
                  href={code.deployedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  title="View Live Demo"
                >
                  <RiExternalLinkLine size={20} />
                </motion.a>
              )}
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-space-accent/10 rounded-full blur-3xl -z-10 
                      group-hover:bg-space-accent/20 transition-colors duration-300" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-space-highlight/10 rounded-full blur-3xl -z-10 
                      group-hover:bg-space-highlight/20 transition-colors duration-300" />
      </div>
    </motion.div>
  );
}