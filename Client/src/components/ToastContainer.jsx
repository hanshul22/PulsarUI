import { Toaster } from 'react-hot-toast';

const ToastContainer = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: {
          background: '#1A1F35',
          color: '#E2E8F0',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
        },
        success: {
          iconTheme: {
            primary: '#6366F1',
            secondary: '#E2E8F0',
          },
        },
        error: {
          iconTheme: {
            primary: '#EF4444',
            secondary: '#E2E8F0',
          },
        },
      }}
    />
  );
};

export default ToastContainer;