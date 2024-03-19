import useNavigation from '../hooks/use-navigation'; // Importing custom hook for navigation

function Route({ path, children }) {
  const { currentPath } = useNavigation(); // Using custom hook to get current path

  // Rendering children if the path matches the current path
  if (path === currentPath) {
    return children; // Render children components
  }

  return null; // Return null if the path does not match the current path
}

export default Route; // Exporting Route component as default
