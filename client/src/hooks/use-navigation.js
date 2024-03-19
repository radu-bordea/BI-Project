import { useContext } from 'react'; // Importing useContext hook from React
import NavigationContext from '../context/navigation'; // Importing NavigationContext

function useNavigation() {
  return useContext(NavigationContext); // Using useContext hook to access NavigationContext
}

export default useNavigation; // Exporting useNavigation hook as default
