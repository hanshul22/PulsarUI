import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ToastContainer from './components/ToastContainer';
import ProtectedRoute from './utils/ProtectedRoute';

// Lazy load page components
const Landing = lazy(() => import('./pages/Landing'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const ComponentsPage = lazy(() => import('./pages/ComponentsPage'));
const CodeView = lazy(() => import('./pages/CodeView'));
const CreatePost = lazy(() => import('./pages/CreatePost'));
const Posts = lazy(() => import('./pages/Posts'));
const Profile = lazy(() => import('./pages/Profile'));
const Login = lazy(() => import('./pages/Login'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Loading component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
    <div className="w-16 h-16">
      <div className="w-full h-full rounded-full border-4 border-space-accent border-t-transparent animate-spin" />
    </div>
  </div>
);

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <div className="min-h-screen bg-space-dark text-space-text">
        <ToastContainer />
        <Routes>
          {/* Public routes without navigation */}
          <Route path="/" element={
            <Suspense fallback={<PageLoader />}>
              <Landing />
            </Suspense>
          } />
          
          <Route path="/login" element={
            <Suspense fallback={<PageLoader />}>
              <Login />
            </Suspense>
          } />
          
          {/* Dashboard route with protection */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <>
                <Navbar onMenuClick={toggleSidebar} />
                <div className="flex">
                  <Sidebar isOpen={isSidebarOpen} />
                  <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'} pt-16`}>
                    <Suspense fallback={<PageLoader />}>
                      <Dashboard />
                    </Suspense>
                  </main>
                </div>
              </>
            </ProtectedRoute>
          } />

          {/* Other protected routes remain protected */}
          <Route path="/components/:type" element={
            <ProtectedRoute>
              <>
                <Navbar onMenuClick={toggleSidebar} />
                <div className="flex">
                  <Sidebar isOpen={isSidebarOpen} />
                  <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'} pt-16`}>
                    <Suspense fallback={<PageLoader />}>
                      <ComponentsPage />
                    </Suspense>
                  </main>
                </div>
              </>
            </ProtectedRoute>
          } />

          <Route path="/code/:id" element={
            <ProtectedRoute>
              <>
                <Navbar onMenuClick={toggleSidebar} />
                <div className="flex">
                  <Sidebar isOpen={isSidebarOpen} />
                  <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'} pt-16`}>
                    <Suspense fallback={<PageLoader />}>
                      <CodeView />
                    </Suspense>
                  </main>
                </div>
              </>
            </ProtectedRoute>
          } />

          <Route path="/create-post" element={
            <ProtectedRoute>
              <>
                <Navbar onMenuClick={toggleSidebar} />
                <div className="flex">
                  <Sidebar isOpen={isSidebarOpen} />
                  <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'} pt-16`}>
                    <Suspense fallback={<PageLoader />}>
                      <CreatePost />
                    </Suspense>
                  </main>
                </div>
              </>
            </ProtectedRoute>
          } />

          <Route path="/posts" element={
            <ProtectedRoute>
              <>
                <Navbar onMenuClick={toggleSidebar} />
                <div className="flex">
                  <Sidebar isOpen={isSidebarOpen} />
                  <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'} pt-16`}>
                    <Suspense fallback={<PageLoader />}>
                      <Posts />
                    </Suspense>
                  </main>
                </div>
              </>
            </ProtectedRoute>
          } />

          <Route path="/profile" element={
            <ProtectedRoute>
              <>
                <Navbar onMenuClick={toggleSidebar} />
                <div className="flex">
                  <Sidebar isOpen={isSidebarOpen} />
                  <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'} pt-16`}>
                    <Suspense fallback={<PageLoader />}>
                      <Profile />
                    </Suspense>
                  </main>
                </div>
              </>
            </ProtectedRoute>
          } />

          {/* 404 route without navigation */}
          <Route path="*" element={
            <Suspense fallback={<PageLoader />}>
              <NotFound />
            </Suspense>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;