import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import CodeCard from '../components/CodeCard';
import { RiSearchLine, RiFilter3Line, RiArrowDownSLine } from 'react-icons/ri';
import { fetchUserCodes, selectUserCodes, selectCodesLoading } from '../store/slices/codesSlice';

const Posts = () => {
  const dispatch = useDispatch();
  const userCodes = useSelector(selectUserCodes);
  const loading = useSelector(selectCodesLoading);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchUserCodes());
  }, [dispatch]);

  const categories = [
    { id: 'all', label: 'All Posts' },
    { id: 'navigation', label: 'Navigation' },
    { id: 'login', label: 'Login' },
    { id: 'landing', label: 'Landing' },
    { id: 'buttons', label: 'Buttons' },
    { id: 'sliders', label: 'Sliders' },
    { id: 'cards', label: 'Cards' },
    { id: 'games', label: 'Games' },
    { id: '404', label: '404 Pages' },
  ];

  const filteredPosts = userCodes.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.sourcePath.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-space-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-4xl font-bold gradient-text mb-2">
              All Posts
            </h1>
            <p className="text-space-text opacity-80">
              Explore and discover amazing code snippets shared by the community
            </p>
          </div>

          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="px-4 py-2 bg-space-light rounded-lg flex items-center gap-2 hover:bg-space-accent/20"
            >
              <RiFilter3Line />
              Components
              <RiArrowDownSLine className={`transform transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </motion.button>

            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-48 py-2 bg-space-light rounded-lg shadow-xl z-10"
              >
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setSelectedCategory(category.id);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full px-4 py-2 text-left hover:bg-space-accent/20 ${
                      selectedCategory === category.id ? 'text-space-accent' : ''
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </motion.div>
            )}
          </div>
        </div>

        <div className="relative">
          <RiSearchLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-space-text/60" />
          <input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-space-light rounded-lg border border-space-accent/20 focus:border-space-accent focus:ring-1 focus:ring-space-accent outline-none transition-colors"
          />
        </div>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredPosts.map((post) => (
          <motion.div key={post._id} variants={item}>
            <CodeCard code={post} />
          </motion.div>
        ))}
      </motion.div>

      {filteredPosts.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-xl text-space-text/60">No posts found matching your criteria</p>
        </motion.div>
      )}
    </div>
  );
};

export default Posts;