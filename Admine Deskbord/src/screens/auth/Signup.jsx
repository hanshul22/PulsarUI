import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import FormContainer from '../../components/authComponents/FormContainer';
import FormInput from '../../components/authComponents/FormInput';
import FormButton from '../../components/authComponents/FormButton';
import {toast} from 'react-toastify';
import axios from 'axios';


const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    const { username, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      toast.error("Password and confirm password should be the same.");
      return;
    }

    try {
      const res = await axios.post("https://pulsarui-szzd.onrender.com/api/admins/register", {
        name: username,
        email,
        password,
        password_confirmation: confirmPassword,
      });

      if (res.data.status === "success") {
        toast.success("Registration successful");
        navigate("/login");
      } else {
        toast.error(
          res.data.msg === "Email already exists"
            ? "This email already exists. Please use a different email."
            : `Registration failed: ${res.data.msg}`
        );
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred during registration");
    }
  };

  return (
    <FormContainer>
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-8 text-3xl font-bold text-center text-white"
      >
        Create Account
      </motion.h2>
      
      <form onSubmit={handleSignUp} className="space-y-6">
        <FormInput
          icon={FaUser}
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />

        <FormInput
          icon={FaEnvelope}
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
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
        />

        <FormInput
          icon={FaLock}
          type={showConfirmPassword ? "text" : "password"}
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          rightIcon={showConfirmPassword ? FaEyeSlash : FaEye}
          onRightIconClick={() => setShowConfirmPassword(!showConfirmPassword)}
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center"
        >
          <Link to="/login" className="text-sm text-blue-400 hover:text-blue-300">
            Already have an account? Login
          </Link>
        </motion.div>

        <FormButton>Sign Up</FormButton>
      </form>
    </FormContainer>
  );
};

export default Signup;