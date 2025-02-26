import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { RiMailLine, RiLockLine, RiEyeLine, RiEyeOffLine, RiCheckLine, RiCloseLine, RiUserLine } from 'react-icons/ri';
import { loginUser, registerUser, selectUserLoading, selectUserError } from '../store/slices/userSlice';
import toast from 'react-hot-toast';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectUserLoading);
  const error = useSelector(selectUserError);

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    tc: false
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = (name, value) => {
    switch (name) {
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value) ? '' : 'Please enter a valid email address';
      case 'password':
        return value.length >= 6 ? '' : 'Password must be at least 6 characters long';
      case 'confirmPassword':
        return value === formData.password ? '' : 'Passwords do not match';
      case 'name':
        return value.length >= 2 ? '' : 'Name must be at least 2 characters long';
      case 'tc':
        return value ? '' : 'You must accept the terms and conditions';
      default:
        return '';
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, formData[name]);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    setFormData(prev => ({ ...prev, [name]: fieldValue }));
    if (touched[name]) {
      const error = validateField(name, fieldValue);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      if (!isLogin && key !== 'confirmPassword' || (isLogin && (key === 'email' || key === 'password'))) {
        const error = validateField(key, formData[key]);
        if (error) newErrors[key] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      if (isLogin) {
        const result = await dispatch(loginUser({
          email: formData.email,
          password: formData.password
        })).unwrap();
        
        if (result && result.token) {
          navigate('/dashboard');
        }
      } else {
        const result = await dispatch(registerUser({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          password_confirmation: formData.confirmPassword,
          tc: formData.tc
        })).unwrap();
        
        if (result && result.token) {
          navigate('/dashboard');
        }
      }
    } catch (err) {
      console.error('Authentication error:', err);
      toast.error(err.message || 'Authentication failed');
    }
  };

  const renderPasswordStrength = () => {
    if (!formData.password) return null;
    
    const strength = {
      length: formData.password.length >= 6,
      hasLetter: /[a-zA-Z]/.test(formData.password),
      hasNumber: /\d/.test(formData.password)
    };

    return (
      <motion.div 
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        className="mt-2 space-y-1 text-sm"
      >
        <h4 className="text-space-text/60 mb-2">Password Requirements:</h4>
        {Object.entries(strength).map(([key, met]) => (
          <div key={key} className="flex items-center gap-2">
            {met ? (
              <RiCheckLine className="text-green-500" />
            ) : (
              <RiCloseLine className="text-red-500" />
            )}
            <span className={met ? 'text-green-500' : 'text-red-500'}>
              {key === 'length' ? 'At least 6 characters' :
               key === 'hasLetter' ? 'Contains letters' :
               'Contains numbers'}
            </span>
          </div>
        ))}
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-0 left-0 w-96 h-96 bg-space-accent/30 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute bottom-0 right-0 w-96 h-96 bg-space-highlight/30 rounded-full blur-3xl"
      />

      {/* Main container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md relative"
      >
        {/* Glass card */}
        <div className="bg-space-dark/30 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl p-8">
          {/* Logo and title */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold gradient-text">
              {isLogin ? 'Welcome Back!' : 'Create Account'}
            </h2>
            <p className="text-space-text/60 mt-2">
              {isLogin 
                ? 'Sign in to continue your journey' 
                : 'Join us and start sharing your code'}
            </p>
          </div>

          {/* Error message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm"
            >
              {error}
            </motion.div>
          )}

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            layout
            className="space-y-6"
          >
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <div className="relative flex items-center">
                    <RiUserLine className="absolute left-4 text-lg text-space-text/60" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Full Name"
                      className={`w-full h-12 pl-11 pr-4 bg-white/5 rounded-lg border focus:ring-2 outline-none transition-all ${
                        errors.name && touched.name
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                          : 'border-white/10 focus:border-space-accent focus:ring-space-accent/20'
                      }`}
                    />
                  </div>
                  {errors.name && touched.name && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-2 ml-1"
                    >
                      {errors.name}
                    </motion.p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <div className="relative flex items-center">
                <RiMailLine className="absolute left-4 text-lg text-space-text/60" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Email Address"
                  className={`w-full h-12 pl-11 pr-4 bg-white/5 rounded-lg border focus:ring-2 outline-none transition-all ${
                    errors.email && touched.email
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                      : 'border-white/10 focus:border-space-accent focus:ring-space-accent/20'
                  }`}
                />
              </div>
              {errors.email && touched.email && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-2 ml-1"
                >
                  {errors.email}
                </motion.p>
              )}
            </div>

            <div>
              <div className="relative flex items-center">
                <RiLockLine className="absolute left-4 text-lg text-space-text/60" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Password"
                  className={`w-full h-12 pl-11 pr-12 bg-white/5 rounded-lg border focus:ring-2 outline-none transition-all ${
                    errors.password && touched.password
                      ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                      : 'border-white/10 focus:border-space-accent focus:ring-space-accent/20'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 text-lg text-space-text/60 hover:text-space-text transition-colors"
                >
                  {showPassword ? <RiEyeOffLine /> : <RiEyeLine />}
                </button>
              </div>
              {errors.password && touched.password && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-2 ml-1"
                >
                  {errors.password}
                </motion.p>
              )}
            </div>

            {!isLogin && renderPasswordStrength()}

            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <div className="relative flex items-center">
                    <RiLockLine className="absolute left-4 text-lg text-space-text/60" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Confirm Password"
                      className={`w-full h-12 pl-11 pr-12 bg-white/5 rounded-lg border focus:ring-2 outline-none transition-all ${
                        errors.confirmPassword && touched.confirmPassword
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                          : 'border-white/10 focus:border-space-accent focus:ring-space-accent/20'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 text-lg text-space-text/60 hover:text-space-text transition-colors"
                    >
                      {showConfirmPassword ? <RiEyeOffLine /> : <RiEyeLine />}
                    </button>
                  </div>
                  {errors.confirmPassword && touched.confirmPassword && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-2 ml-1"
                    >
                      {errors.confirmPassword}
                    </motion.p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {!isLogin && (
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="tc"
                  id="tc"
                  checked={formData.tc}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-4 h-4 rounded border-white/10 bg-white/5 text-space-accent focus:ring-space-accent"
                />
                <label htmlFor="tc" className="text-sm text-space-text/80">
                  I accept the terms and conditions
                </label>
              </div>
            )}
            {!isLogin && errors.tc && touched.tc && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm mt-2 ml-1"
              >
                {errors.tc}
              </motion.p>
            )}

            {isLogin && (
              <div className="text-right">
                <Link to="/forgot-password" className="text-sm text-space-accent hover:text-space-highlight transition-colors">
                  Forgot Password?
                </Link>
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-space-accent to-space-highlight text-white rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {isLogin ? 'Signing in...' : 'Creating account...'}
                </span>
              ) : (
                <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
              )}
            </motion.button>
          </motion.form>

          {/* Toggle between login and signup */}
          <p className="mt-8 text-center text-space-text/60">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setFormData({
                  email: '',
                  password: '',
                  confirmPassword: '',
                  name: '',
                  tc: false
                });
                setErrors({});
                setTouched({});
              }}
              className="ml-2 text-space-accent hover:text-space-highlight transition-colors"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;