import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import CodeViewer from '../components/CodeViewer';
import CodeEditForm from '../components/CodeEditForm';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import { RiGithubLine, RiExternalLinkLine, RiEditLine, RiDeleteBin6Line, RiUser3Line } from 'react-icons/ri';
import { selectAdminCodes, selectUserCodes, selectCodesLoading, deleteUserCode } from '../store/slices/codesSlice';
import { selectUser, selectToken } from '../store/slices/userSlice';

const CodeView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const adminCodes = useSelector(selectAdminCodes);
  const userCodes = useSelector(selectUserCodes);
  const loading = useSelector(selectCodesLoading);
  const currentUser = useSelector(selectUser);
  const token = useSelector(selectToken);
  
  const [codeSnippet, setCodeSnippet] = useState(null);
  const [activeTab, setActiveTab] = useState('html');
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Find the code in either admin or user codes
    const foundCode = [...adminCodes, ...userCodes].find(code => code._id === id);
    if (foundCode) {
      setCodeSnippet(foundCode);
    } else {
      toast.error('Code snippet not found');
    }
  }, [id, adminCodes, userCodes]);

  // Check if the current user is the author of the code
  const isAuthor = currentUser && codeSnippet && codeSnippet.author_ID === currentUser._id;
  
  // Check if the code is an admin code
  const isAdminCode = adminCodes.some(code => code._id === id);

  const handleDelete = async () => {
    try {
      if (!isAuthor) {
        toast.error("You are not allowed to delete this code.");
        setIsModalOpen(false);
        return;
      }

      await dispatch(deleteUserCode({ codeId: id, token })).unwrap();
      setIsModalOpen(false);
      navigate('/posts');
    } catch (error) {
      console.error('Error deleting code snippet:', error);
      toast.error('Failed to delete snippet.');
    }
  };

  const handleEditSubmit = async (formData) => {
    try {
      // Add your update API call here
      setCodeSnippet(formData);
      setIsEditing(false);
      toast.success('Code updated successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update code');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-space-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!codeSnippet) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <h2 className="text-2xl font-bold text-space-text">Code snippet not found</h2>
        <button
          onClick={() => navigate('/components/navigation')}
          className="px-4 py-2 bg-space-accent rounded-lg hover:bg-opacity-90 transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="container mx-auto px-4 py-8">
        <CodeEditForm
          code={codeSnippet}
          onSubmit={handleEditSubmit}
          onCancel={() => setIsEditing(false)}
        />
      </div>
    );
  }

  const tabs = [
    { id: 'html', label: 'HTML', icon: '<>' },
    { id: 'css', label: 'CSS', icon: '#' },
    { id: 'js', label: 'JavaScript', icon: '{}' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex items-start justify-between">
          <div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl font-bold gradient-text mb-2"
            >
              {codeSnippet.title}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-space-text/80"
            >
              {codeSnippet.description}
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-2 mt-4"
            >
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                <RiUser3Line />
              </div>
              <span className="text-space-text/60">{codeSnippet.author}</span>
            </motion.div>
          </div>
          
          {/* Only show edit/delete buttons for user's own codes */}
          {isAuthor && !isAdminCode && (
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsEditing(true)}
                className="p-2 bg-white/5 rounded-lg hover:bg-space-accent transition-colors group"
              >
                <RiEditLine className="text-xl group-hover:text-white" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsModalOpen(true)}
                className="p-2 bg-white/5 rounded-lg hover:bg-red-500 transition-colors group"
              >
                <RiDeleteBin6Line className="text-xl group-hover:text-white" />
              </motion.button>
            </div>
          )}
        </div>

        {/* Media Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="aspect-video rounded-lg overflow-hidden glass-effect"
          >
            {codeSnippet.image ? (
              <img
                src={codeSnippet.image}
                alt={codeSnippet.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-white/5">
                <span className="text-space-text/60">No image available</span>
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="aspect-video rounded-lg overflow-hidden glass-effect"
          >
            {codeSnippet.video ? (
              <video
                src={codeSnippet.video}
                controls
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-white/5">
                <span className="text-space-text/60">No video available</span>
              </div>
            )}
          </motion.div>
        </div>

        {/* Links Section */}
        <div className="flex gap-4">
          {codeSnippet.githubUrl && (
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={codeSnippet.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg hover:bg-space-accent transition-colors group"
            >
              <RiGithubLine className="text-xl group-hover:text-white" />
              <span className="group-hover:text-white">View on GitHub</span>
            </motion.a>
          )}

          {codeSnippet.deployedUrl && (
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={codeSnippet.deployedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg hover:bg-space-accent transition-colors group"
            >
              <RiExternalLinkLine className="text-xl group-hover:text-white" />
              <span className="group-hover:text-white">View Demo</span>
            </motion.a>
          )}
        </div>

        {/* Code Section */}
        <div className="glass-effect rounded-lg overflow-hidden">
          <div className="flex border-b border-white/10">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 transition-colors flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'bg-white/5 text-space-accent'
                    : 'text-space-text hover:text-white'
                }`}
              >
                <span className="opacity-60 font-mono">{tab.icon}</span>
                {tab.label}
              </motion.button>
            ))}
          </div>

          <div className="p-4">
            <CodeViewer code={codeSnippet.code[activeTab]} language={activeTab} />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <DeleteConfirmationModal
            title={codeSnippet.title}
            onClose={() => setIsModalOpen(false)}
            onConfirm={handleDelete}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CodeView;