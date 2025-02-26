import { RiLayoutLine, RiLoginCircleLine, RiGamepadLine, RiStackLine, RiSlideshow3Line, RiCompass3Line, RiErrorWarningLine } from 'react-icons/ri';

const generateDummyCode = (title, sourcePath, description, author = "Pulser Team", codeType = "AdminCodes") => ({
  _id: Math.random().toString(36).substr(2, 9),
  title,
  description,
  codeType,
  image: `https://picsum.photos/seed/${Math.random()}/800/600`,
  video: null,
  githubUrl: "https://github.com/example/pulser-ui",
  deployedUrl: "https://example.com",
  author,
  author_ID: "123456",
  sourcePath,
  code: {
    html: "<div>Sample HTML</div>",
    css: ".sample { color: blue; }",
    js: "console.log('Sample JS')"
  }
});

// Admin Codes
export const adminCodes = [
  // Navigation Components
  generateDummyCode(
    "Space Dock Nav",
    "navigation_design",
    "Futuristic navigation bar with dock-like animations."
  ),
  generateDummyCode(
    "Sidebar Navigation",
    "navigation_design",
    "Collapsible sidebar with smooth transitions."
  ),

  // Login Components
  generateDummyCode(
    "Nebula Login",
    "login_design",
    "Beautiful login form with nebula background effect."
  ),
  generateDummyCode(
    "Split Login",
    "login_design",
    "Split-screen login page with parallax effects."
  ),

  // Card Components
  generateDummyCode(
    "Glassmorphism Cards",
    "card_design",
    "Modern glass-effect cards with blur backdrop."
  ),
  generateDummyCode(
    "Profile Cards",
    "card_design",
    "User profile cards with social media integration."
  ),
];

// User Codes
export const userCodes = [
  generateDummyCode(
    "Custom Nav Menu",
    "navigation_design",
    "A unique navigation menu with smooth animations.",
    "John Doe",
    "UserCodes"
  ),
  generateDummyCode(
    "Animated Login",
    "login_design",
    "Login form with particle effects background.",
    "Jane Smith",
    "UserCodes"
  ),
  generateDummyCode(
    "3D Cards",
    "card_design",
    "Interactive 3D cards with hover effects.",
    "Mike Johnson",
    "UserCodes"
  ),
];

// Combined data for general use
export const dummyData = [...adminCodes, ...userCodes];

// Helper function to get components by type and code type
export const getComponentsByType = (type, codeType = null) => {
  const sourcePath = type.replace('components/', '') + '_design';
  return dummyData.filter(item => {
    if (codeType) {
      return item.sourcePath === sourcePath && item.codeType === codeType;
    }
    return item.sourcePath === sourcePath;
  });
};