import { Slide, ToastContainer } from '@goorm-dev/vapor-components';
import Router from './Router';
import 'react-toastify/dist/ReactToastify.min.css';
import ErrorBoundary from './components/common/ErrorBoundary';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
