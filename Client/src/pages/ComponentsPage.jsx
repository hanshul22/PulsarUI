import { useState, useEffect, Suspense, lazy } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import CardSkeleton from '../components/CardSkeleton';
import { fetchAdminCodes, fetchUserCodes, selectAdminCodes, selectUserCodes, selectCodesLoading } from '../store/slices/codesSlice';

// Lazy load the CodeCard component
const CodeCard = lazy(() => import('../components/CodeCard'));

// Number of skeleton cards to show
const SKELETON_COUNT = 6;

export default function ComponentsPage() {
  const { type } = useParams();
  const dispatch = useDispatch();
  const adminCodes = useSelector(selectAdminCodes);
  const userCodes = useSelector(selectUserCodes);
  const loading = useSelector(selectCodesLoading);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    dispatch(fetchAdminCodes());
    dispatch(fetchUserCodes());
  }, [dispatch]);

  const getFilteredCodes = () => {
    const sourcePath = type.replace('components/', '') + '_design';
    console.log(sourcePath);
    
    
    switch (activeTab) {
      case 'admin':
        return adminCodes.filter(code => code.sourcePath === sourcePath);
      case 'user':
        return userCodes.filter(code => code.sourcePath === sourcePath);
      default:
        return [...adminCodes, ...userCodes].filter(code => code.sourcePath === sourcePath);
    }
  };

  const filteredCodes = getFilteredCodes();

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

  const formatTitle = (type) => {
    return type
      .split('/')
      .pop()
      .split('_')[0]
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const tabs = [
    { id: 'all', label: 'All Components' },
    { id: 'admin', label: 'Pulser Team' },
    { id: 'user', label: 'User Components' }
  ];

  return (
    <div className="container px-4 py-8 mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="mb-4 text-4xl font-bold gradient-text">
          {formatTitle(type)} Components
        </h1>
        <p className="mb-6 text-space-text opacity-80">
          Explore our collection of space-themed {formatTitle(type).toLowerCase()} components.
        </p>

        <div className="flex gap-4 mb-8">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-space-accent text-white'
                  : 'bg-white/5 hover:bg-space-accent/20'
              }`}
            >
              {tab.label}
            </motion.button>
          ))}
        </div>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {loading ? (
          // Show skeleton cards while loading
          Array.from({ length: SKELETON_COUNT }).map((_, index) => (
            <motion.div key={`skeleton-${index}`} variants={item}>
              <CardSkeleton />
            </motion.div>
          ))
        ) : (
          // Show actual cards with lazy loading
          filteredCodes.map((code) => (
            <motion.div key={code._id} variants={item}>
              <Suspense fallback={<CardSkeleton />}>
                <CodeCard code={code} />
              </Suspense>
            </motion.div>
          ))
        )}
      </motion.div>

      {!loading && filteredCodes.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-12 text-center"
        >
          <p className="text-xl text-space-text/60">No components found</p>
        </motion.div>
      )}
    </div>
  );
}