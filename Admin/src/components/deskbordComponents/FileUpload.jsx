import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaUpload } from 'react-icons/fa';

const FileUpload = ({ accept, onChange, preview }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragIn = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragOut = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      onChange(files[0]);
    }
  };

  return (
    <div className="relative">
      {preview && (
        <div className="mb-2 rounded-lg overflow-hidden bg-gray-800">
          {accept.includes('image') ? (
            <img src={preview} alt="Preview" className="w-full h-48 object-cover" />
          ) : (
            <video src={preview} controls className="w-full h-48 object-cover" />
          )}
        </div>
      )}
      
      <motion.div
        whileHover={{ scale: 1.02 }}
        onDragEnter={handleDragIn}
        onDragLeave={handleDragOut}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
          ${isDragging ? 'border-blue-500 bg-blue-500/10' : 'border-gray-600 hover:border-blue-500'}`}
        onClick={() => fileInputRef.current?.click()}
      >
        <FaUpload className="mx-auto mb-2 text-2xl" />
        <p className="text-sm text-gray-400">
          Drag and drop your file here, or click to select
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={(e) => e.target.files?.[0] && onChange(e.target.files[0])}
          className="hidden"
        />
      </motion.div>
    </div>
  );
};

export default FileUpload;