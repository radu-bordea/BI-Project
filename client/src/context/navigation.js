import { createContext, useState, useEffect } from 'react'; // Importing necessary hooks from React

// Creating a context for navigation
const NavigationContext = createContext();

function NavigationProvider({ children }) {
  // State to hold the current path
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    // Function to handle popstate event
    const handler = () => {
      setCurrentPath(window.location.pathname); // Updating current path on popstate event
    };
    window.addEventListener('popstate', handler); // Adding event listener for popstate

    // Cleanup: removing event listener
    return () => {
      window.removeEventListener('popstate', handler);
    };
  }, []); // Runs only once on component mount

  // Function to navigate to a new path
  const navigate = (to) => {
    window.history.pushState({}, '', to); // Pushing new state to history
    setCurrentPath(to); // Updating current path
  };

  // Providing currentPath and navigate function to the context
  return (
    <NavigationContext.Provider value={{ currentPath, navigate }}>
      {children} {/* Rendering children components */}
    </NavigationContext.Provider>
  );
}

// Exporting NavigationProvider component as named export
export { NavigationProvider };
// Exporting NavigationContext as default export
export default NavigationContext;
