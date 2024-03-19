
import useNavigation from '../hooks/use-navigation'; // Importing custom hook for navigation

function Link({ to, children }) {
  const { navigate } = useNavigation(); // Using custom hook to get navigation function

  const handleClick = (event) => { // Handling click event on link
    if (event.metaKey || event.ctrlKey) { // Checking if metaKey (command key on Mac) or ctrlKey is pressed
      return; // Do nothing if metaKey or ctrlKey is pressed (to allow opening link in new tab)
    }
    event.preventDefault(); // Preventing default behavior (page reload)

    navigate(to); // Navigating to the specified route
  };

  return (
    <a  href={to} onClick={handleClick}> {/* Link element */}
      {children} {/* Link text */}
    </a>
  );
}

export default Link; // Exporting Link component as default
