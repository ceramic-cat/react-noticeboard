import { useLocation } from 'react-router-dom';
import Header from "./partials/Header";
import Main from './partials/Main';
import Footer from './partials/Footer';
import BootstrapBreakpoints from './parts/BootstrapBreakpoints';
import { useAuth } from './contexts/AuthContext';


// turn off when not needed for debugging
const showBootstrapBreakpoints = true;

function AppContent() {
  const { loading } = useAuth()

  // scroll to top when the route changes
  useLocation();
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

  if (loading) {
    return (
      <div>
        Loading...
      </div>
    )
  }
  return (
    <>
      <Header />
      <Main />
      <Footer />
      {showBootstrapBreakpoints ? <BootstrapBreakpoints /> : null}
    </>
  )
}


export default function App() {
  return <AppContent />
}; 