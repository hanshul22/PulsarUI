import React from 'react';
import { motion } from 'framer-motion';
import CodeCard from '../../components/deskbordComponents/CodeCard';
import { useUserContext } from '../../services/Context';



const UserCodes = () => {

  const { userCodes } = useUserContext();

  // const userCodes = codeSnippets.filter(code => code.type === 'user');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6"
    >
      <h2 className="mb-6 text-3xl font-bold">User Code Snippets</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {userCodes.map(code => (
          <CodeCard key={code.id} code={code} />
        ))}
      </div>
    </motion.div>
  );
};

export default UserCodes;