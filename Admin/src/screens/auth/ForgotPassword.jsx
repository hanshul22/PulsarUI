import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import FormContainer from '../../components/authComponents/FormContainer';
import FormInput from '../../components/authComponents/FormInput';
import FormButton from '../../components/authComponents/FormButton';
// import { validateEmail } from '../../utils/formValidation';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (!validateEmail(email)) {
    //   alert('Please enter a valid email');
    //   return;
    // }
    console.log('Reset password for:', email);
    setIsSubmitted(true);
  };

  return (
    <FormContainer>
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-4 text-3xl font-bold text-center text-white"
      >
        Reset Password
      </motion.h2>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-8 text-center text-gray-300"
      >
        Enter your email address and we'll send you instructions to reset your password.
      </motion.p>

      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormInput
            icon={FaEnvelope}
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <FormButton>Send Reset Link</FormButton>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <Link to="/login" className="text-sm text-blue-400 hover:text-blue-300">
              Back to Login
            </Link>
          </motion.div>
        </form>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4 text-center"
        >
          <div className="mb-4 text-green-400">
            Reset instructions have been sent to your email!
          </div>
          <Link
            to="/login"
            className="inline-block text-blue-400 hover:text-blue-300"
          >
            Return to Login
          </Link>
        </motion.div>
      )}
    </FormContainer>
  );
};

export default ForgotPassword;