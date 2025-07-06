import { Slide, ToastContainer } from '@goorm-dev/vapor-components';
import Router from './Router';
import 'react-toastify/dist/ReactToastify.min.css';
import ErrorBoundary from './components/common/ErrorBoundary';

function App() {
  return (
    <div>
      <ErrorBoundary>
        <Router />
      </ErrorBoundary>

      <ToastContainer
        autoClose={3000}
        position="top-right"
        transition={Slide}
        closeButton={true}
        newestOnTop
        hideProgressBar
      />
    </div>
  );
}

export default App;
