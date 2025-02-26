import { motion } from 'framer-motion';
import { RiFileCopyLine, RiCheckLine } from 'react-icons/ri';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useState } from 'react';

const CodeViewer = ({ code, language }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={copyToClipboard}
        className="absolute right-4 top-4 p-2 bg-space-light rounded-lg hover:bg-space-accent transition-colors duration-200 group"
      >
        {copied ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-green-400"
          >
            <RiCheckLine size={20} />
          </motion.div>
        ) : (
          <RiFileCopyLine size={20} className="text-space-text group-hover:text-white" />
        )}
      </motion.button>

      <SyntaxHighlighter
        language={language}
        style={atomOneDark}
        className="rounded-lg !bg-space-dark/60 !p-6 font-mono text-sm"
        customStyle={{
          background: 'rgba(11, 14, 24, 0.6)',
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeViewer;