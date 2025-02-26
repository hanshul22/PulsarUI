import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaSignInAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import FormInput from '../../components/authComponents/FormInput';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';



const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const navigator = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, } = formData;
    try {
      const res = await axios.post("http://localhost:500/api/admins/login", {
        email,
        password,
      });

      if (res.status === 200 && res.data.status === "success") {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        toast.success('User logged in successfully');
        navigator("/daskboard");
      } else {
        toast.error("Invalid email or password");
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        toast.error("Invalid email or password");
      } else if (error.request) {
        console.log(error.request);
        toast.error("Unable to connect to the server");
      } else {
        console.log("Error", error.message);
        toast.error("An error occurred");
      }
    }
  };

  
  return (
    <div className='overflow-hidden '>
    <div className=" overflow-y-hidden flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <div className="p-8 border border-gray-700 shadow-2xl bg-gray-800/50 backdrop-blur-xl rounded-2xl">
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
          >
            <FaSignInAlt className="mx-auto mb-2 text-4xl text-blue-500" />
            <h2 className="mb-2 text-3xl font-bold text-center text-white">Welcome Back</h2>
            <p className="mb-8 text-center text-gray-400">Sign in to continue your journey</p>
          </motion.div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <AnimatePresence>
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-6"
                >
                  <FormInput
                    icon={FaEnvelope}
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="glassmorphism"
                  />
                  <FormInput
                    icon={FaLock}
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    rightIcon={showPassword ? FaEyeSlash : FaEye}
                    onRightIconClick={() => setShowPassword(!showPassword)}
                    className="glassmorphism"
                  />
                </motion.div>
              </AnimatePresence>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-center justify-between text-sm"
              >
                <Link 
                  to="/forgot-password" 
                  className="text-blue-400 transition-colors duration-300 hover:text-blue-300"
                >
                  Forgot Password?
                </Link>
                {/* <Link 
                  to="/signup" 
                  className="text-blue-400 transition-colors duration-300 hover:text-blue-300"
                >
                  Create Account
                </Link> */}
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.02, backgroundColor: '#2563eb' }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-3 font-semibold text-white transition-all duration-300 bg-blue-600 rounded-lg shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50"
              >
                Sign In
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
      </div>
  );
};

export default Login;