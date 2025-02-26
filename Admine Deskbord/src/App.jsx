import './App.css'
import { Login, Signup, ForgotPassword } from './screens/auth';
import { AdminCodes, CodeUploadForm, CodeView, Dashboard, Profile, UserCodes } from './screens/Others';
import { Navbar, Sidebar } from './components/deskbordComponents'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import React, { useState } from 'react';


function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  return (
    <>
      <Router>
        
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
        </Routes>

        <div className="w-full h-screen text-white bg-gray-900">
          <Navbar toggleSidebar={toggleSidebar} />
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

          <main className={`transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
            <Routes>
              <Route path="/daskboard" element={<Dashboard toggleSidebar={toggleSidebar} isOpen={isSidebarOpen} />} />
              <Route path="/admin-codes" element={<AdminCodes toggleSidebar={toggleSidebar} isOpen={isSidebarOpen} />} />
              <Route path="/profile" element={<Profile toggleSidebar={toggleSidebar} isOpen={isSidebarOpen} />} />
              <Route path="/code-upload" element={<CodeUploadForm toggleSidebar={toggleSidebar} isOpen={isSidebarOpen} />} />
              <Route path='/user-codes' element={<UserCodes toggleSidebar={toggleSidebar} isOpen={isSidebarOpen} />} />
              <Route path="/code/:id" element={<CodeView   />} />
            </Routes>
          </main>

        </div>

        <ToastContainer position='bottom-right' theme='dark' />
      </Router>
    </>
  )
}

export default App
