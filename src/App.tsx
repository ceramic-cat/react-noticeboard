import { useLocation } from 'react-router-dom';
import Header from "./partials/Header";
import Main from './partials/Main';
import Footer from './partials/Footer';
import BootstrapBreakpoints from './parts/BootstrapBreakpoints';
import { useStateObject } from './utils/useStateObject';
import { AuthProvider } from './contexts/AuthContext';


// turn off when not needed for debugging
const showBootstrapBreakpoints = true;

export default function App() {

  // a state to use with outlet context
  const stateAndSetter = useStateObject({
    isLoggedIn: false,
    user: null,
    categoryChoice: 'All',
    sortChoice: 'Price (low to high)',
    bwImages: false
  });

  // scroll to top when the route changes
  useLocation();
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

  return <AuthProvider>
    <Header stateAndSetter={stateAndSetter} />
    <Main stateAndSetter={stateAndSetter} />
    <Footer />
    {showBootstrapBreakpoints ? <BootstrapBreakpoints /> : null}
  </AuthProvider>;
}; 